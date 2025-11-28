# Local Deployment Guide

## Quick Start (5 minutes)

### 1. Download the Project
Download all project files to your local machine.

### 2. Run Setup Script

**Windows:**
```cmd
setup-local.bat
```

**Mac/Linux:**
```bash
chmod +x setup-local.sh
./setup-local.sh
```

### 3. Set Up Database

**Option A: Cloud Database (Recommended - No local installation needed)**

1. Go to [Neon.tech](https://neon.tech) (free PostgreSQL)
2. Create account and new database
3. Copy the connection string (looks like: `postgresql://username:password@hostname/database`)
4. Paste it in your `.env` file:
   ```
   DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
   ```

**Option B: Local PostgreSQL**

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create database:
   ```sql
   CREATE DATABASE leetcode_tracker;
   ```
3. Update `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/leetcode_tracker
   ```

### 4. Initialize Database
```bash
npm run db:push
```

### 5. Start the Application
```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000)

## Project Features

Your local installation includes:

### 📊 Analytics Dashboard
- Real-time LeetCode data synchronization
- Historical CSV data import
- Multiple chart types (Line, Bar, Pie, Area)
- Summary statistics and trend analysis

### 🎯 Student Tracking
- Individual student dashboards
- Real-time progress monitoring
- Badge achievement system
- Leaderboard and rankings

### 📈 Data Visualization
- Progress trend charts
- Improvement analysis
- Class average progression
- Detailed comparison tables

## Usage Instructions

### 1. Import Historical Data
1. Navigate to "Analytics Dashboard"
2. Click "Import CSV" button
3. System will process your attached CSV file with weekly data

### 2. Sync Real-time Data
1. Click "Sync Real-time" to fetch current LeetCode stats
2. Enable auto-refresh for live updates
3. Monitor progress in real-time

### 3. Explore Features
- **Student Directory**: Browse all students
- **Real-Time Tracker**: Live rankings with auto-refresh
- **Analytics Dashboard**: Comprehensive progress analysis
- **Leaderboard**: Top performers
- **Badges**: Achievement system

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure database server is running
- Check credentials and permissions

### Import Problems
- Verify CSV file is in `attached_assets/` folder
- Check CSV format matches expected structure
- Review console logs for specific errors

### LeetCode Sync Issues
- Verify internet connection
- Check that LeetCode usernames are correct
- Some profiles may have privacy settings enabled

## File Structure
```
├── client/           # React frontend
├── server/           # Express backend  
├── shared/           # Shared types
├── attached_assets/  # CSV data files
├── .env             # Environment variables
└── README.md        # This file
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Update database schema

### Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL
- **Charts**: Recharts for data visualization

## Support

Check console logs for detailed error messages. The application includes comprehensive error handling and logging for debugging issues.