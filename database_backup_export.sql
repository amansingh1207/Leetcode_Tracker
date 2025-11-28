-- LeetCode Student Progress Tracker Database Backup
-- Generated on: 2025-08-02T23:33:57.719Z
-- Total Records: Students: 145, Daily Progress: 4657, Weekly Progress: 130, Badges: 162, Weekly Trends: 2274, App Settings: 1
-- 
-- Instructions for Transfer:
-- 1. Copy this file to your new Replit account
-- 2. Ensure your new project has the same database schema (run migrations first)
-- 3. Execute this SQL file to restore all data
-- 4. Verify data integrity by checking record counts

BEGIN;

-- Clear existing data (optional - remove these lines if you want to keep existing data)
DELETE FROM weekly_progress_data;
DELETE FROM badges;
DELETE FROM weekly_trends;
DELETE FROM daily_progress;
DELETE FROM app_settings;
DELETE FROM students;

