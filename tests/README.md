# Playwright & Cucumber BDD Testing Setup

This directory contains end-to-end tests using Playwright and Cucumber (BDD - Behavior Driven Development).

## Project Structure

```
tests/
├── features/          # Gherkin feature files
│   ├── navigation.feature
│   ├── home.feature
│   ├── about.feature
│   ├── gallery.feature
│   ├── services.feature
│   ├── clients.feature
│   ├── testimonials.feature
│   └── pricing.feature
└── steps/            # Step definitions
    └── steps.ts
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install --save-dev \
  @playwright/test \
  @cucumber/cucumber \
  ts-node \
  typescript
```

Or using the package.json scripts (after updating).

### 2. Configuration Files

- **`playwright.config.ts`**: Playwright test configuration with browser configurations and options
- **`cucumber.ts`**: Cucumber BDD configuration for feature file parsing

### 3. Run Tests

#### Run all tests
```bash
npm run test:e2e
```

#### Run specific feature file
```bash
npx playwright test tests/features/home.feature
```

#### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

#### Run tests in debug mode
```bash
npx playwright test --debug
```

#### Generate HTML report
```bash
npx playwright show-report
```

## Feature Files Overview

### Navigation Features (`navigation.feature`)
Tests for:
- Home page access
- Navigation between pages
- 404 error handling

### Home Page Features (`home.feature`)
Tests for:
- Hero banner display
- Footer visibility
- Social media links

### About Page Features (`about.feature`)
Tests for:
- Company information display
- Feature blocks
- Grid layout

### Gallery Features (`gallery.feature`)
Tests for:
- Image loading
- Lightbox functionality
- Responsive design

### Services Features (`services.feature`)
Tests for:
- Service card display
- Card formatting
- Mobile responsiveness

### Clients Features (`clients.feature`)
Tests for:
- Client logo display
- Logo grouping
- Responsive layout

### Testimonials Features (`testimonials.feature`)
Tests for:
- Testimonial card display
- User information
- Mobile readiness

### Pricing Features (`pricing.feature`)
Tests for:
- Pricing plan display
- Plan differentiation
- Mobile adaptation

## Step Definitions

All step definitions are in `tests/steps/steps.ts`. They use:
- **Playwright** for browser automation
- **Cucumber** for BDD scenario execution
- **Expect** for assertions

### Common Step Patterns

Navigation steps:
```gherkin
Given I navigate to the home page
When I click on the About navigation link
Then I should be on the About page
```

Visibility steps:
```gherkin
Then the page should display about content
And gallery images should be loaded
```

Responsive design steps:
```gherkin
Given I navigate to the Gallery page with mobile viewport
Then images should be properly scaled on mobile
```

## Configuration Details

### Playwright Config
- **Base URL**: `http://localhost:4200`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Testing**: Pixel 5, iPhone 12
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry
- **Local Dev Server**: Automatically starts with `npm start`

### Cucumber Config
- **Step Definitions**: `dist/tests/steps/**/*.js`
- **Reports**: 
  - HTML report: `cucumber-report.html`
  - JSON report: `cucumber-report.json`
- **Parallel**: 2 workers

## Best Practices

1. **Feature Files**: Write clear, descriptive scenario titles
2. **Step Definitions**: Keep steps focused and reusable
3. **Selectors**: Use generic selectors like `[class*="gallery"]` for flexibility
4. **Waits**: Use explicit waits with `waitForLoadState()` and `waitForTimeout()`
5. **Screenshots**: Check failure screenshots in `test-results/` folder

## Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check if development server is running on port 4200

### Selectors not found
- Verify the actual class names in your Angular components
- Use browser dev tools to inspect elements
- Update selectors in step definitions accordingly

### Flaky tests
- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Increase wait times for animations
- Use more stable selectors

## Integration with CI/CD

Tests are configured to run in CI mode:
```bash
CI=true npm run test:e2e
```

In CI mode:
- Tests run serially (workers: 1)
- Retries are enabled (2 retries)
- Screenshots and videos are captured on failure

## References

- [Playwright Documentation](https://playwright.dev)
- [Cucumber JavaScript Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
