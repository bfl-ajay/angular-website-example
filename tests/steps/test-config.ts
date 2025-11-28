/**
 * Test Configuration Helpers
 * Common configuration utilities for testing
 */

export const TEST_CONFIG = {
  // Timeouts
  TIMEOUT_SHORT: 3000,
  TIMEOUT_DEFAULT: 5000,
  TIMEOUT_LONG: 10000,
  TIMEOUT_NAVIGATION: 15000,

  // URLs
  BASE_URL: 'http://localhost:4200',
  PORT: 4200,

  // Pages
  PAGES: {
    HOME: '/',
    ABOUT: '/about',
    GALLERY: '/gallery',
    SERVICES: '/services',
    CLIENTS: '/clients',
    TESTIMONIALS: '/testimonials',
    PRICING: '/pricing',
    NOTFOUND: '/not-found',
  },

  // Viewports
  VIEWPORTS: {
    MOBILE: { width: 375, height: 667 },
    TABLET: { width: 768, height: 1024 },
    DESKTOP: { width: 1920, height: 1080 },
  },

  // Retry settings
  RETRIES: 2,
  RETRY_INTERVAL: 1000,

  // Report settings
  REPORTS_DIR: './test-results',
  SCREENSHOTS_DIR: './test-results/screenshots',
  VIDEOS_DIR: './test-results/videos',
};

export const MOBILE_VIEWPORT = TEST_CONFIG.VIEWPORTS.MOBILE;
export const TABLET_VIEWPORT = TEST_CONFIG.VIEWPORTS.TABLET;
export const DESKTOP_VIEWPORT = TEST_CONFIG.VIEWPORTS.DESKTOP;

/**
 * Get page URL
 */
export function getPageUrl(page: string): string {
  const pageUrl = TEST_CONFIG.PAGES[page as keyof typeof TEST_CONFIG.PAGES];
  return `${TEST_CONFIG.BASE_URL}${pageUrl || page}`;
}

/**
 * Retry async operation
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries = TEST_CONFIG.RETRIES,
  interval = TEST_CONFIG.RETRY_INTERVAL,
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

/**
 * Wait for condition
 */
export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout = TEST_CONFIG.TIMEOUT_DEFAULT,
  pollInterval = 100,
): Promise<void> {
  const startTime = Date.now();

  while (true) {
    if (await condition()) {
      return;
    }

    if (Date.now() - startTime > timeout) {
      throw new Error(`Condition not met within ${timeout}ms`);
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }
}

/**
 * Compare URLs
 */
export function urlMatches(actualUrl: string, expectedPath: string): boolean {
  return actualUrl.includes(expectedPath);
}

/**
 * Build feature file path
 */
export function getFeaturePath(featureName: string): string {
  return `./tests/features/${featureName}.feature`;
}

/**
 * Build step definition path
 */
export function getStepPath(stepName: string): string {
  return `./tests/steps/${stepName}.ts`;
}
