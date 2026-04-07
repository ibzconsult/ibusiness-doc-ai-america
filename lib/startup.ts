// lib/startup.ts - Startup validation for HIPAA compliance

import { verifyHIPAACompliance } from './env';

let startupChecksRun = false;

/**
 * Run startup checks - call this early in app/layout.tsx
 * Only runs once, subsequent calls are no-ops
 */
export async function runStartupChecks() {
  if (startupChecksRun) return;

  try {
    console.log('🔍 Running startup checks...');

    // Verify HIPAA compliance configuration
    verifyHIPAACompliance();

    console.log('✅ All startup checks passed');
    startupChecksRun = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Startup check failed:', message);

    if (process.env.NODE_ENV === 'production') {
      // In production, we want to fail fast
      throw error;
    }

    // In development, warn but continue
    console.warn('⚠️  Continuing in development mode despite errors');
  }
}
