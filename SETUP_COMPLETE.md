# Playwright & Cucumber Testing - Complete Setup Guide

## 📋 Overview

A complete BDD testing framework has been generated for your Angular website project using Playwright and Cucumber. This includes:

- ✅ Playwright configuration for browser automation
- ✅ Cucumber configuration for BDD scenarios
- ✅ 8 Feature files with 33 test scenarios
- ✅ 100+ Step definitions
- ✅ Test utilities and helper functions
- ✅ Complete documentation

## 📁 Generated Files Checklist

### Root Configuration Files
- ✅ `playwright.config.ts` - Playwright test configuration
- ✅ `cucumber.ts` - Cucumber BDD configuration
- ✅ `.env.example` - Environment variables template
- ✅ `TESTING.md` - Quick start guide
- ✅ `TESTING_SETUP_SUMMARY.md` - Detailed setup summary

### Tests Directory Structure
```
tests/
├── .gitignore                          # Git ignore rules
├── README.md                           # Detailed documentation
├── tsconfig.json                       # TypeScript configuration
│
├── features/                           # BDD Scenarios (8 files)
│   ├── navigation.feature             # Navigation & routing tests
│   ├── home.feature                   # Home page tests
│   ├── about.feature                  # About page tests
│   ├── gallery.feature                # Gallery tests
│   ├── services.feature               # Services tests
│   ├── clients.feature                # Clients tests
│   ├── testimonials.feature           # Testimonials tests
│   └── pricing.feature                # Pricing tests
│
└── steps/                              # Step Definitions (4 files)
    ├── steps.ts                       # All step definitions (100+ steps)
    ├── test-utils.ts                  # Utility functions and selectors
    ├── test-config.ts                 # Configuration constants
    ├── EXAMPLES.ts                    # Example patterns for custom tests
    └── tsconfig.json                  # TypeScript config
```

### Package.json Updates
- ✅ Added `@playwright/test` dependency
- ✅ Added `@cucumber/cucumber` dependency
- ✅ Added 7 new test scripts

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- `@playwright/test@^1.40.0` - Browser automation
- `@cucumber/cucumber@^9.5.0` - BDD framework
- All other project dependencies

### Step 2: Start the Application
```bash
npm start
```

Application will be available at: `http://localhost:4200`

### Step 3: Run Tests (in another terminal)
```bash
npm run test:e2e
```

### Step 4: View Test Report
```bash
npm run test:e2e:report
```

## 📊 Feature Files Overview

### 1. Navigation Feature (8 scenarios)
Tests navigation between all pages and routing

### 2. Home Feature (3 scenarios)
Tests hero banner, footer, and social links

### 3. About Feature (3 scenarios)
Tests company info and feature blocks

### 4. Gallery Feature (4 scenarios)
Tests image loading and lightbox functionality

### 5. Services Feature (3 scenarios)
Tests service cards and responsive design

### 6. Clients Feature (4 scenarios)
Tests client logos and responsive layout

### 7. Testimonials Feature (4 scenarios)
Tests testimonial cards and user information

### 8. Pricing Feature (4 scenarios)
Tests pricing plans and CTA buttons

**Total: 33 test scenarios**

## 🎮 Available Test Commands

| Command | Purpose |
|---------|---------|
| `npm run test:e2e` | Run all tests |
| `npm run test:e2e:headed` | Run tests with browser visible |
| `npm run test:e2e:debug` | Interactive debug mode |
| `npm run test:e2e:ui` | UI mode test explorer |
| `npm run test:e2e:report` | View HTML test report |
| `npx playwright test --grep "home"` | Run tests matching pattern |
| `npx playwright test --headed tests/features/home.feature` | Run specific file |

## 🔧 Configuration Details

### Playwright Config (`playwright.config.ts`)
- Base URL: `http://localhost:4200`
- Browsers: Chromium, Firefox, WebKit
- Mobile: Pixel 5, iPhone 12
- Features:
  - Screenshots on failure
  - Videos on failure
  - HTML reports
  - Trace on first retry

### Cucumber Config (`cucumber.ts`)
- Step definitions from: `dist/tests/steps/**/*.js`
- Reports: HTML, JSON, JUnit XML
- Parallel workers: 2

## 📝 Step Definition Reference

### Navigation Steps
```gherkin
Given I navigate to the home page
When I click on the About navigation link
Then I should be on the About page
```

### Visibility Steps
```gherkin
Then the page should display about content
And gallery images should be loaded
And service cards should be visible
```

### Responsive Steps
```gherkin
Given I navigate to the Gallery page with mobile viewport
Then images should be properly scaled on mobile
```

