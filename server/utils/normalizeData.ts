/**
 * Data Normalization Utilities
 * Ensures consistent data types across the application
 */

/**
 * Normalize language statistics to always be Record<string, number>
 * Handles cases where languageStats might be stringified JSON or already an object
 */
export function normalizeLanguageStats(data: any): Record<string, number> {
  if (!data) return {};
  
  // Already a proper object
  if (typeof data === 'object' && !Array.isArray(data)) {
    return data as Record<string, number>;
  }
  
  // Try to parse if it's a string
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === 'object' ? parsed : {};
    } catch {
      console.warn('Failed to parse language stats:', data);
      return {};
    }
  }
  
  return {};
}
