import { Page, expect } from '@playwright/test';

export class TestUtils {
  constructor(private page: Page) {}

  // ============ Element Utilities ============

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async fillField(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible().catch(() => false);
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled().catch(() => false);
  }

  // ============ Navigation Utilities ============

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ============ Wait Utilities ============

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 5000,
    pollInterval: number = 100
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.waitForTimeout(pollInterval);
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  // ============ Viewport Utilities ============

  async setViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async setMobileViewport(): Promise<void> {
    await this.setViewport(375, 667);
  }

  async setTabletViewport(): Promise<void> {
    await this.setViewport(768, 1024);
  }

  async setDesktopViewport(): Promise<void> {
    await this.setViewport(1920, 1080);
  }

  // ============ Input Utilities ============

  async typeText(selector: string, text: string, delay: number = 0): Promise<void> {
    await this.page.locator(selector).fill(text, { timeout: 5000 });
    if (delay > 0) {
      await this.waitForTimeout(delay);
    }
  }

  async clearField(selector: string): Promise<void> {
    await this.page.fill(selector, '');
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async pressEnter(): Promise<void> {
    await this.pressKey('Enter');
  }

  async pressEscape(): Promise<void> {
    await this.pressKey('Escape');
  }

  // ============ Scroll Utilities ============

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollBy(pixels: number): Promise<void> {
    await this.page.evaluate((p) => window.scrollBy(0, p), pixels);
  }

  // ============ Form Utilities ============

  async submitForm(formSelector: string): Promise<void> {
    await this.page.locator(`${formSelector} button[type="submit"]`).click();
  }

  async fillForm(fields: Record<string, string>): Promise<void> {
    for (const [selector, value] of Object.entries(fields)) {
      await this.fillField(selector, value);
    }
  }

  async getFormError(errorSelector: string): Promise<string> {
    return await this.getElementText(errorSelector);
  }

  // ============ Assertion Utilities ============

  async expectElementVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementNotVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).not.toBeVisible();
  }

  async expectElementEnabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeEnabled();
  }

  async expectElementDisabled(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeDisabled();
  }

  async expectTextInElement(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  async expectUrlContains(substring: string): Promise<void> {
    expect(this.page.url()).toContain(substring);
  }

  async expectPageTitle(title: string): Promise<void> {
    expect(await this.page.title()).toContain(title);
  }

  // ============ Attribute Utilities ============

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute);
  }

  async hasAttribute(selector: string, attribute: string): Promise<boolean> {
    const value = await this.getAttribute(selector, attribute);
    return value !== null;
  }

  async getClass(selector: string): Promise<string | null> {
    return await this.getAttribute(selector, 'class');
  }

  // ============ Content Utilities ============

  async getPageContent(): Promise<string | null> {
    return await this.page.content();
  }

  async getInnerText(selector: string): Promise<string> {
    return await this.page.locator(selector).innerText();
  }

  async getAllText(selector: string): Promise<string[]> {
    const elements = await this.page.locator(selector).all();
    const texts: string[] = [];
    for (const element of elements) {
      texts.push(await element.innerText());
    }
    return texts;
  }

  // ============ Network Utilities ============

  async waitForResponse(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForResponse((response) => {
      if (typeof urlPattern === 'string') {
        return response.url().includes(urlPattern);
      }
      return urlPattern.test(response.url());
    });
  }

  // ============ Selector Presets ============

  getSelectors() {
    return {
      navigation: 'nav',
      navigationMenu: 'nav a',
      footer: 'footer',
      footerLinks: 'footer a',
      banner: '[class*="banner"]',
      hero: '[class*="hero"]',
      title: 'h1, h2, h3',
      description: 'p, [class*="description"]',
      button: 'button, a[class*="btn"]',
      primaryButton: 'button[class*="primary"], a[class*="primary"]',
      cards: '[class*="card"]',
      image: 'img',
      form: 'form',
      input: 'input',
      textArea: 'textarea',
      select: 'select',
      label: 'label',
      error: '[class*="error"], [class*="alert"]',
      success: '[class*="success"]',
      socialLinks: '[class*="social"] a',
      serviceCard: '[class*="service"]',
      pricingPlan: '[class*="pricing"], [class*="plan"]',
      testimonial: '[class*="testimonial"], [class*="feedback"]',
      galleryImage: '[class*="gallery"] img',
      clientLogo: '[class*="client"] img, [class*="company"] img',
      featureBlock: '[class*="feature"]',
    };
  }

  // ============ Retry Utilities ============

  async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.waitForTimeout(delay);
        }
      }
    }

    throw lastError || new Error(`Failed after ${maxAttempts} attempts`);
  }

  // ============ Screenshot Utilities ============

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async captureFullPage(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}-full.png`, fullPage: true });
  }
}
