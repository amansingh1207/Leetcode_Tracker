import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_iUAJg7HPzhn5@ep-bold-wind-a27odj2x-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(DATABASE_URL);

async function restoreDatabase() {
  try {
    console.log('🔄 Starting database restore from backup...');
    
    // Read the SQL backup file
    const backupContent = readFileSync('attached_assets/database_backup_1753877326126.sql', 'utf8');
    
    // Extract students data section
    const studentsMatch = backupContent.match(/COPY public\.students.*?FROM stdin;\n(.*?)\n\\\./s);
    if (studentsMatch) {
      const studentsData = studentsMatch[1].split('\n').filter(line => line.trim());
      
      console.log(`📊 Found ${studentsData.length} students to restore`);
      
      // Clear existing data
      await sql`TRUNCATE TABLE students CASCADE`;
      console.log('🗑️ Cleared existing data');
      
      // Insert students in batches
      for (let i = 0; i < studentsData.length; i += 10) {
        const batch = studentsData.slice(i, i + 10);
        const values = batch.map(line => {
          const parts = line.split('\t');
          return {
            id: parts[0],
            name: parts[1],
            leetcode_username: parts[2], 
            leetcode_profile_link: parts[3],
            created_at: parts[4]
          };
        });
        
        await sql`
          INSERT INTO students (id, name, leetcode_username, leetcode_profile_link, created_at)
          SELECT * FROM json_populate_recordset(null::students, ${JSON.stringify(values)})
        `;
        
        console.log(`✅ Inserted batch ${Math.floor(i/10) + 1} (${values.length} students)`);
      }
    }
    
    // Extract and restore daily_progress data
    const progressMatch = backupContent.match(/COPY public\.daily_progress.*?FROM stdin;\n(.*?)\n\\\./s);
    if (progressMatch) {
      const progressData = progressMatch[1].split('\n').filter(line => line.trim());
      console.log(`📈 Found ${progressData.length} daily progress records to restore`);
      
      await sql`TRUNCATE TABLE daily_progress CASCADE`;
      
      for (let i = 0; i < progressData.length; i += 20) {
        const batch = progressData.slice(i, i + 20);
        const values = batch.map(line => {
          const parts = line.split('\t');
          return {
            id: parts[0],
            student_id: parts[1],
            date: parts[2],
            total_solved: parseInt(parts[3]) || 0,
            easy_solved: parseInt(parts[4]) || 0,
            medium_solved: parseInt(parts[5]) || 0,
            hard_solved: parseInt(parts[6]) || 0,
            daily_increment: parseInt(parts[7]) || 0,
            created_at: parts[8]
          };
        });
        
        await sql`
          INSERT INTO daily_progress (id, student_id, date, total_solved, easy_solved, medium_solved, hard_solved, daily_increment, created_at)
          SELECT * FROM json_populate_recordset(null::daily_progress, ${JSON.stringify(values)})
        `;
      }
      console.log('✅ Daily progress data restored');
    }
    
    // Extract and restore badges data
    const badgesMatch = backupContent.match(/COPY public\.badges.*?FROM stdin;\n(.*?)\n\\\./s);
    if (badgesMatch) {
      const badgesData = badgesMatch[1].split('\n').filter(line => line.trim());
      console.log(`🏆 Found ${badgesData.length} badges to restore`);
      
      await sql`TRUNCATE TABLE badges CASCADE`;
      
      for (let i = 0; i < badgesData.length; i += 10) {
        const batch = badgesData.slice(i, i + 10);
        const values = batch.map(line => {
          const parts = line.split('\t');
          return {
            id: parts[0],
            student_id: parts[1],
            badge_type: parts[2],
            title: parts[3],
            description: parts[4],
            icon: parts[5],
            earned_at: parts[6]
          };
        });
        
        await sql`
          INSERT INTO badges (id, student_id, badge_type, title, description, icon, earned_at)
          SELECT * FROM json_populate_recordset(null::badges, ${JSON.stringify(values)})
        `;
      }
      console.log('✅ Badges data restored');
    }
    
    // Extract and restore weekly_trends data
    const trendsMatch = backupContent.match(/COPY public\.weekly_trends.*?FROM stdin;\n(.*?)\n\\\./s);
    if (trendsMatch) {
      const trendsData = trendsMatch[1].split('\n').filter(line => line.trim());
      console.log(`📊 Found ${trendsData.length} weekly trends to restore`);
      
      await sql`TRUNCATE TABLE weekly_trends CASCADE`;
      
      for (let i = 0; i < trendsData.length; i += 20) {
        const batch = trendsData.slice(i, i + 20);
        const values = batch.map(line => {
          const parts = line.split('\t');
          return {
            id: parts[0],
            student_id: parts[1],
            week_start: parts[2],
            week_end: parts[3],
            total_problems: parseInt(parts[4]) || 0,
            weekly_increment: parseInt(parts[5]) || 0,
            ranking: parseInt(parts[6]) || 0,
            created_at: parts[7]
          };
        });
        
        await sql`
          INSERT INTO weekly_trends (id, student_id, week_start, week_end, total_problems, weekly_increment, ranking, created_at)
          SELECT * FROM json_populate_recordset(null::weekly_trends, ${JSON.stringify(values)})
        `;
      }
      console.log('✅ Weekly trends data restored');
    }
    
    // Restore app_settings
    const settingsMatch = backupContent.match(/COPY public\.app_settings.*?FROM stdin;\n(.*?)\n\\\./s);
    if (settingsMatch) {
      const settingsData = settingsMatch[1].split('\n').filter(line => line.trim())[0];
      if (settingsData) {
        const parts = settingsData.split('\t');
        await sql`TRUNCATE TABLE app_settings CASCADE`;
        await sql`
          INSERT INTO app_settings (id, last_sync_time, is_auto_sync_enabled)
          VALUES (${parts[0]}, ${parts[1]}, ${parts[2] === 't'})
        `;
        console.log('✅ App settings restored');
      }
    }
    
    // Verify restoration
    const studentsCount = await sql`SELECT COUNT(*) as count FROM students`;
    const progressCount = await sql`SELECT COUNT(*) as count FROM daily_progress`;
    const badgesCount = await sql`SELECT COUNT(*) as count FROM badges`;
    const trendsCount = await sql`SELECT COUNT(*) as count FROM weekly_trends`;
    
    console.log('🎉 Database restoration completed!');
    console.log(`📊 Students: ${studentsCount[0].count}`);
    console.log(`📈 Daily Progress: ${progressCount[0].count}`);
    console.log(`🏆 Badges: ${badgesCount[0].count}`);
    console.log(`📊 Weekly Trends: ${trendsCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Database restoration failed:', error);
    process.exit(1);
  }
}

restoreDatabase();