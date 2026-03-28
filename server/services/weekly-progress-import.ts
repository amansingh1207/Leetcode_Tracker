import fs from 'fs/promises';
import path from 'path';
import { storage } from '../storage';
import { type InsertWeeklyProgressData } from '@shared/schema';

interface CSVWeeklyProgressRow {
  Name: string;
  'LeetCode Username': string;
  LeetcodeProfileLink: string;
  WEEK1: string;
  WEEK2: string;
  WEEK3: string;
  WEEK4: string;
}

interface WeeklyProgressStats {
  imported: number;
  updated: number;
  skipped: number;
  errors: string[];
}

export class WeeklyProgressImportService {
  async importWeeklyProgressFromCSV(csvFilePath: string): Promise<WeeklyProgressStats> {
    const stats: WeeklyProgressStats = {
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: []
    };

    try {
      // Read and parse CSV file
      const csvContent = await fs.readFile(csvFilePath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        throw new Error('CSV file is empty');
      }

      // Skip header line and process data lines
      const dataLines = lines.slice(1);
      console.log(`Processing ${dataLines.length} students from weekly progress CSV...`);

      // Process each student record
      for (const line of dataLines) {
        try {
          const record = this.parseCSVLine(line);
          await this.processStudentWeeklyProgress(record, stats);
        } catch (error) {
          const errorMsg = `Error processing line: ${error}`;
          console.error(errorMsg);
          stats.errors.push(errorMsg);
        }
      }

      console.log(`Weekly progress import completed: ${stats.imported} imported, ${stats.updated} updated, ${stats.skipped} skipped`);
      return stats;

    } catch (error) {
      console.error('Error importing weekly progress CSV:', error);
      throw new Error(`Failed to import weekly progress CSV: ${error}`);
    }
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    
    return result;
  }

