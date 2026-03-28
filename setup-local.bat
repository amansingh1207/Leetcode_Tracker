@echo off
echo 🚀 LeetCode Tracker - Local Development Setup
echo =============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first:
    echo    https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  Creating .env file from template...
    copy .env.example .env
    echo 📝 Please edit .env file with your database URL:
    echo    DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
    echo.
    echo To get your Neon database URL:
    echo 1. Go to https://console.neon.tech/
    echo 2. Create a new project or use existing
    echo 3. Copy the connection string from Connection Details
    echo 4. Update the DATABASE_URL in .env file
    echo.
    pause
) else (
    echo ✅ .env file exists
)

REM Run database migrations
echo 🗄️  Setting up database schema...
call npm run db:push

if %errorlevel% neq 0 (
    echo ❌ Database setup failed. Please check your DATABASE_URL in .env
    echo Make sure your Neon database is accessible and the URL is correct
    pause
    exit /b 1
)

echo ✅ Database schema created successfully
echo.
echo 🎉 Setup complete! You can now start the development server:
echo.
echo    npm run dev
echo.
echo Then open your browser to: http://localhost:5000
echo.
echo 📚 For more details, see:
echo    - LOCAL_DEVELOPMENT_SETUP.md
echo    - RENDER_DEPLOYMENT_GUIDE.md
echo.
echo 💡 Next steps:
echo    1. Import student data via Admin Dashboard
echo    2. Run LeetCode sync to fetch student progress
echo    3. Explore the various dashboards and features

pause