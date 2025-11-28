import { leetCodeService } from "./leetcode";

export class SchedulerService {
  private intervalId: NodeJS.Timeout | null = null;

  startDailySync(): void {
    // Run immediately
    this.runDailySync();
    
    // Then run every 24 hours
    this.intervalId = setInterval(() => {
      this.runDailySync();
    }, 24 * 60 * 60 * 1000);

    console.log('Daily sync scheduler started');
  }

  stopDailySync(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Daily sync scheduler stopped');
    }
  }

  private async runDailySync(): Promise<void> {
    console.log('Starting daily sync at:', new Date().toISOString());
    
    try {
      const result = await leetCodeService.syncAllStudents();
      console.log(`Daily sync completed - Success: ${result.success}, Failed: ${result.failed}`);
    } catch (error) {
      console.error('Daily sync failed:', error);
    }
  }

  async manualSync(): Promise<{ success: number; failed: number }> {
    console.log('Starting manual sync at:', new Date().toISOString());
    return await leetCodeService.syncAllStudents();
  }
}

export const schedulerService = new SchedulerService();
