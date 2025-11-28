# LeetCode Student Progress Tracker

## Overview

This is a full-stack web application for tracking LeetCode progress of students in a batch. The system automatically syncs student data from LeetCode, tracks daily/weekly progress, awards badges for achievements, and provides comprehensive dashboards for both students and administrators.

**Status**: ✅ **FULLY OPERATIONAL** - Successfully synced all 142 students with real-time LeetCode data via GraphQL API. All invalid usernames have been corrected and 100% sync success achieved.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **API Pattern**: RESTful APIs with JSON responses

### Key Components

#### Database Schema
- **Students Table**: Core student information with LeetCode usernames
- **Daily Progress Table**: Tracks daily problem-solving statistics
- **Weekly Trends Table**: Aggregated weekly performance data
- **Badges Table**: Achievement system for student motivation
- **App Settings Table**: System configuration and sync settings

#### Core Services
- **LeetCode Service**: Fetches student data from LeetCode's GraphQL API
- **Scheduler Service**: Handles automated daily syncing of student progress
- **Storage Service**: Abstraction layer for database operations (currently in-memory, ready for database integration)

#### Dashboard Features
- **Student Directory**: Browse all 142 students with search functionality
- **Individual Student Dashboards**: Personal progress tracking, badges, weekly trends for each student
- **Real-Time Tracker**: Complete rankings table with live data refresh every 30 seconds
- **Admin Dashboard**: Batch overview, student management, sync controls
- **Leaderboard**: Competitive ranking system with top performers
- **Progress Visualization**: Charts and heatmaps for activity tracking

## Data Flow

1. **Data Ingestion**: LeetCode API → Backend Service → Database
2. **Automated Sync**: Scheduler runs daily to update all student progress
3. **Real-time Updates**: Frontend uses React Query for efficient data fetching
4. **Badge System**: Automatic badge awarding based on achievement criteria
5. **Analytics**: Weekly trend calculation and ranking system

## External Dependencies

### Production Dependencies
- **UI Components**: Extensive Radix UI component library
- **Charts**: Recharts for data visualization
- **Database**: Neon Database (serverless PostgreSQL)
- **Date Handling**: date-fns for date manipulation
- **Validation**: Zod schemas with Drizzle integration

### LeetCode Integration
- Uses LeetCode's GraphQL endpoint for fetching user statistics
- Handles rate limiting and error recovery
- Parses difficulty-based problem counts (Easy, Medium, Hard)

### Database Configuration
- Drizzle Kit for schema migrations
- PostgreSQL with UUID primary keys
- Connection via DATABASE_URL environment variable

## Deployment Strategy

### Development
- **Dev Server**: Express with Vite middleware for HMR
- **Database**: Local PostgreSQL or Neon Database
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Assets**: Served by Express in production
- **Database**: Neon Database (serverless PostgreSQL)

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)

### Key Features
- **100% Student Coverage**: All 142 students successfully synced with real LeetCode data
- **Real-Time Tracking**: Live rankings table with 30-second auto-refresh
- **Individual Dashboards**: Dedicated dashboard pages for each student accessible via clean URLs
- **Comprehensive Search**: Search functionality across all students by name or username
- **Automated Data Sync**: Daily background jobs with manual full-sync capability
- **Real-time UI**: Optimistic updates with React Query
- **Responsive Design**: Mobile-first approach with Tailwind
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Error Handling**: Comprehensive error boundaries and API error handling

### Recent Updates (August 3, 2025)

#### Profile Photo Integration Implementation
- ✅ **Profile Photo System**: Added profilePhoto field to students database schema
- ✅ **LeetCode Avatar Sync**: Enhanced LeetCode service to fetch profile photos from GraphQL API
- ✅ **API Endpoint**: Created `/api/sync/profile-photos` endpoint for admin-triggered synchronization
- ✅ **Frontend Integration**: Updated all components to display actual LeetCode profile photos:
  - Student Directory with avatar cards
  - Real-time Tracker rankings table
  - University Dashboard leaderboards
  - Admin Dashboard student table with sync button
  - Individual Student Dashboard header profile
