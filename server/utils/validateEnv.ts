/**
 * Environment Variables Validation
 * Ensures required environment variables are set before application startup
 */

export function validateEnv(): void {
  const required = ['DATABASE_URL'];
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.error(`Please set the following variables before starting the application:`);
    missing.forEach(key => {
      console.error(`  - ${key}`);
    });
    process.exit(1);
  }

  console.log('✅ All required environment variables are set');
}
