# CodeCoach — LeetCode Student Progress Tracker

A full-stack web application for tracking students' LeetCode progress across a 35-week coding program. Built for faculty to monitor batch performance and for students to track their own growth.

---

## Features

- **Student Dashboards** — individual stats, streak heatmap, badge achievements, weekly progress chart
- **Admin Dashboard** — overview of all students, sync controls, CSV import
- **Batch Dashboards** — per-cohort analytics (Batch 2027, Batch 2028)
- **University Dashboard** — combined cross-batch leaderboard and metrics
- **Weekly Progress Table** — week-by-week solved count (+N in green) with cumulative total, backed by DB for fast load; current ongoing week computed live from CSV
- **Leaderboards** — ranked by current week's solved count (not all-time total)
- **Weekly Champions** — top performers of the ongoing week
- **Achievement Badges** — streak master, century coder, comeback coder, weekly topper
- **Activity Heatmap** — GitHub-style yearly activity grid
- **CSV Import** — bulk-import daily progress data; anomaly filtering (spikes > 100 capped to 0)
- **Auto Sync** — scheduled LeetCode GraphQL API sync with in-memory cache warm-up

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Wouter |
| Backend | Node.js, Express, TypeScript, Drizzle ORM |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT + bcrypt, role-based (student / admin) |
| Charts | Recharts |
| Deployment | Render.com |

---

## Project Structure

```
client/src/
  pages/
    student-dashboard.tsx       # Individual student view
    admin-dashboard.tsx         # Admin control panel
    batch-dashboard.tsx         # Single batch analytics
    university-dashboard.tsx    # Cross-batch combined view
    leaderboard.tsx             # Weekly rankings
    WeeklyProgressPage.tsx      # 35-week progress table
    analytics-dashboard.tsx     # Detailed analytics
    student-directory.tsx       # Browse all students
    badges.tsx                  # Achievement showcase
    export-page.tsx             # Data export
    auth-page.tsx               # Login
  components/
    admin/                      # Admin panel components
    dashboard/                  # Charts, widgets
    ui/                         # shadcn/Radix primitives
  hooks/                        # Custom React hooks
  lib/                          # API client, utilities

server/
  routes.ts                     # All API endpoints
  routes/auth.ts                # Auth sub-routes
  services/
    leetcode.ts                 # LeetCode GraphQL API client
    csv-import.ts               # CSV parsing + DB import
    weekly-progress-import.ts   # Weekly data aggregation
    cache.ts                    # In-memory cache with warm-up
    scheduler.ts                # Auto-sync scheduler
  middleware/auth.ts            # JWT/session verification
  index.ts                      # Express server entry
  db.ts                         # Drizzle + Neon connection

shared/
  schema.ts                     # Drizzle table definitions (source of truth)

migrations/                     # Drizzle migration files
attached_assets/                # Seed/import data files
```

---

## Database Schema

| Table | Purpose |
|---|---|
| `users` | Authentication (role: student / admin) |
| `students` | Profiles, LeetCode usernames, batch |
| `daily_progress` | Per-student daily LeetCode stats (cumulative totals) |
| `weekly_trends` | Aggregated weekly metrics |
| `weekly_progress_data` | `week1Score`…`week35Score` — weekly increment per student |
| `badges` | Earned achievement records |
| `leetcode_realtime_data` | Submission calendar, streak, activity |
| `dashboard_cache` | Pre-computed dashboard JSON for fast page loads |
| `app_settings` | Sync configuration |

---

## Local Development

**Prerequisites:** Node.js 20+, a PostgreSQL database (Neon recommended)

```bash
# Clone and install
git clone <repo-url>
cd CodeCoach-40new
npm install

# Set environment variables
# Create a .env file:
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000

# Push schema to DB
npm run db:push

# Start dev server (port 5000, hot reload)
npm run dev
```

---

## Commands

```bash
npm run dev       # Development server (port 5000)
npm run build     # Build frontend (Vite) + backend (esbuild) → dist/
npm start         # Run production build
npm run check     # TypeScript type check
npm run db:push   # Push Drizzle schema to database
```

---

## Deploy to Render

1. Fork this repository
2. Create a [Neon](https://neon.tech) PostgreSQL database and copy the connection string
3. On [Render](https://dashboard.render.com), create a new **Web Service** and connect the repo — `render.yaml` is auto-detected
4. Set environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=your_neon_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=10000
   ```
5. Deploy — first build takes ~3-5 minutes
6. After deploy: log in as admin, import student data, trigger an initial sync

---

## API Endpoints

```
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/students
POST   /api/students
GET    /api/students/:id

GET    /api/dashboard/admin
GET    /api/dashboard/university
GET    /api/dashboard/batch/:batch
GET    /api/dashboard/student/:id

GET    /api/leaderboard
GET    /api/leaderboard/university

GET    /api/weekly-progress/table

GET    /api/badges/:studentId

POST   /api/admin/sync
POST   /api/admin/import-csv-weekly-data
```

---

## Security

- JWT-based authentication with role-based access control
- bcrypt password hashing
- Drizzle ORM (parameterized queries — no raw SQL injection risk)
- Environment variables for all secrets
- HTTPS enforced in production via Render

---

## Program Timeline

The platform is designed around a **35-week program** running from **July 28, 2025 to March 29, 2026**. Week numbers and cumulative totals are calculated relative to this start date. After program end, the system continues to display the final week's data accurately.

---

## License

MIT — free to use for educational purposes.
