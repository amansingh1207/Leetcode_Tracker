# LeetCode Tracker - Render Deployment Guide

This guide provides complete instructions for deploying the full-stack LeetCode tracking application to Render.

## Overview

This application deploys as a **single service** on Render that serves both the frontend and backend. The Express server serves the built React application in production.

## Prerequisites

- [Render Account](https://render.com/) (free tier available)
- [GitHub Account](https://github.com/) with your code repository
- [Neon Database](https://neon.tech/) (free tier available)
- Your local development setup working

## Deployment Architecture

```
Render Web Service
├── Express Server (Backend API)
├── Static React App (Frontend)
├── Single Domain (yourapp.onrender.com)
└── Connected to Neon PostgreSQL
```

## Step-by-Step Deployment

### 1. Prepare Your Repository

#### 1.1 Ensure all files are committed
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### 1.2 Verify Build Configuration

Ensure your `package.json` has these scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

### 2. Create Neon Production Database

#### 2.1 Create New Database (or use existing)
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project: `leetcode-tracker-prod`
3. Or create a new branch in existing project for production

#### 2.2 Get Production Database URL
```
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/leetcode_tracker?sslmode=require
```

### 3. Deploy to Render

#### 3.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Choose your repository: `your-username/leetcode-tracker`

#### 3.2 Configure Build & Deploy Settings

**Basic Settings:**
- **Name**: `leetcode-tracker`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: (leave empty)

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Advanced Settings:**
- **Node Version**: `18` (or latest)
- **Auto Deploy**: `Yes`

#### 3.3 Environment Variables

In the **Environment** section, add:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/leetcode_tracker?sslmode=require
NODE_ENV=production
PORT=10000
```

**Important**: 
- Use your actual Neon database URL
- PORT=10000 is required by Render
- NODE_ENV=production enables production optimizations

#### 3.4 Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Monitor the deployment logs
4. First deployment takes 3-5 minutes

### 4. Post-Deployment Setup

#### 4.1 Run Database Migrations

After successful deployment, you need to initialize the database:

**Option A: Using Render Shell**
1. Go to your service dashboard
2. Click **"Shell"** tab
3. Run: `npm run db:push`

**Option B: Local Migration to Production**
1. Temporarily set local DATABASE_URL to production:
   ```env
   DATABASE_URL=your-production-database-url
   ```
2. Run: `npm run db:push`
3. Reset local DATABASE_URL

#### 4.2 Import Initial Data

1. Access your deployed app: `https://your-app.onrender.com`
2. Go to Admin Dashboard
3. Import student data via CSV upload
4. Run initial LeetCode sync

### 5. Domain and HTTPS

#### 5.1 Custom Domain (Optional)

If you have a custom domain:
1. Go to **Settings** → **Custom Domains**
2. Add your domain: `leetcode.yourdomain.com`
3. Update DNS records as instructed
4. SSL certificates are automatic

#### 5.2 HTTPS

- HTTPS is automatic on Render
- Your app is accessible at: `https://your-app.onrender.com`

### 6. Environment Configuration

#### 6.1 Production Environment Variables

Ensure these are set in Render dashboard:

```env
# Database
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/leetcode_tracker?sslmode=require

# Environment
NODE_ENV=production
PORT=10000

# Optional: Enable logging
LOG_LEVEL=info
```

#### 6.2 CORS Configuration

The app is configured to work on any domain. No additional CORS setup needed since frontend and backend are served from the same origin.

### 7. Monitoring and Maintenance

#### 7.1 Monitor Deployment

- **Logs**: Check deployment and runtime logs in Render dashboard
- **Metrics**: Monitor CPU and memory usage
- **Health**: App health is automatically monitored

#### 7.2 Auto-Deploy

- **Enabled**: Pushes to main branch auto-deploy
- **Disable**: Turn off in Settings if you prefer manual deploys

#### 7.3 Database Monitoring

- **Neon Console**: Monitor database performance and connections
- **Connection Limits**: Free tier has 100 concurrent connections
- **Backup**: Neon automatically backs up your data

### 8. Production Checklist

✅ **Pre-Deployment**
- [ ] Local development working
- [ ] All environment variables configured
- [ ] Database migrations ready
- [ ] Build command tested locally
- [ ] Repository committed and pushed

✅ **Deployment**
- [ ] Render service created and configured
- [ ] Environment variables set
- [ ] Successful build and deploy
- [ ] Database migrations completed
- [ ] App accessible via HTTPS

✅ **Post-Deployment**
- [ ] Student data imported
- [ ] LeetCode sync working
- [ ] All dashboards loading
- [ ] Profile photos syncing
- [ ] Real-time features working

### 9. Troubleshooting

#### 9.1 Common Deployment Issues

**Build Failures:**
```bash
# Check package.json scripts
# Ensure all dependencies are in "dependencies", not "devDependencies"
npm run build  # Test locally first
```

**Database Connection Issues:**
```bash
# Verify DATABASE_URL format
# Check Neon database is active
# Ensure SSL mode is required
```

**App Not Starting:**
```bash
# Check start command in Render settings
# Verify NODE_ENV=production
# Check server logs for errors
```

#### 9.2 Performance Optimization

**Free Tier Limitations:**
- 512MB RAM
- Sleeps after 15 minutes of inactivity
- 750 build hours/month

**Optimizations:**
- Keep-alive service (external ping service)
- Optimize bundle size
- Use efficient database queries
- Implement caching where appropriate

#### 9.3 Scaling Options

**Render Plans:**
- **Starter**: $7/month (no sleep, more resources)
- **Standard**: $25/month (dedicated CPU, more memory)
- **Pro**: $85/month (high performance)

### 10. Backup and Recovery

#### 10.1 Database Backup
- Neon provides automatic daily backups
- Point-in-time recovery available
- Export functionality via Neon console

#### 10.2 Code Backup
- GitHub repository serves as code backup
- Render deployments are tracked via Git commits

### 11. Additional Resources

- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## Expected Deployment URLs

After successful deployment:
- **App**: `https://your-app-name.onrender.com`
- **API**: `https://your-app-name.onrender.com/api/*`
- **Admin**: `https://your-app-name.onrender.com/admin`

The production deployment will have identical functionality to your local development environment.