import { Page, expect } from '@playwright/test';

/**
 * Common test utilities for Playwright automation
 */
export class TestUtils {
  /**
   * Wait for element to be visible
   */
  static async waitForElement(page: Page, selector: string, timeout = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  /**
   * Get text content of an element
   */
  static async getElementText(page: Page, selector: string): Promise<string | null> {
    return page.locator(selector).first().textContent();
  }

  /**
   * Check if element is visible
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).first().isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Count elements matching selector
   */
  static async countElements(page: Page, selector: string): Promise<number> {
    return page.locator(selector).count();
  }

  /**
   * Click element and wait for navigation
   */
  static async clickAndNavigate(page: Page, selector: string): Promise<void> {
    await Promise.all([
      page.waitForNavigation(),
      page.click(selector),
    ]);
  }

  /**
   * Fill form field
   */
  static async fillField(page: Page, selector: string, value: string): Promise<void> {
    await page.fill(selector, value);
  }

  /**
   * Submit form
   */
  static async submitForm(page: Page, formSelector: string): Promise<void> {
    await page.locator(`${formSelector} button[type="submit"]`).click();
    await page.waitForLoadState('networkidle');
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(page: Page): Promise<void> {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  }

  /**
   * Get page URL
   */
  static async getPageUrl(page: Page): Promise<string> {
    return page.url();
  }

  /**
   * Get page title
   */
  static async getPageTitle(page: Page): Promise<string> {
    return page.title();
  }

  /**
   * Take screenshot
   */
  static async takeScreenshot(page: Page, filename: string): Promise<void> {
    await page.screenshot({ path: `test-results/${filename}.png` });
  }

  /**
   * Wait for element text to contain value
   */
  static async waitForTextContent(page: Page, selector: string, text: string, timeout = 5000): Promise<void> {
    await page.locator(`${selector}:has-text("${text}")`).first().waitFor({ timeout });
  }

  /**
   * Check if URL contains path
   */
  static async urlContains(page: Page, path: string): Promise<boolean> {
    const url = await TestUtils.getPageUrl(page);
    return url.includes(path);
  }

  /**
   * Get attribute value
   */
  static async getAttributeValue(page: Page, selector: string, attribute: string): Promise<string | null> {
    return page.locator(selector).first().getAttribute(attribute);
  }

  /**
   * Check if element has class
   */
  static async elementHasClass(page: Page, selector: string, className: string): Promise<boolean> {
    const classAttr = await TestUtils.getAttributeValue(page, selector, 'class');
    return classAttr?.includes(className) || false;
  }

  /**
   * Get all text from multiple elements
   */
  static async getAllTextContent(page: Page, selector: string): Promise<string[]> {
    const locators = await page.locator(selector).all();
    const texts: string[] = [];
    for (const locator of locators) {
      const text = await locator.textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  /**
   * Wait for API response
   */
  static async waitForApiResponse(page: Page, urlPattern: string | RegExp): Promise<any> {
    const response = await page.waitForResponse((response) => {
      if (typeof urlPattern === 'string') {
        return response.url().includes(urlPattern);
      }
      return urlPattern.test(response.url());
    });
    return response.json().catch(() => response);
  }

  /**
   * Set viewport size
   */
  static async setViewport(page: Page, width: number, height: number): Promise<void> {
    await page.setViewportSize({ width, height });
  }

  /**
   * Mobile viewport preset
   */
  static async setMobileViewport(page: Page): Promise<void> {
    await TestUtils.setViewport(page, 375, 667);
  }

  /**
   * Tablet viewport preset
   */
  static async setTabletViewport(page: Page): Promise<void> {
    await TestUtils.setViewport(page, 768, 1024);
  }

  /**
   * Desktop viewport preset
   */
  static async setDesktopViewport(page: Page): Promise<void> {
    await TestUtils.setViewport(page, 1920, 1080);
  }
}

/**
 * Custom selectors for common elements
 */
export const Selectors = {
  // Navigation
  navMenu: 'nav',
  navLink: (text: string) => `a:has-text("${text}")`,

  // Common elements
  heading: (level: number = 1) => `h${level}`,
  button: (text?: string) => text ? `button:has-text("${text}")` : 'button',
  link: (text?: string) => text ? `a:has-text("${text}")` : 'a',

  // Sections
  header: 'header, [class*="header"]',
  footer: 'footer, [class*="footer"]',
  section: (name: string) => `[class*="${name}"], section[id*="${name}"]`,

  // Cards and blocks
  card: '[class*="card"]',
  block: '[class*="block"]',
  feature: '[class*="feature"]',

  // Images
  image: (alt?: string) => alt ? `img[alt="${alt}"]` : 'img',
  gallery: '[class*="gallery"] img',

  // Forms
  form: 'form',
  input: (type?: string) => type ? `input[type="${type}"]` : 'input',
  textarea: 'textarea',
  select: 'select',

  // Social
  socialLinks: '[class*="social"] a',
  socialIcons: '[class*="social"] i, [class*="social"] svg',
};
