# Quick Start Guide - Playwright & Cucumber Testing

## Installation

```bash
npm i
```

This will install all dependencies including:
- `@playwright/test` - Browser automation
- `@cucumber/cucumber` - BDD framework
- `@types/node` - Node.js types
- `typescript` - TypeScript support

## Running Tests

### 1. Start the Application
```bash
npm start
```
The application will run on `http://localhost:4200`

### 2. Run Tests (in another terminal)

**Run all tests:**
```bash
npm run test:e2e
```

**Run tests with browser visible:**
```bash
npm run test:e2e:headed
```

**Run tests in debug mode:**
```bash
npm run test:e2e:debug
```

**Run specific test file:**
```bash
npx playwright test tests/features/home.feature
```

**Run tests matching pattern:**
```bash
npx playwright test --grep "navigation"
```

**Run in UI mode (interactive):**
```bash
npm run test:e2e:ui
```

## Test Reports

After running tests, view the HTML report:
```bash
npm run test:e2e:report
```

Reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - Screenshots and videos on failure

## Project Structure

```
tests/
├── features/                 # Gherkin BDD scenarios
│   ├── navigation.feature   # Navigation & routing
│   ├── home.feature         # Home page
│   ├── about.feature        # About page
│   ├── gallery.feature      # Gallery with images
│   ├── services.feature     # Services section
│   ├── clients.feature      # Client logos
│   ├── testimonials.feature # Testimonials
│   └── pricing.feature      # Pricing plans
├── steps/
│   ├── steps.ts             # Main step definitions
│   ├── test-utils.ts        # Utility functions
│   ├── test-config.ts       # Configuration & constants
│   └── tsconfig.json        # TypeScript config
├── README.md                # Detailed documentation
└── .gitignore              # Git ignore rules
```

## Key Files

### Playwright Configuration
- **File:** `playwright.config.ts`
- **Includes:** Browser configs, timeouts, reporters, web server setup

### Cucumber Configuration
- **File:** `cucumber.ts`
- **Includes:** Step definitions, report formats, parallel execution

### Step Definitions
- **File:** `tests/steps/steps.ts`
- **Contains:** All Given/When/Then steps for all features

### Test Utilities
- **File:** `tests/steps/test-utils.ts`
- **Provides:** Common helper functions and selectors

### Test Configuration
- **File:** `tests/steps/test-config.ts`
- **Provides:** URLs, timeouts, viewports, helper functions

## Feature Files Overview

### Navigation (`navigation.feature`)
- Test all page navigation links
- Verify proper URL changes
- Test 404 error handling

### Home Page (`home.feature`)
- Hero banner display
- Footer visibility
- Social media links

### About Page (`about.feature`)
- Company information
- Feature blocks and grid layout

### Gallery (`gallery.feature`)
- Image loading
- Lightbox functionality
- Responsive gallery design

### Services (`services.feature`)
- Service card display
- Card content formatting
- Mobile responsiveness

### Clients (`clients.feature`)
- Client logo display
- Logo grouping and blocks
- Responsive layout

### Testimonials (`testimonials.feature`)
- Testimonial card display
- User information visibility
- Mobile-friendly layout

### Pricing (`pricing.feature`)
- Pricing plan cards
- Plan differentiation
- Mobile adaptation

## Example Test Run

```bash
# Terminal 1 - Start app
npm start

# Terminal 2 - Run tests
npm run test:e2e:headed

# Terminal 3 (optional) - View reports
npm run test:e2e:report
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run test:e2e` | Run all tests |
| `npm run test:e2e:headed` | Run with browser visible |
| `npm run test:e2e:debug` | Interactive debug mode |
| `npm run test:e2e:ui` | UI mode with test explorer |
| `npm run test:e2e:report` | View HTML report |
| `npx playwright test --grep "home"` | Run tests matching pattern |
| `npx playwright test --grep "mobile"` | Run mobile-specific tests |

## Debugging

### View specific test execution
```bash
npx playwright test tests/features/home.feature --headed
```

### Debug with inspector
```bash
npx playwright test --debug
```
Opens Playwright Inspector - step through code and see live browser

### Get detailed error info
```bash
npx playwright test --reporter=list
```

### Take screenshots
Screenshots are automatically captured on failure in `test-results/`

## CI/CD Integration

```bash
# Run in CI mode (serial, with retries)
CI=true npm run test:e2e
```

In CI mode:
- Tests run serially (one at a time)
- Automatic retries on failure
- Screenshots captured on failure
- Videos recorded on failure

## Tips & Best Practices

1. **Start simple:** Begin with `home.feature` to ensure setup works
2. **Use selectors wisely:** Generic selectors like `[class*="gallery"]` are more flexible
3. **Wait explicitly:** Use `waitForLoadState('networkidle')` for page loads
4. **Keep tests focused:** Each scenario should test one thing
5. **Use proper assertions:** Playwright's `expect()` provides clear error messages
6. **Check test reports:** Screenshot failures help debug issues quickly

## Troubleshooting

### Tests timeout
- Ensure app is running on `http://localhost:4200`
- Check network connectivity
- Increase timeout in `playwright.config.ts`

### Selector not found
- Verify element exists in browser
- Use browser DevTools to inspect
- Update selector in step definitions
- Use less specific selectors like `[class*="feature"]`

### Flaky tests
- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Increase wait times for animations
- Use more stable selectors
- Avoid fixed timeouts, use element visibility checks

## Getting Help

- [Playwright Docs](https://playwright.dev)
- [Cucumber Docs](https://cucumber.io/docs/cucumber/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
- Check test-results for failure screenshots
- View HTML reports: `npm run test:e2e:report`

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start application: `npm start`
3. ✅ Run tests: `npm run test:e2e`
4. ✅ View report: `npm run test:e2e:report`
5. ✅ Add custom scenarios to feature files
6. ✅ Update step definitions as needed

Happy testing! 🎭
