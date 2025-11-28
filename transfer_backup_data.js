import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
const sql = neon(DATABASE_URL);

async function transferBackupData() {
  try {
    console.log('Starting data transfer from backup...');
    
    // Read the SQL backup file
    const backupContent = readFileSync('attached_assets/database_backup_1753877326126.sql', 'utf8');
    
    // Extract students data
    const studentsMatch = backupContent.match(/COPY public\.students.*?FROM stdin;\n(.*?)\n\\\./s);
    if (studentsMatch) {
      const studentsData = studentsMatch[1].split('\n').filter(line => line.trim());
      console.log(`Found ${studentsData.length} students in backup`);
      
      // Clear all data with CASCADE
      await sql`TRUNCATE TABLE students CASCADE`;
      console.log('Cleared all existing data');
      
      // Process students in batches
      for (let i = 0; i < studentsData.length; i += 5) {
        const batch = studentsData.slice(i, i + 5);
        
        for (const line of batch) {
          const parts = line.split('\t');
          if (parts.length >= 4) {
            try {
              await sql`
                INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at)
                VALUES (${parts[0]}, ${parts[1]}, ${parts[2]}, ${parts[3]}, ${parts[4]})
                ON CONFLICT (id) DO NOTHING
              `;
            } catch (error) {
              console.log(`Skipped student with duplicate username: ${parts[2]}`);
            }
          }
        }
        console.log(`Processed batch ${Math.floor(i/5) + 1}`);
      }
    }
    
    // Extract and restore daily_progress
    const progressMatch = backupContent.match(/COPY public\.daily_progress.*?FROM stdin;\n(.*?)\n\\\./s);
    if (progressMatch) {
      const progressData = progressMatch[1].split('\n').filter(line => line.trim());
      console.log(`Found ${progressData.length} daily progress records`);
      
      // Data already cleared by CASCADE
      
      for (let i = 0; i < progressData.length; i += 10) {
        const batch = progressData.slice(i, i + 10);
        
        for (const line of batch) {
          const parts = line.split('\t');
          if (parts.length >= 8) {
            try {
              await sql`
                INSERT INTO daily_progress (id, student_id, date, total_solved, easy_solved, medium_solved, hard_solved, daily_increment, created_at)
                VALUES (${parts[0]}, ${parts[1]}, ${parts[2]}, ${parseInt(parts[3]) || 0}, ${parseInt(parts[4]) || 0}, ${parseInt(parts[5]) || 0}, ${parseInt(parts[6]) || 0}, ${parseInt(parts[7]) || 0}, ${parts[8] || new Date().toISOString()})
                ON CONFLICT (id) DO NOTHING
              `;
            } catch (error) {
              console.log(`Skipped progress record: ${error.message}`);
            }
          }
        }
      }
      console.log('Daily progress data restored');
    }
    
    // Extract and restore badges
    const badgesMatch = backupContent.match(/COPY public\.badges.*?FROM stdin;\n(.*?)\n\\\./s);
    if (badgesMatch) {
      const badgesData = badgesMatch[1].split('\n').filter(line => line.trim());
      console.log(`Found ${badgesData.length} badges`);
      
      // Data already cleared by CASCADE
      
      for (const line of badgesData) {
        const parts = line.split('\t');
        if (parts.length >= 6) {
          try {
            await sql`
              INSERT INTO badges (id, student_id, badge_type, title, description, icon, earned_at)
              VALUES (${parts[0]}, ${parts[1]}, ${parts[2]}, ${parts[3]}, ${parts[4]}, ${parts[5]}, ${parts[6] || new Date().toISOString()})
              ON CONFLICT (id) DO NOTHING
            `;
          } catch (error) {
            console.log(`Skipped badge: ${error.message}`);
          }
        }
      }
      console.log('Badges data restored');
    }
    
    // Extract and restore weekly_trends
    const trendsMatch = backupContent.match(/COPY public\.weekly_trends.*?FROM stdin;\n(.*?)\n\\\./s);
    if (trendsMatch) {
      const trendsData = trendsMatch[1].split('\n').filter(line => line.trim());
      console.log(`Found ${trendsData.length} weekly trends`);
      
      // Data already cleared by CASCADE
      
      for (const line of trendsData) {
        const parts = line.split('\t');
        if (parts.length >= 7) {
          try {
            await sql`
              INSERT INTO weekly_trends (id, student_id, week_start, week_end, total_problems, weekly_increment, ranking, created_at)
              VALUES (${parts[0]}, ${parts[1]}, ${parts[2]}, ${parts[3]}, ${parseInt(parts[4]) || 0}, ${parseInt(parts[5]) || 0}, ${parseInt(parts[6]) || 0}, ${parts[7] || new Date().toISOString()})
              ON CONFLICT (id) DO NOTHING
            `;
          } catch (error) {
            console.log(`Skipped trend: ${error.message}`);
          }
        }
      }
      console.log('Weekly trends data restored');
    }
    
    // Update app_settings
    const settingsMatch = backupContent.match(/COPY public\.app_settings.*?FROM stdin;\n(.*?)\n\\\./s);
    if (settingsMatch) {
      const settingsData = settingsMatch[1].split('\n').filter(line => line.trim())[0];
      if (settingsData) {
        const parts = settingsData.split('\t');
        await sql`DELETE FROM app_settings`;
        await sql`
          INSERT INTO app_settings (id, last_sync_time, is_auto_sync_enabled)
          VALUES (${parts[0]}, ${parts[1]}, ${parts[2] === 't'})
        `;
        console.log('App settings restored');
      }
    }
    
    // Verify the transfer
    const counts = await Promise.all([
      sql`SELECT COUNT(*) as count FROM students`,
      sql`SELECT COUNT(*) as count FROM daily_progress`,
      sql`SELECT COUNT(*) as count FROM badges`,
      sql`SELECT COUNT(*) as count FROM weekly_trends`
    ]);
    
    console.log('\n=== DATABASE TRANSFER COMPLETE ===');
    console.log(`Students: ${counts[0][0].count}`);
    console.log(`Daily Progress: ${counts[1][0].count}`);
    console.log(`Badges: ${counts[2][0].count}`);
    console.log(`Weekly Trends: ${counts[3][0].count}`);
    console.log('===============================\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('Transfer failed:', error);
    process.exit(1);
  }
}

transferBackupData();