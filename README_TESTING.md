# 🎭 Playwright & Cucumber BDD E2E Testing Framework

## 📌 Quick Start (3 Commands)

```bash
npm install                    # Install dependencies
npm start                      # Start application (keep running)
npm run test:e2e              # Run all 33 tests (in new terminal)
```

---

## 📚 Documentation Guide

**Choose your starting point:**

1. **🚀 I want to run tests NOW**
   - Read: `TESTING.md` (5 minutes)
   - Commands: `npm install` → `npm start` → `npm run test:e2e`

2. **📊 I want to understand what was generated**
   - Read: `TESTING_VISUAL_SUMMARY.md` (3 minutes)
   - See file structure and statistics

3. **🔧 I want complete setup details**
   - Read: `SETUP_COMPLETE.md` (10 minutes)
   - Comprehensive setup and troubleshooting

4. **✅ I want to verify everything is installed**
   - Read: `TESTING_INSTALLATION_CHECKLIST.md` (5 minutes)
   - Step-by-step verification

5. **📖 I want to explore test files**
   - Read: `tests/README.md` (20 minutes)
   - Detailed guide to feature files and step definitions

6. **💻 I want code examples**
   - Read: `tests/steps/EXAMPLES.ts` (10 minutes)
   - Learn patterns for custom tests

---

## 📁 What's Included

### Configuration Files (Root)
```
playwright.config.ts    # Browser automation setup
cucumber.ts            # BDD configuration
```

### Test Files (tests/)
```
features/              # 8 Gherkin feature files (33 scenarios)
├── navigation.feature # Page routing & navigation
├── home.feature      # Home page content
├── about.feature     # About page content
├── gallery.feature   # Gallery with lightbox
├── services.feature  # Service cards
├── clients.feature   # Client logos
├── testimonials.feature  # Testimonial cards
└── pricing.feature   # Pricing plans

steps/                # Step definitions & utilities
├── steps.ts          # 100+ step definitions
├── test-utils.ts     # Helper functions
├── test-config.ts    # Configuration constants
└── EXAMPLES.ts       # Example patterns
```

---

## 🎯 Available Commands

```bash
npm run test:e2e              # Run all tests
npm run test:e2e:headed       # Run with browser visible
npm run test:e2e:debug        # Interactive debug mode
npm run test:e2e:ui           # UI test explorer
npm run test:e2e:report       # View HTML report
npm run test:all              # Run unit + e2e tests
```

---

## 📊 Test Coverage

| Feature | Scenarios | Coverage |
|---------|-----------|----------|
| Navigation | 8 | All pages, routing, errors |
| Home | 3 | Banner, footer, social |
| About | 3 | Info, features, layout |
| Gallery | 4 | Images, lightbox, responsive |
| Services | 3 | Cards, content, mobile |
| Clients | 4 | Logos, grouping, responsive |
| Testimonials | 4 | Cards, info, responsive |
| Pricing | 4 | Plans, features, responsive |
| **TOTAL** | **33** | **Full site coverage** |

---

## 🌐 Browser Support

✅ **Desktop**: Chromium, Firefox, WebKit
✅ **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
✅ **Viewports**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)

---

## 🔧 Key Technologies

- **Playwright** v1.40.0 - Browser automation
- **Cucumber** v9.5.0 - BDD framework
- **TypeScript** 5.2.2 - Type safety
- **Node.js** 14+ required

---

## 📈 What Gets Tested

✅ Navigation & page routing
✅ Component visibility
✅ Content display
✅ Responsive design (mobile, tablet, desktop)
✅ Images & media loading
✅ Interactive elements (links, buttons, forms)
✅ Page layouts
✅ Social media links
✅ Footer content

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Application
```bash
npm start
# App runs at http://localhost:4200
```

### 3. Run Tests (new terminal)
```bash
npm run test:e2e
```

### 4. View Report
```bash
npm run test:e2e:report
```

---

## 📝 Key Features

✅ **BDD Approach** - Human-readable Gherkin syntax
✅ **33 Test Scenarios** - Comprehensive coverage
✅ **100+ Step Definitions** - Reusable test steps
✅ **Multiple Browsers** - Test across browsers
✅ **Mobile Testing** - Test responsive design
✅ **Error Reporting** - Screenshots & videos on failure
✅ **HTML Reports** - Beautiful test reports
✅ **CI/CD Ready** - Easy integration
✅ **Utility Functions** - Helper methods & selectors
✅ **Documentation** - 6 comprehensive guides

