# Next Steps: Fixing CSS Selectors and Navigation

## Current State
- ✅ 74 passing steps (58.3% pass rate)
- ❌ 20 failing tests (mostly selector mismatches and navigation issues)
- ⏱️ Tests run successfully, no more premature timeouts

## Action Plan

### Step 1: Identify Actual CSS Selectors (5 minutes)

**In your browser, navigate to http://localhost:4200 and inspect:**

#### Home Page (`/`)
- Look for hero/banner section - What class name? (currently looking for `[class*="banner"]`)
- Look for title element - Is it `h1`? Check the actual element
- Look for description - Is it `p`? 

#### Gallery Page (`/gallery`)
- Inspect an image in the gallery - What are its classes? (currently: `[class*="gallery"]`)
- Does it have `img` or `picture` tag?

#### Services Page (`/services`)
- Inspect a service card - What class name? (currently: `[class*="service"]`)
- What structure does it have?

#### Clients/Companies Page (`/clients`)
- Inspect company logos - What class? (currently: `[class*="company"]`)
- Are they `img` tags or `<picture>`?

#### Testimonials Page (`/testimonials`)  
- Inspect a testimonial card - What class? (currently: `[class*="testimonial"]`)
- Where is the name/title element?

### Step 2: Update Selectors in test-config.ts

Once you have the actual selectors, update them:

```typescript
SELECTORS: {
  // Update these based on actual page inspection
  HERO_BANNER: '[actual-class-here]',        // Replace '[class*="banner"]'
  GALLERY_IMAGE: '[actual-gallery-class]',   // Replace '[class*="gallery"] img'
  SERVICE_CARD: '[actual-service-class]',    // Replace '[class*="service"]'
  CLIENT_LOGO: '[actual-client-class]',      // Replace '[class*="client"] img'
  TESTIMONIAL: '[actual-testimonial-class]', // Replace '[class*="testimonial"]'
  // ... etc
},
```

### Step 3: Debug Navigation (5 minutes)

**Test if navigation works:**

In browser console while on home page:
```javascript
// Try to click a navigation link
document.querySelector('a[href*="gallery"]').click();
// Check if URL changed
window.location.href;
```

**If URL didn't change:**
- Navigation might need `waitForNavigation()`
- Check if links use `routerLink` vs `href`
- May need different click strategy in tests

### Step 4: Run Tests with Updated Selectors

```bash
npm run test:cucumber
```

**Expected improvement: 15-20 additional tests passing**

## Quick Reference: Files to Modify

1. **tests/steps/test-config.ts** - Line 28-42
   - Update `SELECTORS` object with real selectors

2. **tests/steps/steps.ts** - May need updates for:
   - Navigation wait strategies (lines 34-40)
   - Element locator calls using outdated selectors

## Debugging Tips

### To see actual page structure:
```bash
# Run your Angular app
npm start

# In another terminal, open browser to http://localhost:4200
# Open DevTools (F12)
# Right-click elements and "Inspect"
# Look for class names and element structure
```

### To test selector matches:
```bash
# In browser console
document.querySelectorAll('[class*="banner"]').length
// If returns 0, selector is wrong

document.querySelectorAll('.your-actual-class').length  
// Try with actual class found in inspection
```

## Success Criteria

After making these changes, run tests again:

```bash
npm run test:cucumber
```

**Target Results:**
- 90+ passing steps (70%+)
- 15+ passing scenarios
- Only 10-15 failures remaining (mostly edge cases)

## If Tests Still Fail After Selector Update

**Common Issues:**

1. **Elements take time to render:**
   - Add `await page.waitForSelector('your-selector', { timeout: 10000 })`
   - Or use `waitForLoadState('networkidle')`

2. **Dynamic content loading:**
   - Elements might be lazy-loaded
   - Need to scroll into view first
   - Use `element.scrollIntoViewIfNeeded()` before checking visibility

3. **Navigation not working:**
   - Might need `await page.waitForNavigation()` after click
   - Check if router module is properly configured

4. **Multiple similar elements:**
   - Your selector might match too many elements
   - Be more specific or use `:first-child`, `:nth-child()`

## Questions to Ask

1. Are the class names consistent across pages?
2. Do elements load immediately or lazily?
3. Do navigation links use Angular routing?
4. Are there any iframes or shadow DOM elements?

---

**Time Estimate:** 15-30 minutes to implement all changes  
**Difficulty:** Low (mostly copy-paste of correct selectors)  
**Impact:** Should fix ~15-20 tests immediately