  private async processStudentWeeklyProgress(record: string[], stats: WeeklyProgressStats): Promise<void> {
    // CSV format: Name,LeetCode Username,LeetcodeProfileLink,WEEK1,WEEK2,WEEK3,WEEK4,WEEK5
    if (record.length < 8) {
      stats.skipped++;
      return;
    }

    const [name, leetcodeUsername, profileLink, week1Str, week2Str, week3Str, week4Str, week5Str] = record;
    
    if (!leetcodeUsername?.trim()) {
      stats.skipped++;
      return;
    }
    
    if (!leetcodeUsername) {
      stats.skipped++;
      return;
    }

    // Find student by LeetCode username with flexible matching
    let student = await storage.getStudentByUsername(leetcodeUsername);
    
    // If not found, try to find by name or partial username match
    if (!student) {
      const allStudents = await storage.getAllStudents();
      
      // Try to find by name (case insensitive)
      student = allStudents.find(s => 
        s.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
      
      // If still not found, try partial username matching (more flexible)
      if (!student) {
        // Remove common suffixes/prefixes and try matching
        const cleanUsername = leetcodeUsername.toLowerCase().replace(/[-_]/g, '');
        student = allStudents.find(s => {
          const cleanDbUsername = s.leetcodeUsername.toLowerCase().replace(/[-_]/g, '');
          return cleanDbUsername.includes(cleanUsername) || 
                 cleanUsername.includes(cleanDbUsername) ||
                 // Check for partial matches without separators
                 cleanDbUsername.startsWith(cleanUsername) ||
                 cleanUsername.startsWith(cleanDbUsername);
        });
      }
    }
    
    if (!student) {
      // Create new student if not found
      console.log(`Creating new student: ${name} (${leetcodeUsername})`);
      try {
        student = await storage.createStudent({
          name: name.trim(),
          leetcodeUsername: leetcodeUsername.trim(),
          leetcodeProfileLink: profileLink.trim(),
          batch: "2027" // Default batch for new students created via CSV import
        });
      } catch (error) {
        stats.errors.push(`Failed to create student ${name}: ${error}`);
        stats.skipped++;
        return;
      }
    }

    // Parse weekly scores
    const week1Score = this.parseScore(week1Str);
    const week2Score = this.parseScore(week2Str);
    const week3Score = this.parseScore(week3Str);
    const week4Score = this.parseScore(week4Str);
    const week5Score = this.parseScore(week5Str);

    // Calculate progress increments
    const week2Progress = week2Score - week1Score;
    const week3Progress = week3Score - week2Score;
    const week4Progress = week4Score - week3Score;
    const week5Progress = week5Score - week4Score;

    // Calculate total score and average weekly growth
    const totalScore = week1Score + week2Score + week3Score + week4Score + week5Score;
    const validWeeks = [week2Progress, week3Progress, week4Progress, week5Progress].filter(p => !isNaN(p));
    const averageWeeklyGrowth = validWeeks.length > 0 
      ? Math.round(validWeeks.reduce((sum, p) => sum + p, 0) / validWeeks.length)
      : 0;

    const weeklyProgressData: InsertWeeklyProgressData = {
      studentId: student.id,
      week1Score,
      week2Score,
      week3Score,
      week4Score,
      week5Score,
      week2Progress,
      week3Progress,
      week4Progress,
      week5Progress,
      totalScore,
      averageWeeklyGrowth
    };

    // Check if weekly progress data already exists for this student
    const existingData = await storage.getWeeklyProgressData(student.id);
    
    if (existingData) {
      // Update existing data
      await storage.updateWeeklyProgressData(student.id, weeklyProgressData);
      stats.updated++;
    } else {
      // Create new data
      await storage.createWeeklyProgressData(weeklyProgressData);
      stats.imported++;
    }
  }

  private parseScore(scoreStr: string): number {
    if (!scoreStr || scoreStr.trim() === '') {
      return 0;
    }
    
    const parsed = parseInt(scoreStr.trim(), 10);
    return isNaN(parsed) ? 0 : parsed;
  }

  // Helper method to get enhanced weekly progress data with student details and real-time data
  async getEnhancedWeeklyProgressData() {
    const allProgressData = await storage.getAllWeeklyProgressData();
    const allStudents = await storage.getAllStudents();
    
    const enhancedData = await Promise.all(
      allProgressData.map(async (progressData) => {
        const student = allStudents.find(s => s.id === progressData.studentId);
        if (!student) return null;
        
        // Get current real-time data from daily progress
        const latestProgress = await storage.getLatestDailyProgress(student.id);
        const currentSolved = latestProgress?.totalSolved || 0;
        
        // Calculate new increment (current - week5)
        const newIncrement = currentSolved - (progressData.week5Score || progressData.week4Score || 0);
        
        return {
          student: {
            name: student.name,
            leetcodeUsername: student.leetcodeUsername,
            leetcodeProfileLink: student.leetcodeProfileLink
          },
          weeklyData: {
            week1: progressData.week1Score,
            week2: progressData.week2Score,
            week3: progressData.week3Score,
            week4: progressData.week4Score,
            week5: progressData.week5Score,
            currentWeekScore: progressData.currentWeekScore || progressData.week5Score || 0,
            lastWeekToCurrentIncrement: progressData.lastWeekToCurrentIncrement || progressData.week5Progress || 0
          },
          progressIncrements: {
            week2Progress: progressData.week2Progress,
            week3Progress: progressData.week3Progress,
            week4Progress: progressData.week4Progress,
            week5Progress: progressData.week5Progress
          },
          realTimeData: {
            currentSolved: currentSolved,
            newIncrement: newIncrement,
            lastUpdated: latestProgress?.date || 'No data'
          },
          summary: {
            totalScore: progressData.totalScore,
            averageWeeklyGrowth: progressData.averageWeeklyGrowth
          }
        };
      })
    );
    
    return enhancedData.filter(item => item !== null);
  }

  // Helper method to get specific student's weekly progress
  async getStudentWeeklyProgress(leetcodeUsername: string) {
    const student = await storage.getStudentByUsername(leetcodeUsername);
    if (!student) {
      return null;
    }

    const progressData = await storage.getWeeklyProgressData(student.id);
    if (!progressData) {
      return null;
    }

    return {
      student: {
        name: student.name,
        leetcodeUsername: student.leetcodeUsername,
        leetcodeProfileLink: student.leetcodeProfileLink
      },
      weeklyData: {
        week1: progressData.week1Score,
        week2: progressData.week2Score,
        week3: progressData.week3Score,
        week4: progressData.week4Score,
        week5: progressData.week5Score
      },
      progressIncrements: {
        week2Progress: progressData.week2Progress,
        week3Progress: progressData.week3Progress,
        week4Progress: progressData.week4Progress,
        week5Progress: progressData.week5Progress
      },
      summary: {
        totalScore: progressData.totalScore,
        averageWeeklyGrowth: progressData.averageWeeklyGrowth
      }
    };
  }

  // Import weekly progress from CSV data array
  async importFromCSVData(csvData: any[]) {
    const stats = { imported: 0, updated: 0, skipped: 0 };
    
    for (const row of csvData) {
      try {
        // Extract data from CSV row with support for new CSV format
        const name = row['Name'] || row['name'] || '';
        const leetcodeUsername = row['LeetCode Username'] || row['leetcode_username'] || row['username'] || '';
        const week1Score = this.parseScore(row['WEEK1'] || row['Week 1'] || row['week1'] || '0');
        const week2Score = this.parseScore(row['WEEK2'] || row['Week 2'] || row['week2'] || '0');
        const week3Score = this.parseScore(row['WEEK3'] || row['Week 3'] || row['week3'] || '0');
        const week4Score = this.parseScore(row['WEEK4'] || row['Week 4'] || row['week4'] || '0');
        const week5Score = this.parseScore(row['WEEK5'] || row['Week 5'] || row['week5'] || '0');
        const currentWeekScore = week5Score;
        
        if (!name || !leetcodeUsername) {
          console.log(`Skipping row: missing name (${name}) or username (${leetcodeUsername})`);
          stats.skipped++;
          continue;
        }

        // Find student by username
        const student = await storage.getStudentByUsername(leetcodeUsername);
        if (!student) {
          console.log(`Student not found: ${leetcodeUsername}`);
          stats.skipped++;
          continue;
        }

        // Calculate progress increments
        const week2Progress = week2Score - week1Score;
        const week3Progress = week3Score - week2Score;
        const week4Progress = week4Score - week3Score;
        const week5Progress = week5Score - week4Score;
        const lastWeekToCurrentIncrement = week5Progress;
        
        // Calculate totals
        const totalScore = week1Score + week2Score + week3Score + week4Score + week5Score;
        const averageWeeklyGrowth = Math.round(((week2Progress + week3Progress + week4Progress + week5Progress) / 4) * 100) / 100;

        const weeklyProgressData = {
          studentId: student.id,
          week1Score,
          week2Score,
          week3Score,
          week4Score,
          week5Score,
          currentWeekScore,
          lastWeekToCurrentIncrement,
          week2Progress,
          week3Progress,
          week4Progress,
          week5Progress,
          totalScore,
          averageWeeklyGrowth
        };

        // Check if weekly progress data already exists for this student
        const existingData = await storage.getWeeklyProgressData(student.id);
        
        if (existingData) {
          // Update existing data
          await storage.updateWeeklyProgressData(student.id, weeklyProgressData);
          stats.updated++;
        } else {
          // Create new data
          await storage.createWeeklyProgressData(weeklyProgressData);
          stats.imported++;
        }
      } catch (error) {
        console.error(`Error processing row for ${row['Name'] || 'unknown'}:`, error);
        stats.skipped++;
      }
    }
    
    return { stats };
  }
}

export const weeklyProgressImportService = new WeeklyProgressImportService();