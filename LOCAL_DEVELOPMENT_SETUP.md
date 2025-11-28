# LeetCode Tracker - Local Development Setup Guide

This guide provides complete instructions for setting up and running the full-stack LeetCode tracking application locally.

## Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Neon Database Account** - [Sign up here](https://neon.tech/)

## Project Overview

This is a full-stack TypeScript application with:
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL (Neon Database)
- **ORM**: Drizzle ORM
- **API Integration**: LeetCode GraphQL API

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd leetcode-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install all frontend and backend dependencies listed in `package.json`.

### 3. Database Setup (Neon Database)

#### Step 3.1: Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Click **"Create Project"**
3. Choose:
   - **Project Name**: `leetcode-tracker`
   - **Database Name**: `leetcode_tracker` 
   - **Region**: Choose closest to your location
4. Click **"Create Project"**

#### Step 3.2: Get Database Connection String

1. In your Neon project dashboard, go to **"Connection Details"**
2. Copy the **Connection String** (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/leetcode_tracker?sslmode=require
   ```

#### Step 3.3: Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env  # or create manually
   ```

2. Update `.env` with your database URL:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/leetcode_tracker?sslmode=require
   NODE_ENV=development
   PORT=5000
   ```

#### Step 3.4: Run Database Migrations

```bash
npm run db:push
```

This creates all necessary tables in your Neon database.

### 4. Start the Development Server

```bash
npm run dev
```

This command:
- Starts the Express backend server on port 5000
- Starts the Vite frontend development server
- Enables hot module replacement (HMR)
- Serves both frontend and backend on `http://localhost:5000`

### 5. Access the Application

Open your browser and navigate to: `http://localhost:5000`

You should see the LeetCode Tracker dashboard.

## Development Workflow

### File Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and configurations
├── server/                # Express backend
│   ├── services/         # Business logic services
│   ├── routes.ts         # API endpoints
│   ├── db.ts            # Database configuration
│   └── index.ts         # Server entry point
├── shared/               # Shared TypeScript types
│   └── schema.ts        # Database schema and types
└── migrations/          # Database migration files
```

### Available Scripts

- `npm run dev` - Start development server (both frontend + backend)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run check` - Type checking

### Database Operations

#### Import Student Data
1. Prepare CSV file with columns: `name`, `leetcodeUsername`, `batch`
2. Use the admin dashboard import feature
3. Or manually add via API endpoints

#### Sync LeetCode Data
- **Manual Sync**: Use "Sync All" button in admin dashboard
- **Automatic Sync**: Runs daily at midnight (configured in scheduler)
- **Individual Sync**: Click sync button on individual student pages

### API Endpoints

The backend provides these key endpoints:
- `GET /api/students/all` - Get all students
- `GET /api/dashboard/student/:username` - Get student dashboard data
- `GET /api/dashboard/university` - Get university overview
- `POST /api/sync/all` - Sync all student data from LeetCode
- `POST /api/sync/profile-photos` - Sync all profile photos
- `POST /api/students/import` - Import students from CSV

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```
   Error: DATABASE_URL must be set in environment variables
   ```
   **Solution**: Check your `.env` file has the correct `DATABASE_URL`

2. **Port Already in Use**
   ```
   Error: listen EADDRINUSE: address already in use :::5000
   ```
   **Solution**: Kill processes on port 5000 or change PORT in `.env`

3. **LeetCode API Errors**
   ```
   LeetCode API error for username: 504
   ```
   **Solution**: This is normal - some users may not exist or API may be temporarily unavailable

4. **Node Modules Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Database Reset

If you need to reset your database:
```bash
# This will recreate all tables (WARNING: destroys existing data)
npm run db:push
```

### Logs and Debugging

- **Backend logs**: Check terminal where `npm run dev` is running
- **Frontend logs**: Check browser developer console
- **Database queries**: Enable logging in `server/db.ts`

## Next Steps

After local development is working:
1. Test all features (student directory, dashboards, sync)
2. Import your student data
3. Verify LeetCode data synchronization
4. Ready for production deployment to Render

## Features Available Locally

✅ Student Directory with search and filtering  
✅ Real-time LeetCode data tracking  
✅ Individual student dashboards  
✅ University and batch overview dashboards  
✅ Admin panel with sync controls  
✅ Profile photo integration  
✅ Leaderboards and rankings  
✅ Activity heatmaps and progress charts  
✅ Badge system and achievements  
✅ CSV import/export functionality  

The local development environment provides the exact same functionality as the production deployment.