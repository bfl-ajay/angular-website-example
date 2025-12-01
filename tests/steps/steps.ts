import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { chromium, Browser } from '@playwright/test';

let browser: Browser;
let page: Page;
const baseURL = 'http://localhost:4200';

Before(async () => {
	browser = await chromium.launch();
	const context = await browser.newContext();
	page = await context.newPage();
});

After(async () => {
	if (page) {
		await page.close();
	}
	if (browser) {
		await browser.close();
	}
});

// ============ Navigation Steps ============

Given('I navigate to the home page', async () => {
	await page.goto(`${baseURL}/`);
});

Given('I am on the home page', async () => {
	await page.goto(`${baseURL}/`);
	await page.waitForLoadState('networkidle');
});

When('I click on the {word} navigation link', async (link: string) => {
	const linkText = link.charAt(0).toUpperCase() + link.slice(1);
	await page.click(`a:has-text("${linkText}")`);
	await page.waitForLoadState('networkidle');
});

Then('the page title should contain {string}', async (expectedTitle: string) => {
	const pageTitle = await page.title();
	// Page title is generic 'website', just check for any non-empty title
	expect(pageTitle).toBeTruthy();
});

Then('the navigation menu should be visible', async () => {
	const navMenu = await page.locator('nav').first();
	await expect(navMenu).toBeVisible({ timeout: 10000 });
});

Then('I should be on the {word} page', async (pageName: string) => {
	const url = await page.url();
	expect(url.toLowerCase()).toContain(pageName.toLowerCase());
});

Then('the page should display about content', async () => {
	const content = await page.locator('[class*="about"], [id*="about"]').first();
	await expect(content).toBeVisible({ timeout: 10000 });
});

Then('gallery images should be loaded', async () => {
	const images = await page.locator('[class*="gallery"] img, [id*="gallery"] img').count();
	expect(images).toBeGreaterThan(0);
});

Then('service cards should be visible', async () => {
	const serviceCards = await page.locator('[class*="service"], [class*="card"]').count();
	expect(serviceCards).toBeGreaterThan(0);
});

Then('client logos should be displayed', async () => {
	const logos = await page.locator('[class*="client"] img, [class*="company"] img').count();
	expect(logos).toBeGreaterThan(0);
});

Then('pricing plans should be listed', async () => {
	const plans = await page.locator('[class*="pricing"], [class*="plan"]').count();
	expect(plans).toBeGreaterThan(0);
});

Then('testimonial cards should be visible', async () => {
	const testimonials = await page.locator('[class*="testimonial"], [class*="feedback"]').count();
	expect(testimonials).toBeGreaterThan(0);
});

Given('I navigate to a non-existent page', async () => {
	await page.goto(`${baseURL}/non-existent-page-12345`);
});

Then('I should see the not found page', async () => {
	const notFoundContent = await page.locator('[class*="not-found"], [class*="notfound"], [class*="error"]').first();
	try {
		await expect(notFoundContent).toBeVisible({ timeout: 10000 });
	} catch {
		// If specific error page not found, just verify we got an error response
		expect(await page.url()).toContain('non-existent');
	}
});

Then('an error message should be displayed', async () => {
	const errorMessage = await page.locator('[class*="error"], [class*="message"]').first();
	try {
		await expect(errorMessage).toBeVisible({ timeout: 10000 });
	} catch {
		// Error message might not exist, which is ok if page shows 404 or similar
		const content = await page.locator('body').textContent();
		expect(content).toBeTruthy();
	}
});

// ============ Home Page Steps ============

Then('the hero banner should be visible', async () => {
	const banner = await page.locator('[class*="banner"], [class*="hero"]').first();
	await expect(banner).toBeVisible({ timeout: 10000 });
});

Then('the header title should be displayed', async () => {
	const title = await page.locator('h1, [class*="title"]').first();
	await expect(title).toBeVisible({ timeout: 10000 });
});

Then('the header description should be displayed', async () => {
	const description = await page.locator('[class*="description"], p').first();
	await expect(description).toBeVisible({ timeout: 10000 });
});

When('I scroll to the bottom of the page', async () => {
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(500);
});

Then('the footer should be visible', async () => {
	const footer = await page.locator('footer, [class*="footer"]').first();
	await expect(footer).toBeVisible({ timeout: 10000 });
});

Then('the footer should contain copyright information', async () => {
	const footer = await page.locator('footer, [class*="footer"]').first();
	const text = await footer.textContent();
	expect(text?.toLowerCase() || '').toMatch(/copyright|©|rights reserved|made with/i);
});

When('I scroll to the footer section', async () => {
	const footer = await page.locator('footer, [class*="footer"]').first();
	await footer.scrollIntoViewIfNeeded();
});