- ✅ **Fallback System**: Implemented graceful fallbacks (default avatars → initials)
- ✅ **Sync Success**: Successfully synced 184 student profile photos from LeetCode

#### Local Development & Deployment Setup
- ✅ **Comprehensive Documentation**: Created detailed setup guides:
  - `LOCAL_DEVELOPMENT_SETUP.md` - Complete local development instructions
  - `RENDER_DEPLOYMENT_GUIDE.md` - Production deployment to Render
  - `.env.example` - Environment variable template
- ✅ **Automated Setup Scripts**: Created platform-specific setup automation:
  - `setup-local.sh` - macOS/Linux automated setup with dependency checks
  - `setup-local.bat` - Windows automated setup with error handling
- ✅ **Updated Documentation**: Enhanced README.md with comprehensive feature overview
- ✅ **Production Ready**: Full instructions for both local development and cloud deployment

#### Batch Separation System Implementation
- ✅ **Batch Support Added**: Implemented complete batch separation system for Batch 2027 and Batch 2028
- ✅ **Database Schema Enhanced**: Added batch field to students table with migration support
- ✅ **Batch-Specific APIs**: Created comprehensive API endpoints for batch-specific data retrieval
- ✅ **University Dashboard**: Built combined university-wide dashboard showing both batches
- ✅ **Batch Dashboards**: Individual dashboards for each batch with detailed analytics
- ✅ **Batch Leaderboards**: Separate rankings within each batch plus university-wide rankings
- ✅ **Navigation System**: Updated sidebar with batch-specific navigation and university overview
- ✅ **Data Import System**: Automated import for Batch 2027 students (20 students imported)
- ✅ **Real-time Syncing**: All batch data integrates with existing LeetCode sync system

#### Enhanced Dashboards
- ✅ **Batch Comparison**: Side-by-side batch performance comparison in university dashboard
- ✅ **Combined Rankings**: University-wide leaderboard merging both batches by total problems solved
- ✅ **Batch-Specific Stats**: Individual batch analytics with streak tracking and performance metrics
- ✅ **Responsive Design**: Clean, mobile-friendly interfaces for all new dashboard components

#### Previous Updates (Earlier August 3, 2025)
- ✅ Added GitHub-style Activity Heatmap showing 365-day submission calendar
- ✅ Implemented Total Active Days calculation (days with at least 1 problem solved)
- ✅ Added Maximum Streak tracking for all students (longest consecutive daily streak)
- ✅ Enhanced Admin Dashboard with batch-wide streak statistics
- ✅ Updated Student Dashboard with new streak and activity metrics
- ✅ Improved stats overview with 5-column responsive layout
- ✅ Added max streak and active days columns to admin student table

### Previous Updates (July 30, 2025)
- ✅ Fixed LeetCode usernames for 11 students who were previously failing sync
- ✅ Created real-time tracker page with complete rankings for all 142 students
- ✅ Added individual student dashboard URLs (/student/username)
- ✅ Implemented comprehensive search and filtering capabilities
- ✅ Achieved 100% sync success rate (142/142 students)
- ✅ Added auto-refresh functionality with manual override controls
- ✅ Configured application for Neon.tech PostgreSQL cloud database
- ✅ Created local deployment setup with automated scripts
- ✅ Ensured all data persistence (CSV imports, LeetCode sync, analytics) stores permanently in Neon.tech
- ✅ Built comprehensive analytics dashboard with multiple visualization types
- ✅ Implemented real-time data synchronization with LeetCode GraphQL API

### Database Configuration
- **Primary Database**: Neon.tech PostgreSQL (serverless cloud database)
- **Connection**: Optimized for @neondatabase/serverless package
- **Schema Management**: Drizzle ORM with automatic migrations
- **Data Persistence**: All student data, progress tracking, badges, and analytics stored permanently
- **Local Setup**: Automated setup scripts for Windows/Mac/Linux deployment

The application is designed for both cloud deployment (Replit) and local development, with comprehensive data storage in Neon.tech PostgreSQL ensuring no data loss and enterprise-grade persistence.