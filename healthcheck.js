#!/usr/bin/env node

/**
 * Health check script for deployment platforms
 * Tests if the application is running correctly
 */

const http = require('http');

const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || 'localhost';

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/auth/me',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`Health check: HTTP ${res.statusCode}`);
  
  if (res.statusCode === 200 || res.statusCode === 401) {
    console.log('✅ Application is healthy');
    process.exit(0);
  } else {
    console.log('❌ Application is unhealthy');
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.log('❌ Health check failed:', err.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Health check timed out');
  req.destroy();
  process.exit(1);
});

req.end();