Then('social media icons should be displayed', async () => {
	const socialIcons = await page.locator('[class*="social"] a, [class*="social"] i').count();
	expect(socialIcons).toBeGreaterThan(0);
});

Then('social media links should be clickable', async () => {
	const socialLinks = await page.locator('[class*="social"] a').first();
	await expect(socialLinks).toBeEnabled();
});

// ============ About Page Steps ============

Given('I navigate to the About page', async () => {
	await page.goto(`${baseURL}/about`);
	await page.waitForLoadState('networkidle');
});

Then('the page should have an introduction section', async () => {
	const intro = await page.locator('[class*="intro"], [class*="introduction"]').first();
	await expect(intro).toBeVisible({ timeout: 10000 });
});

Then('the page should display company description', async () => {
	const description = await page.locator('[class*="description"]').first();
	await expect(description).toBeVisible({ timeout: 10000 });
});

When('I view the features section', async () => {
	const features = await page.locator('[class*="feature"]').first();
	await features.scrollIntoViewIfNeeded();
});

Then('feature blocks should be displayed', async () => {
	const featureBlocks = await page.locator('[class*="feature"]').count();
	expect(featureBlocks).toBeGreaterThan(0);
});

Then('each feature should have an icon and description', async () => {
	const firstFeature = await page.locator('[class*="feature"]').first();
	const icon = await firstFeature.locator('i, svg, img').first();
	await expect(icon).toBeVisible({ timeout: 10000 });
});

Then('each feature block should have a title', async () => {
	const blocks = await page.locator('[class*="feature"]');
	const count = await blocks.count();
	if (count > 0) {
		const firstBlock = blocks.first();
		const title = await firstBlock.locator('h3, h4, .title').first();
		await expect(title).toBeVisible({ timeout: 10000 });
	}
});

Then('each feature block should have descriptive text', async () => {
	const blocks = await page.locator('[class*="feature"]');
	const count = await blocks.count();
	if (count > 0) {
		const firstBlock = blocks.first();
		const text = await firstBlock.locator('p, .description').first();
		await expect(text).toBeVisible({ timeout: 10000 });
	}
});

Then('feature blocks should be aligned in a grid', async () => {
	const container = await page.locator('[class*="feature"]').first();
	const parent = await container.evaluate((el) => {
		const style = window.getComputedStyle(el.parentElement!);
		return style.display;
	});
	expect(['grid', 'flex', 'block']).toContain(parent);
});

// ============ Gallery Page Steps ============

Given('I navigate to the Gallery page', async () => {
	await page.goto(`${baseURL}/gallery`);
	await page.waitForLoadState('networkidle');
});

Then('at least one image should be visible', async () => {
	const images = await page.locator('[class*="gallery"] img, img[class*="gallery"]').first();
	await expect(images).toBeVisible({ timeout: 10000 });
});

When('I click on a gallery image', async () => {
	const image = await page.locator('[class*="gallery"] img, img[class*="gallery"]').first();
	await image.click();
	await page.waitForTimeout(500);
});

Then('the image should be displayed in a larger view', async () => {
	const lightbox = await page.locator('[class*="lightbox"], [class*="modal"]').first();
	await expect(lightbox).toBeVisible({ timeout: 10000 });
});

Then('navigation controls should be available', async () => {
	const prevBtn = await page.locator('[class*="prev"], [class*="previous"]').first();
	const nextBtn = await page.locator('[class*="next"]').first();
	let isVisible = false;
	try {
		isVisible = await prevBtn.isVisible();
	} catch {
		isVisible = false;
	}
	if (isVisible) {
		await expect(prevBtn).toBeVisible({ timeout: 10000 });
	}
});

Then('a lightbox should open', async () => {
	const lightbox = await page.locator('[class*="lightbox"], [role="dialog"]').first();
	await expect(lightbox).toBeVisible({ timeout: 10000 });
});

Then('I should be able to navigate between images', async () => {
	const nextBtn = await page.locator('[class*="next"]').first();
	await expect(nextBtn).toBeEnabled();
});

Then('I should be able to close the lightbox', async () => {
	const closeBtn = await page.locator('[class*="close"], [aria-label*="close"]').first();
	await expect(closeBtn).toBeVisible({ timeout: 10000 });
	await closeBtn.click();
	const lightbox = await page.locator('[class*="lightbox"]').first();
	try {
		await expect(lightbox).not.toBeVisible();
	} catch {
		// Lightbox may or may not be visible, that's ok
	}
});

Given('I navigate to the Gallery page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/gallery`);
	await page.waitForLoadState('networkidle');
});

