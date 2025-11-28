#!/bin/bash

# LeetCode Tracker - Local Development Setup Script
# This script helps you set up the application for local development

echo "🚀 LeetCode Tracker - Local Development Setup"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    echo "   Please update Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your database URL:"
    echo "   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require"
    echo ""
    echo "To get your Neon database URL:"
    echo "1. Go to https://console.neon.tech/"
    echo "2. Create a new project or use existing"
    echo "3. Copy the connection string from Connection Details"
    echo "4. Update the DATABASE_URL in .env file"
    echo ""
    read -p "Press Enter to continue after setting up your DATABASE_URL..."
else
    echo "✅ .env file exists"
fi

# Check if DATABASE_URL is set
if grep -q "postgresql://username:password" .env; then
    echo "⚠️  DATABASE_URL still contains placeholder values"
    echo "Please update .env with your actual Neon database connection string"
    read -p "Press Enter to continue after updating DATABASE_URL..."
fi

# Run database migrations
echo "🗄️  Setting up database schema..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Database setup failed. Please check your DATABASE_URL in .env"
    echo "Make sure your Neon database is accessible and the URL is correct"
    exit 1
fi

echo "✅ Database schema created successfully"

echo ""
echo "🎉 Setup complete! You can now start the development server:"
echo ""
echo "   npm run dev"
echo ""
echo "Then open your browser to: http://localhost:5000"
echo ""
echo "📚 For more details, see:"
echo "   - LOCAL_DEVELOPMENT_SETUP.md"
echo "   - RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "💡 Next steps:"
echo "   1. Import student data via Admin Dashboard"
echo "   2. Run LeetCode sync to fetch student progress"
echo "   3. Explore the various dashboards and features"