/**
 * EXAMPLE: Custom Step Definitions Pattern
 *
 * This file demonstrates how to extend step definitions for custom scenarios.
 * Copy patterns from here to add new test scenarios.
 *
 * NOTE: This file is for reference only and does not register actual step definitions.
 * All code examples below are within comments to prevent TypeScript compilation errors.
 * Copy the patterns you need to your own step definition files and uncomment them.
 *
 * Location: Create your own file at tests/steps/custom-steps.ts
 */

/**
 * To use these examples:
 * 1. Create a new file (e.g., tests/steps/custom-steps.ts)
 * 2. Copy the import statements below
 * 3. Copy the step definitions you need
 * 4. Modify them for your specific use case
 *
 * Required imports:
 * import { Given, When, Then } from '@cucumber/cucumber';
 * import { Page, expect } from '@playwright/test';
 * import { TestUtils, Selectors } from './test-utils';
 * import { TEST_CONFIG } from './test-config';
 *
 * You'll also need a page variable from your Before hook:
 * let page: Page;
 */

/**
 * ============================================================================
 * EXAMPLE 1: Testing a specific feature
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * Given I click on the "Contact Us" button
 * Then the contact form should be visible
 * And the form should have email field
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I click on the {string} button', async (buttonText: string) => {
 *   const button = page.locator(`button:has-text("${buttonText}")`).first();
 *   await expect(button).toBeVisible();
 *   await button.click();
 *   await page.waitForTimeout(500);
 * });
 *
 * Then('the contact form should be visible', async () => {
 *   const form = page.locator('form, [class*="contact-form"]').first();
 *   await expect(form).toBeVisible();
 * });
 *
 * Then('the form should have email field', async () => {
 *   const emailField = page.locator('input[type="email"]').first();
 *   await expect(emailField).toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 2: Form filling and submission
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I fill the form with:
 *   | Field | Value |
 *   | name  | John Doe |
 *   | email | john@example.com |
 * And I submit the form
 * Then I should see success message
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I fill the form with:', async (dataTable: any) => {
 *   const data = dataTable.rowsHash();
 *   for (const [field, value] of Object.entries(data)) {
 *     await TestUtils.fillField(page, `input[name="${field}"]`, String(value));
 *   }
 * });
 *
 * When('I submit the form', async () => {
 *   const submitButton = page.locator('button[type="submit"]').first();
 *   await submitButton.click();
 *   await page.waitForLoadState('networkidle');
 * });
 *
 * Then('I should see success message', async () => {
 *   const successMsg = page.locator('[class*="success"]').first();
 *   await expect(successMsg).toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 3: List/Table testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * Given I navigate to the Services page
 * Then the services list should have at least 3 items
 * And each service should have a title and description
 * ```
 *
 * Step definitions:
 * ```typescript
 * Then('the services list should have at least {int} items', async (minItems: number) => {
 *   const items = await page.locator('[class*="service-card"]').count();
 *   expect(items).toBeGreaterThanOrEqual(minItems);
 * });
 *
 * Then('each service should have a title and description', async () => {
 *   const firstItem = page.locator('[class*="service"]').first();
 *   const title = await firstItem.locator('h3, h4').first().isVisible();
 *   const desc = await firstItem.locator('p').first().isVisible();
 *   expect(title).toBeTruthy();
 *   expect(desc).toBeTruthy();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 4: API integration testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I click fetch products button
 * Then the API should return products successfully
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I click fetch products button', async () => {
 *   const button = page.locator('button:has-text("Fetch Products")').first();
 *   await button.click();
 * });
 *
 * Then('the API should return products successfully', async () => {
 *   const response = await TestUtils.waitForApiResponse(page, /api\/products/);
 *   expect(response).toBeDefined();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 5: Multiple viewport testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * Given I view the page on mobile
 * Then the layout should be responsive
 * ```
 *
 * Step definitions:
 * ```typescript
 * Given('I view the page on mobile', async () => {
 *   await TestUtils.setMobileViewport(page);
 *   await page.reload();
 *   await page.waitForLoadState('networkidle');
 * });
 *
 * Given('I view the page on tablet', async () => {
 *   await TestUtils.setTabletViewport(page);
 *   await page.reload();
 *   await page.waitForLoadState('networkidle');
 * });
 *
 * Then('the layout should be responsive', async () => {
 *   const main = page.locator('main').first();
 *   const width = await main.evaluate((el) => el.clientWidth);
 *   expect(width).toBeGreaterThan(0);
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 6: Dropdown/Select testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I select "Option 1" from the dropdown
 * Then "Option 1" should be selected
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I select {string} from the dropdown', async (option: string) => {
 *   const dropdown = page.locator('select').first();
 *   await dropdown.selectOption(option);
 * });
 *
 * Then('{string} should be selected', async (option: string) => {
 *   const dropdown = page.locator('select').first();
 *   const selectedValue = await dropdown.inputValue();
 *   expect(selectedValue).toContain(option);
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 7: Modal/Dialog testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I click the open modal button
 * Then a modal dialog should appear
 * When I click the close button
 * Then the modal should be closed
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I click the open modal button', async () => {
 *   const button = page.locator('button:has-text("Open")').first();
 *   await button.click();
 * });
 *
 * Then('a modal dialog should appear', async () => {
 *   const modal = page.locator('[role="dialog"]').first();
 *   await expect(modal).toBeVisible();
 * });
 *
 * When('I click the close button', async () => {
 *   const closeBtn = page.locator('[aria-label="close"]').first();
 *   await closeBtn.click();
 * });
 *
 * Then('the modal should be closed', async () => {
 *   const modal = page.locator('[role="dialog"]').first();
 *   await expect(modal).not.toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 8: Keyboard interactions
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I type "search term" in the search box
 * And I press Enter
 * Then search results should be displayed
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I type {string} in the search box', async (text: string) => {
 *   const searchBox = page.locator('input[placeholder*="search"]').first();
 *   await TestUtils.fillField(page, 'input[placeholder*="search"]', text);
 * });
 *
 * When('I press Enter', async () => {
 *   await page.keyboard.press('Enter');
 *   await page.waitForTimeout(1000);
 * });
 *
 * Then('search results should be displayed', async () => {
 *   const results = page.locator('[class*="result"]').first();
 *   await expect(results).toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 9: Hover/Mouse interactions
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When I hover over the profile icon
 * Then a dropdown menu should appear
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('I hover over the profile icon', async () => {
 *   const icon = page.locator('[class*="profile"]').first();
 *   await icon.hover();
 *   await page.waitForTimeout(500);
 * });
 *
 * Then('a dropdown menu should appear', async () => {
 *   const menu = page.locator('[role="menu"]').first();
 *   await expect(menu).toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE 10: Network error testing
 * ============================================================================
 *
 * Usage in feature file:
 * ```gherkin
 * When the API fails
 * Then an error message should be displayed
 * ```
 *
 * Step definitions:
 * ```typescript
 * When('the API fails', async () => {
 *   // Set the page to offline mode
 *   await page.context().setOffline(true);
 *   // Or route specific API calls to fail
 *   await page.route('**' + '/api/**', route => route.abort());
 * });
 *
 * Then('an error message should be displayed', async () => {
 *   const errorMsg = page.locator('[class*="error"]').first();
 *   await expect(errorMsg).toBeVisible();
 * });
 * ```
 */

/**
 * ============================================================================
 * EXAMPLE FEATURE FILE
 * ============================================================================
 *
 * Create a file at tests/features/example.feature with:
 *
 * ```gherkin
 * Feature: Example Feature
 *   As a user
 *   I want to interact with features
 *   So that I can test the application
 *
 *   Scenario: User can fill and submit a form
 *     Given I navigate to the home page
 *     When I click on the "Contact Us" button
 *     Then the contact form should be visible
 *     When I fill the form with:
 *       | name  | John Doe      |
 *       | email | john@test.com |
 *     And I submit the form
 *     Then I should see success message
 *
 *   Scenario: Services list displays correctly
 *     Given I navigate to the Services page
 *     Then the services list should have at least 3 items
 *     And each service should have a title and description
 *
 *   Scenario: Page is responsive on mobile
 *     Given I view the page on mobile
 *     And I navigate to the home page
 *     Then the layout should be responsive
 * ```
 */

// This file exports nothing - it's for reference only
export {};