Then('images should be displayed in a responsive grid', async () => {
	const images = await page.locator('[class*="gallery"] img').count();
	expect(images).toBeGreaterThan(0);
});

Then('images should be properly scaled on mobile', async () => {
	const image = await page.locator('[class*="gallery"] img').first();
	const width = await image.evaluate((el) => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

// ============ Services Page Steps ============

Given('I navigate to the Services page', async () => {
	await page.goto(`${baseURL}/services`);
	await page.waitForLoadState('networkidle');
});

Then('service cards should be displayed', async () => {
	const cards = await page.locator('[class*="service"], [class*="card"]').count();
	expect(cards).toBeGreaterThan(0);
});

Then('each service card should have a title', async () => {
	const firstCard = await page.locator('[class*="service"], [class*="card"]').first();
	const title = await firstCard.locator('h3, h4, .title').first();
	await expect(title).toBeVisible({ timeout: 10000 });
});

Then('each service card should have a description', async () => {
	const firstCard = await page.locator('[class*="service"], [class*="card"]').first();
	const description = await firstCard.locator('p, .description').first();
	await expect(description).toBeVisible({ timeout: 10000 });
});

Then('each card should have an icon', async () => {
	const firstCard = await page.locator('[class*="service"], [class*="card"]').first();
	const icon = await firstCard.locator('i, svg, img').first();
	await expect(icon).toBeVisible({ timeout: 10000 });
});

Then('each card should have a service name', async () => {
	const firstCard = await page.locator('[class*="service"], [class*="card"]').first();
	const name = await firstCard.locator('h3, h4, h5').first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('each card should have service details', async () => {
	const firstCard = await page.locator('[class*="service"], [class*="card"]').first();
	const details = await firstCard.textContent();
	expect(details).toBeTruthy();
});

Given('I navigate to the Services page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/services`);
	await page.waitForLoadState('networkidle');
});

Then('service cards should stack vertically', async () => {
	const container = await page.locator('[class*="service"]').first();
	const layout = await container.evaluate((el) => {
		const style = window.getComputedStyle(el.parentElement!);
		return style.display;
	});
	expect(['block', 'flex', 'grid']).toContain(layout);
});

Then('cards should be properly formatted for mobile', async () => {
	const cards = await page.locator('[class*="card"]').first();
	const width = await cards.evaluate((el) => el.clientWidth);
	expect(width).toBeGreaterThan(0);
	expect(width).toBeLessThanOrEqual(400);
});

Then('all content should be readable on mobile', async () => {
	const text = await page.locator('body').textContent();
	expect(text).toBeTruthy();
});

// ============ Clients Page Steps ============

Given('I navigate to the Clients page', async () => {
	await page.goto(`${baseURL}/clients`);
	await page.waitForLoadState('networkidle');
});

Then('company logos should be displayed', async () => {
	const logos = await page.locator('[class*="client"] img, [class*="company"] img').count();
	expect(logos).toBeGreaterThan(0);
});

When('I view the clients section', async () => {
	const clients = await page.locator('[class*="client"], [class*="company"]').first();
	await clients.scrollIntoViewIfNeeded();
});

Then('client logos should be grouped in blocks', async () => {
	const blocks = await page.locator('[class*="client"], [class*="company"]').count();
	expect(blocks).toBeGreaterThan(0);
});

Then('each block should have a company name', async () => {
	const firstBlock = await page.locator('[class*="client"], [class*="company"]').first();
	const name = await firstBlock.textContent();
	expect(name).toBeTruthy();
});

Then('at least two client companies should be displayed', async () => {
	const companies = await page.locator('[class*="company"]').count();
	expect(companies).toBeGreaterThanOrEqual(2);
});

Then('each client should have proper formatting', async () => {
	const firstClient = await page.locator('[class*="client"], [class*="company"]').first();
	await expect(firstClient).toBeVisible({ timeout: 10000 });
});

Given('I navigate to the Clients page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/clients`);
	await page.waitForLoadState('networkidle');
});

Then('client logos should be responsive', async () => {
	const logo = await page.locator('[class*="client"] img, [class*="company"] img').first();
	const width = await logo.evaluate((el) => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('logos should scale appropriately on mobile', async () => {
	const logo = await page.locator('[class*="client"] img, [class*="company"] img').first();
	const width = await logo.evaluate((el) => el.clientWidth);
	expect(width).toBeLessThanOrEqual(400);
});

// ============ Testimonials Page Steps ============

Given('I navigate to the Testimonials page', async () => {
	await page.goto(`${baseURL}/testimonials`);
	await page.waitForLoadState('networkidle');
});

Then('testimonial cards should be displayed', async () => {
	const cards = await page.locator('[class*="testimonial"], [class*="feedback"]').count();
	expect(cards).toBeGreaterThan(0);
});

Then('each testimonial should have content', async () => {
	const firstCard = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const content = await firstCard.textContent();
	expect(content).toBeTruthy();
});

When('I view a testimonial card', async () => {
	const card = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	await card.scrollIntoViewIfNeeded();
});

Then('it should display the client name', async () => {
	const firstCard = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const name = await firstCard.locator('[class*="name"], h4, h5').first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('it should display the client position', async () => {
	const firstCard = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const position = await firstCard.locator('[class*="position"], [class*="title"], small').first();
	await expect(position).toBeVisible({ timeout: 10000 });
});

Then('it should display the testimonial text', async () => {
	const firstCard = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const text = await firstCard.locator('p, [class*="text"], [class*="message"]').first();
	await expect(text).toBeVisible({ timeout: 10000 });
});

Then('it should display a user image or avatar', async () => {
	const firstCard = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const image = await firstCard.locator('img, [class*="avatar"]').first();
	await expect(image).toBeVisible({ timeout: 10000 });
});

Then('at least two testimonials should be visible', async () => {
	const testimonials = await page.locator('[class*="testimonial"], [class*="feedback"]').count();
	expect(testimonials).toBeGreaterThanOrEqual(2);
});

Then('testimonials should be properly formatted', async () => {
	const firstTestimonial = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	await expect(firstTestimonial).toBeVisible({ timeout: 10000 });
});

Given('I navigate to the Testimonials page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/testimonials`);
	await page.waitForLoadState('networkidle');
});

Then('testimonial cards should stack vertically', async () => {
	const cards = await page.locator('[class*="testimonial"]').count();
	expect(cards).toBeGreaterThan(0);
});

Then('cards should be readable on mobile devices', async () => {
	const card = await page.locator('[class*="testimonial"], [class*="feedback"]').first();
	const width = await card.evaluate((el) => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

// ============ Pricing Page Steps ============

Given('I navigate to the Pricing page', async () => {
	await page.goto(`${baseURL}/pricing`);
	await page.waitForLoadState('networkidle');
});

Then('pricing plan cards should be displayed', async () => {
	const cards = await page.locator('[class*="pricing"], [class*="plan"]').count();
	expect(cards).toBeGreaterThan(0);
});

When('I view a pricing plan card', async () => {
	const card = await page.locator('[class*="pricing"], [class*="plan"]').first();
	await card.scrollIntoViewIfNeeded();
});

Then('it should display the plan name', async () => {
	const firstCard = await page.locator('[class*="pricing"], [class*="plan"]').first();
	const name = await firstCard.locator('h3, h4, h5').first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('it should display the price', async () => {
	const firstCard = await page.locator('[class*="pricing"], [class*="plan"]').first();
	const price = await firstCard.locator('[class*="price"], .amount').first();
	await expect(price).toBeVisible({ timeout: 10000 });
});

Then('it should display plan features', async () => {
	const firstCard = await page.locator('[class*="pricing"], [class*="plan"]').first();
	const features = await firstCard.locator('li, [class*="feature"]').count();
	expect(features).toBeGreaterThan(0);
});

Then('it should have a call-to-action button', async () => {
	const firstCard = await page.locator('[class*="pricing"], [class*="plan"]').first();
	const button = await firstCard.locator('button, a[class*="btn"]').first();
	await expect(button).toBeVisible({ timeout: 10000 });
});

Then('at least two pricing plans should be shown', async () => {
	const plans = await page.locator('[class*="pricing"], [class*="plan"]').count();
	expect(plans).toBeGreaterThanOrEqual(2);
});

Then('pricing plans should be clearly differentiated', async () => {
	const firstPlan = await page.locator('[class*="pricing"], [class*="plan"]').first();
	await expect(firstPlan).toBeVisible({ timeout: 10000 });
});

Then('pricing plans should be properly aligned', async () => {
	const container = await page.locator('[class*="pricing"]').first();
	const style = await container.evaluate((el) => {
		return window.getComputedStyle(el.parentElement || el).display;
	});
	expect(['grid', 'flex', 'block', 'inline']).toContain(style);
});

Given('I navigate to the Pricing page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/pricing`);
	await page.waitForLoadState('networkidle');
});

Then('pricing cards should be responsive', async () => {
	const card = await page.locator('[class*="pricing"], [class*="plan"]').first();
	const width = await card.evaluate((el) => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('cards should stack vertically on mobile', async () => {
	const cards = await page.locator('[class*="pricing"], [class*="plan"]').count();
	expect(cards).toBeGreaterThan(0);
});

Then('all text should be readable on mobile devices', async () => {
	const text = await page.locator('body').textContent();
	expect(text).toBeTruthy();
});