---

## 🛠️ Extending Tests

### Add New Test Scenario

1. Create feature file in `tests/features/`
2. Write Gherkin scenarios
3. Add step definitions to `tests/steps/steps.ts`
4. Run tests: `npm run test:e2e`

**Example Feature File:**
```gherkin
Feature: New Feature
  As a user
  I want to test something
  So that I can verify functionality

  Scenario: Test scenario
    Given I navigate to the home page
    When I click on element
    Then element should be visible
```

### Add New Step Definition

```typescript
When('I click on element', async () => {
  await page.click('selector');
});

Then('element should be visible', async () => {
  const element = page.locator('selector').first();
  await expect(element).toBeVisible();
});
```

---

## 🐛 Debugging

### View Browser During Test
```bash
npm run test:e2e:headed
```

### Interactive Debug Mode
```bash
npm run test:e2e:debug
```

### Run Specific Test
```bash
npx playwright test --grep "navigation"
```

### View Failure Details
```bash
npm run test:e2e:report
```
Opens HTML report with screenshots/videos

---

## 📞 Need Help?

### Quick References
- **Commands**: See section "Available Commands" above
- **Documentation**: See section "Documentation Guide" above
- **Examples**: Review `tests/steps/EXAMPLES.ts`
- **Failures**: Check `test-results/` folder

### External Resources
- [Playwright Documentation](https://playwright.dev)
- [Cucumber Documentation](https://cucumber.io)
- [TypeScript Handbook](https://www.typescriptlang.org)

---

## ✅ Verification Checklist

After installation, verify:

- [ ] `npm install` completed successfully
- [ ] `npm start` runs application on port 4200
- [ ] All test files exist in `tests/` directory
- [ ] `npm run test:e2e` runs without errors
- [ ] 33 tests pass or show in report
- [ ] `npm run test:e2e:report` opens HTML report
- [ ] Screenshots captured for failures (if any)

---

## 📋 File Structure

```
angular-website-example/
├── playwright.config.ts
├── cucumber.ts
├── TESTING.md ← ⭐ Start here for quick reference
├── TESTING_VISUAL_SUMMARY.md
├── SETUP_COMPLETE.md
├── TESTING_INSTALLATION_CHECKLIST.md
├── TESTING_SETUP_SUMMARY.md
├── .env.example
├── package.json (updated)
│
└── tests/
    ├── README.md
    ├── .gitignore
    ├── tsconfig.json
    │
    ├── features/ (8 files, 33 scenarios)
    │   ├── navigation.feature
    │   ├── home.feature
    │   ├── about.feature
    │   ├── gallery.feature
    │   ├── services.feature
    │   ├── clients.feature
    │   ├── testimonials.feature
    │   └── pricing.feature
    │
    └── steps/ (5 files)
        ├── steps.ts
        ├── test-utils.ts
        ├── test-config.ts
        ├── EXAMPLES.ts
        └── tsconfig.json
```

---

## 🎉 Next Steps

1. ✅ Read `TESTING.md` (5 min)
2. ✅ Run `npm install` (2-5 min)
3. ✅ Run `npm start` (30 sec)
4. ✅ Run `npm run test:e2e` (2-5 min)
5. ✅ View report: `npm run test:e2e:report`
6. ✅ Explore feature files in `tests/features/`
7. ✅ Review step definitions in `tests/steps/steps.ts`
8. ✅ Study examples in `tests/steps/EXAMPLES.ts`
9. ✅ Add custom tests for your features
10. ✅ Integrate with your CI/CD pipeline

---

## 💡 Tips

- Use `--headed` to see tests run in browser
- Use `--debug` for interactive step-by-step execution
- Update selectors if your HTML structure changes
- Keep feature files focused on specific functionality
- Review test-results folder for failure details
- Run tests regularly during development

---

## 📞 Support

**Documentation:**
1. `TESTING.md` - Quick reference ⭐
2. `tests/README.md` - Detailed guide
3. `tests/steps/EXAMPLES.ts` - Code patterns

**Official Docs:**
- [Playwright](https://playwright.dev)
- [Cucumber](https://cucumber.io)

---

## 🚀 Ready?

```bash
npm install && npm start
# In another terminal:
npm run test:e2e
```

**Happy Testing! 🎭**

---

*Last Updated: 2024*
*Playwright v1.40.0 | Cucumber v9.5.0 | TypeScript 5.2.2*
