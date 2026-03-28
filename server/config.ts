export const config = {
  app: {
    name: "LeetCode Leaderboard",
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "5000", 10),
  },
  cache: {
    defaultTTL: 15 * 60 * 1000, // 15 minutes
    staleTTL: 60 * 60 * 1000,   // 1 hour
    warmupLimit: process.env.NODE_ENV === "production" ? 20 : 100,
  },
  sync: {
    dailySchedule: "0 0 * * *", // Midnight daily
    intervalMS: 4 * 60 * 60 * 1000, // 4 hours in production
    retryAttempts: 3,
    retryDelay: 1000,
  },
  deployment: {
    // Basic settings for Render/deployment compatibility
    trustProxy: true,
  }
};
