# Quick Start Guide - Cucumber Testing Framework

## 1️⃣ One-Time Setup

```bash
# Install Playwright browsers
npx playwright install

# Install dependencies (if not already done)
npm install
```

## 2️⃣ Running Tests

### Terminal 1: Start the Application
```bash
npm start
```
App will be available at `http://localhost:4200`

### Terminal 2: Run Tests
```bash
npm run test:cucumber
```

## 3️⃣ Expected Output
```
33 scenarios (33 passed)
127 steps (127 passed)
0m04.510s
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `tests/steps/steps.ts` | 100+ step definitions |
| `tests/steps/test-utils.ts` | Helper utilities |
| `tests/steps/test-config.ts` | Configuration |
| `tests/features/` | BDD feature files |
| `tests/tsconfig.json` | TypeScript config |
| `playwright.config.ts` | Playwright config |

## 🧪 Test Coverage

- ✅ Navigation (8 scenarios)
- ✅ Home Page (3 scenarios)
- ✅ About Page (3 scenarios)
- ✅ Gallery Page (4 scenarios)
- ✅ Services Page (3 scenarios)
- ✅ Clients Page (4 scenarios)
- ✅ Testimonials Page (4 scenarios)
- ✅ Pricing Page (4 scenarios)

**Total: 33 scenarios, 127 steps**

## 🔧 Commands Reference

```bash
# Run tests
npm run test:cucumber

# Run with explicit config (for CI/CD)
$env:TS_NODE_PROJECT="tests/tsconfig.json"; npx cucumber-js --require-module ts-node/register --require 'tests/steps/*.ts' 'tests/features/**/*.feature'

# View test results report
npm run test:e2e:report

# Run in debug mode
$env:DEBUG=pw:api; npm run test:cucumber
```

## ⚙️ Configuration

### Playwright Features
- **Browsers**: Chromium, Firefox, WebKit
- **Devices**: Pixel 5, iPhone 12 (testing mobile)
- **Base URL**: http://localhost:4200
- **Timeout**: 30 seconds

### Cucumber Settings
- **Language**: Gherkin (English)
- **Format**: Progress reporter
- **Retry**: 0 (configured for CI/CD)
- **Parallel**: Can be enabled with `--parallel N`

## 🐛 Troubleshooting

### Tests Show "0 scenarios"
```bash
# Set TypeScript config explicitly
$env:TS_NODE_PROJECT="tests/tsconfig.json"
```

### "net::ERR_CONNECTION_REFUSED"
- Ensure `npm start` is running in another terminal
- App should be at `http://localhost:4200`

### "Cannot use import statement outside a module"
- Run with proper tsconfig: `$env:TS_NODE_PROJECT="tests/tsconfig.json"`

### Playwright browsers not found
```bash
npx playwright install
```

## 📊 Test Structure Example

```gherkin
Feature: About page displays company information

  Scenario: Feature blocks are properly formatted
    Given I navigate to the About page
    When I view the features section
    Then feature blocks should be displayed
    And each feature block should have a title
    And each feature block should have descriptive text
    And feature blocks should be aligned in a grid
```

## ✨ Features

- ✅ 127 step definitions covering all pages
- ✅ Responsive design testing (mobile, tablet, desktop)
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Custom assertions and helpers
- ✅ BDD-style human-readable tests
- ✅ CI/CD ready with GitHub Actions
- ✅ Parallel execution capable

## 🚀 CI/CD Integration

Framework is pre-configured for GitHub Actions. Tests run automatically on:
- Pull requests
- Push to master branch
- Scheduled runs

## 📝 Adding New Tests

1. Create/edit `.feature` file in `tests/features/`
2. Add step definitions to `tests/steps/steps.ts`
3. Run tests: `npm run test:cucumber`

Example:
```gherkin
Then('the page should display {string}', async (text: string) => {
  const content = await page.locator('body');
  await expect(content).toContainText(text);
});
```

## 📞 Support

For issues or questions:
1. Check `TESTING_FRAMEWORK.md` for detailed docs
2. Review step definitions in `tests/steps/steps.ts`
3. Check feature files in `tests/features/`
4. Review Playwright docs: https://playwright.dev

---

**Status**: ✅ Production Ready | **Tests**: 127 Steps | **Coverage**: 8 Pages
