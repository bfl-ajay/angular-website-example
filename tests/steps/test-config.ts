export const TEST_CONFIG = {
  // Timeouts
  TIMEOUT_SHORT: 3000,
  TIMEOUT_MEDIUM: 5000,
  TIMEOUT_LONG: 10000,
  NAVIGATION_TIMEOUT: 15000,

  // URLs
  BASE_URL: 'http://localhost:4200',
  HOME_URL: 'http://localhost:4200/',
  ABOUT_URL: 'http://localhost:4200/about',
  GALLERY_URL: 'http://localhost:4200/gallery',
  SERVICES_URL: 'http://localhost:4200/services',
  CLIENTS_URL: 'http://localhost:4200/clients',
  TESTIMONIALS_URL: 'http://localhost:4200/testimonials',
  PRICING_URL: 'http://localhost:4200/pricing',

  // Wait times
  WAIT_FOR_ELEMENT: 5000,
  WAIT_FOR_LOAD: 'networkidle',
  POLL_INTERVAL: 100,

  // Viewport sizes
  MOBILE: { width: 375, height: 667 },
  TABLET: { width: 768, height: 1024 },
  DESKTOP: { width: 1920, height: 1080 },

  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,

  // Test data
  TEST_USER: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
  },

  // Common selectors
  SELECTORS: {
    NAVIGATION: 'nav',
    NAVIGATION_MENU: 'nav a',
    FOOTER: 'footer',
    FOOTER_LINKS: 'footer a',
    HERO_BANNER: '[class*="banner"], [class*="hero"]',
    PAGE_TITLE: 'h1',
    PAGE_DESCRIPTION: 'p',
    SERVICE_CARD: '[class*="service"]',
    PRICING_PLAN: '[class*="pricing"], [class*="plan"]',
    TESTIMONIAL: '[class*="testimonial"], [class*="feedback"]',
    GALLERY_IMAGE: '[class*="gallery"] img',
    CLIENT_LOGO: '[class*="client"] img, [class*="company"] img',
    FEATURE_BLOCK: '[class*="feature"]',
    BUTTON: 'button, a[class*="btn"]',
    FORM: 'form',
    ERROR_MESSAGE: '[class*="error"], [class*="alert"]',
  },
};

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error(`Failed after ${maxAttempts} attempts`);
}

/**
 * Wait for a condition to be true
 */
export async function waitForCondition(
  condition: () => Promise<boolean> | boolean,
  timeout: number = TEST_CONFIG.TIMEOUT_MEDIUM,
  pollInterval: number = TEST_CONFIG.POLL_INTERVAL
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await Promise.resolve(condition())) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Sleep for a specified number of milliseconds
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email
 */
export function generateRandomEmail(): string {
  return `test-${generateRandomString(8)}@example.com`;
}

/**
 * Format a date to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get current timestamp
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Parse URL and get query parameters
 */
export function getQueryParams(url: string): Record<string, string> {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Check if URL matches pattern
 */
export function urlMatches(url: string, pattern: string | RegExp): boolean {
  if (typeof pattern === 'string') {
    return url.includes(pattern);
  }
  return pattern.test(url);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Get environment variable with default
 */
export function getEnvVar(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

/**
 * Test data builders
 */
export const TestDataBuilders = {
  user: (overrides = {}) => ({
    name: 'Test User',
    email: generateRandomEmail(),
    phone: '123-456-7890',
    ...overrides,
  }),

  contact: (overrides = {}) => ({
    name: 'John Doe',
    email: generateRandomEmail(),
    message: 'Test message',
    ...overrides,
  }),

  subscriber: (overrides = {}) => ({
    email: generateRandomEmail(),
    ...overrides,
  }),
};

/**
 * Assert helpers
 */
export const AssertHelpers = {
  isGreaterThan: (value: number, threshold: number) => {
    if (value <= threshold) {
      throw new Error(`Expected ${value} to be greater than ${threshold}`);
    }
  },

  isLessThan: (value: number, threshold: number) => {
    if (value >= threshold) {
      throw new Error(`Expected ${value} to be less than ${threshold}`);
    }
  },

  isGreaterThanOrEqual: (value: number, threshold: number) => {
    if (value < threshold) {
      throw new Error(`Expected ${value} to be greater than or equal to ${threshold}`);
    }
  },

  isLessThanOrEqual: (value: number, threshold: number) => {
    if (value > threshold) {
      throw new Error(`Expected ${value} to be less than or equal to ${threshold}`);
    }
  },

  matches: (value: string, pattern: RegExp) => {
    if (!pattern.test(value)) {
      throw new Error(`Expected ${value} to match pattern ${pattern}`);
    }
  },

  contains: (value: string, substring: string) => {
    if (!value.includes(substring)) {
      throw new Error(`Expected ${value} to contain ${substring}`);
    }
  },
};