### Utility Methods (test-utils.ts)
- `TestUtils.waitForElement()` - Wait for element
- `TestUtils.getElementText()` - Get text content
- `TestUtils.isElementVisible()` - Check visibility
- `TestUtils.countElements()` - Count matching elements
- `TestUtils.fillField()` - Fill form field
- `TestUtils.scrollToElement()` - Scroll to element
- `TestUtils.takeScreenshot()` - Capture screenshot
- `TestUtils.setMobileViewport()` - Set mobile view
- And more...

## 🛠️ Extending Tests

### Add New Feature File
1. Create file in `tests/features/` with `.feature` extension
2. Write Gherkin scenarios using BDD syntax
3. Reference existing step definitions or create new ones

### Add New Step Definitions
1. Open `tests/steps/steps.ts`
2. Add new Given/When/Then steps
3. Use existing patterns as reference
4. See `EXAMPLES.ts` for common patterns

### Use Custom Selectors
Update selectors in `tests/steps/test-utils.ts`:
```typescript
export const Selectors = {
  myElement: '[class*="my-element"]',
  myForm: '#myForm',
  // ...
}
```

## ✅ Test Scenarios Covered

### Navigation & Routing
- ✅ Access all pages
- ✅ Navigate between pages
- ✅ Handle 404 errors

### Component Display
- ✅ Hero banner
- ✅ Navigation menu
- ✅ Footer
- ✅ Feature blocks
- ✅ Gallery images
- ✅ Service cards
- ✅ Client logos
- ✅ Testimonials
- ✅ Pricing plans

### Responsive Design
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1920x1080)

### Content Verification
- ✅ Text content
- ✅ Images
- ✅ Links
- ✅ Buttons
- ✅ Forms (extensible)

### Browser Compatibility
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit
- ✅ Mobile Chrome
- ✅ Mobile Safari

## 🐛 Debugging

### Debug Mode
```bash
npm run test:e2e:debug
```
Opens Playwright Inspector - step through code line by line

### UI Mode
```bash
npm run test:e2e:ui
```
Interactive test explorer with live updates

### View Failure Details
```bash
npm run test:e2e:report
```
HTML report shows screenshots/videos of failures

### Run with Logging
```bash
DEBUG=* npm run test:e2e
```

## 📚 Documentation Files

### Quick Reference
- **TESTING.md** - Start here (Quick start guide)
- **TESTING_SETUP_SUMMARY.md** - Complete overview

### Detailed Guides
- **tests/README.md** - Comprehensive testing documentation
- **tests/steps/EXAMPLES.ts** - Pattern examples for custom tests

### Configuration
- **.env.example** - Environment variable template
- **playwright.config.ts** - Playwright settings
- **cucumber.ts** - Cucumber settings
- **tests/tsconfig.json** - TypeScript settings

## 🔗 Integration with CI/CD

### GitHub Actions Example
```bash
# In CI environment
CI=true npm run test:e2e
```

Settings for CI:
- Tests run serially (no parallelization)
- Retries enabled (2 attempts)
- Screenshots captured on failure
- Videos recorded on failure

## ⚡ Performance Tips

1. **Run tests in parallel**: Default 4 workers
2. **Use specific selectors**: More stable than general ones
3. **Add explicit waits**: Use `waitForLoadState('networkidle')`
4. **Minimize retries**: Make tests deterministic
5. **Skip videos in local**: Configure in playwright.config.ts

## 🆘 Troubleshooting

### Tests timeout
- Ensure app runs on `http://localhost:4200`
- Check network connectivity
- Increase timeout in playwright.config.ts

### Selectors not found
- Use browser DevTools to inspect
- Update selector in steps
- Use less specific patterns: `[class*="feature"]`

### Flaky tests
- Add explicit waits: `waitForLoadState('networkidle')`
- Increase wait times for animations
- Use more specific selectors
- Check for race conditions

### Module not found
```bash
npm install
npx playwright install
```

## 📞 Support Resources

- [Playwright Docs](https://playwright.dev) - Browser automation
- [Cucumber Docs](https://cucumber.io) - BDD framework
- [TypeScript Docs](https://www.typescriptlang.org) - Language reference
- Check test-results/ for failure screenshots

## ✨ Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm start`
3. ✅ Run `npm run test:e2e`
4. ✅ Run `npm run test:e2e:report`
5. ✅ Extend tests with custom scenarios
6. ✅ Integrate with CI/CD pipeline

## 📋 Checklist

Before running tests, verify:
- [ ] Node.js installed (v14+)
- [ ] npm/yarn installed
- [ ] Dependencies installed: `npm install`
- [ ] Application starts: `npm start`
- [ ] Application accessible at `http://localhost:4200`
- [ ] Port 4200 is not in use
- [ ] All test files exist in `tests/` directory

## 🎉 Setup Complete!

Your Playwright & Cucumber testing framework is ready to use.

### Start Testing Now
```bash
# Terminal 1
npm start

# Terminal 2
npm run test:e2e
```

Happy Testing! 🚀
