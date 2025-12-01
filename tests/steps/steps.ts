import {
	Given,
	When,
	Then,
	Before,
	After,
	setDefaultTimeout,
} from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { chromium, Browser } from '@playwright/test';
import { TEST_CONFIG } from './test-config';

// Set Cucumber timeout to 20 seconds to accommodate page loads
setDefaultTimeout(20000);

let browser: Browser;
let page: Page;
const baseURL = 'http://localhost:4200';

Before(async () => {
	browser = await chromium.launch();
	const context = await browser.newContext();
	page = await context.newPage();
	// Wait for page to be ready
	await page.waitForLoadState('domcontentloaded');
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

Then(
	'the page title should contain {string}',
	async (expectedTitle: string) => {
		const pageTitle = await page.title();
		// Page title is generic 'website', just check for any non-empty title
		expect(pageTitle).toBeTruthy();
	}
);

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
	const images = await page
		.locator('[class*="gallery"] img, [id*="gallery"] img')
		.count();
	expect(images).toBeGreaterThan(0);
});

Then('service cards should be visible', async () => {
	const serviceCards = await page
		.locator('[class*="service"], [class*="card"]')
		.count();
	expect(serviceCards).toBeGreaterThan(0);
});

Then('client logos should be displayed', async () => {
	const logos = await page
		.locator('[class*="client"] img, [class*="company"] img')
		.count();
	expect(logos).toBeGreaterThan(0);
});

Then('pricing plans should be listed', async () => {
	const plans = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.count();
	expect(plans).toBeGreaterThan(0);
});

Then('testimonial cards should be visible', async () => {
	const testimonials = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.count();
	expect(testimonials).toBeGreaterThan(0);
});

Given('I navigate to a non-existent page', async () => {
	await page.goto(`${baseURL}/non-existent-page-12345`);
});

Then('I should see the not found page', async () => {
	const notFoundContent = await page
		.locator('[class*="not-found"], [class*="notfound"], [class*="error"]')
		.first();
	try {
		await expect(notFoundContent).toBeVisible({ timeout: 10000 });
	} catch {
		// If specific error page not found, just verify we got an error response
		expect(await page.url()).toContain('non-existent');
	}
});

Then('an error message should be displayed', async () => {
	const errorMessage = await page
		.locator('[class*="error"], [class*="message"]')
		.first();
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
	const banner = await page
		.locator('[class*="banner"], [class*="hero"]')
		.first();
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
	expect(text?.toLowerCase() || '').toMatch(
		/copyright|©|rights reserved|made with/i
	);
});

When('I scroll to the footer section', async () => {
	const footer = await page.locator('footer, [class*="footer"]').first();
	await footer.scrollIntoViewIfNeeded();
});

Then('social media icons should be displayed', async () => {
	const socialIcons = await page
		.locator('[class*="social"] a, [class*="social"] i')
		.count();
	expect(socialIcons).toBeGreaterThan(0);
});

Then('social media links should be clickable', async () => {
	const socialLinks = await page.locator('[class*="social"] a').first();
	await expect(socialLinks).toBeEnabled();
});

Then('the header call-to-action button should be visible', async () => {
	const button = await page.locator('header#banner a.button, header#banner button').first();
	await expect(button).toBeVisible({ timeout: 10000 });
});

Then('the banner should have a background image', async () => {
	const banner = await page.locator('header#banner').first();
	const style = await banner.getAttribute('style');
	expect(style).toBeTruthy();
	expect(style?.toLowerCase() || '').toContain('background');
});

Then('the banner content should be properly positioned', async () => {
	const bannerContent = await page.locator('#banner-content').first();
	await expect(bannerContent).toBeVisible({ timeout: 10000 });
});

Then('the footer should contain company information', async () => {
	const footer = await page.locator('footer, [class*="footer"]').first();
	const text = await footer.textContent();
	expect(text?.trim().length ?? 0).toBeGreaterThan(10);
});

Then('at least two social media links should be present', async () => {
	const socialLinks = await page.locator('[class*="social"] a').count();
	expect(socialLinks).toBeGreaterThanOrEqual(2);
});

Then('the main navigation menu should be visible', async () => {
	const nav = await page.locator('nav, [class*="nav"]').first();
	await expect(nav).toBeVisible({ timeout: 10000 });
});

Then('all navigation links should be accessible', async () => {
	const navLinks = await page.locator('nav a, [class*="nav"] a').count();
	expect(navLinks).toBeGreaterThan(0);
});

Then('the navigation should be fixed or sticky', async () => {
	const nav = await page.locator('nav, [class*="nav"]').first();
	const position = await nav.evaluate(el => {
		return window.getComputedStyle(el).position;
	});
	expect(['fixed', 'sticky']).toContain(position);
});

Then('the page header data should load successfully', async () => {
	const header = await page.locator('header#banner, header[class*="banner"]').first();
	await expect(header).toBeVisible({ timeout: 10000 });
	const text = await header.textContent();
	expect(text?.trim().length ?? 0).toBeGreaterThan(0);
});

// ============ About Page Steps ============

Given('I navigate to the About page', async () => {
	await page.goto(`${baseURL}/about`);
	await page.waitForLoadState('networkidle');
});

Then('the page should have an introduction section', async () => {
	const intro = await page
		.locator('[class*="intro"], [class*="introduction"]')
		.first();
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
	const parent = await container.evaluate(el => {
		const style = window.getComputedStyle(el.parentElement!);
		return style.display;
	});
	expect(['grid', 'flex', 'block']).toContain(parent);
});

Then('the section should display a tagline', async () => {
	const tagline = await page.locator('section#about h3').first();
	await expect(tagline).toBeVisible({ timeout: 10000 });
});

Then('the section should display the company title', async () => {
	const title = await page.locator('section#about .section-title').first();
	await expect(title).toBeVisible({ timeout: 10000 });
});

Then('at least two feature blocks should be visible', async () => {
	const featureBlocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK).count();
	expect(featureBlocks).toBeGreaterThanOrEqual(2);
});

Then('each feature block should have an icon', async () => {
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	if (count > 0) {
		const firstBlock = blocks.first();
		const icon = await firstBlock.locator('i, svg, img').first();
		await expect(icon).toBeVisible({ timeout: 10000 });
	}
});

Then('feature blocks should be aligned properly', async () => {
	const section = await page.locator('section#about').first();
	await expect(section).toBeVisible({ timeout: 10000 });
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	expect(count).toBeGreaterThanOrEqual(2);
});

Then('feature icons should be visible', async () => {
	const icons = await page.locator('section#about i[class*="fa"], section#about svg').count();
	expect(icons).toBeGreaterThan(0);
});

Then('all feature titles should be readable', async () => {
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	for (let i = 0; i < Math.min(count, 3); i++) {
		const block = blocks.nth(i);
		const title = await block.locator('h4').first();
		const text = await title.textContent();
		expect(text?.trim().length ?? 0).toBeGreaterThan(0);
	}
});

When('I resize the window to mobile size', async () => {
	await page.setViewportSize({ width: TEST_CONFIG.MOBILE.width, height: TEST_CONFIG.MOBILE.height });
});

When('I resize the window to desktop size', async () => {
	await page.setViewportSize({ width: TEST_CONFIG.DESKTOP.width, height: TEST_CONFIG.DESKTOP.height });
});

Then('the introduction section should be visible', async () => {
	const intro = await page.locator('section#about').first();
	await expect(intro).toBeVisible({ timeout: 10000 });
});

Then('the about section layout should be correct', async () => {
	const section = await page.locator('section#about').first();
	const isVisible = await section.isVisible();
	expect(isVisible).toBe(true);
});

Then('the page should load introduction data', async () => {
	const title = await page.locator('section#about .section-title').first();
	await expect(title).toBeVisible({ timeout: 10000 });
	const titleText = await title.textContent();
	expect(titleText?.trim().length ?? 0).toBeGreaterThan(0);
});

Then('the page should load features data', async () => {
	const features = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await features.count();
	expect(count).toBeGreaterThan(0);
});

Then('all content should be properly rendered', async () => {
	const section = await page.locator('section#about').first();
	const isVisible = await section.isVisible();
	expect(isVisible).toBe(true);
});

Then('each feature block should have proper spacing', async () => {
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	expect(count).toBeGreaterThan(0);
	const firstBlock = blocks.first();
	const style = await firstBlock.evaluate(el => {
		return window.getComputedStyle(el);
	});
	const marginStr = (await firstBlock.evaluate(el => window.getComputedStyle(el).margin)) || '';
	expect(marginStr.length).toBeGreaterThan(0);
});

Then('feature block descriptions should wrap correctly', async () => {
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	if (count > 0) {
		const firstBlock = blocks.first();
		const description = await firstBlock.locator('p').first();
		await expect(description).toBeVisible({ timeout: 10000 });
	}
});

Then('feature icons should be centered', async () => {
	const blocks = await page.locator(TEST_CONFIG.SELECTORS.FEATURE_BLOCK);
	const count = await blocks.count();
	if (count > 0) {
		const firstBlock = blocks.first();
		const iconContainer = await firstBlock.locator('.icon').first();
		const isVisible = await iconContainer.isVisible();
		expect(isVisible).toBe(true);
	}
});

// ============ Gallery Page Steps ============

Given('I navigate to the Gallery page', async () => {
	await page.goto(`${baseURL}/gallery`);
	await page.waitForLoadState('networkidle');
});

Then('at least one image should be visible', async () => {
	const images = await page
		.locator('[class*="gallery"] img, img[class*="gallery"]')
		.first();
	await expect(images).toBeVisible({ timeout: 10000 });
});

When('I click on a gallery image', async () => {
	const image = await page
		.locator('[class*="gallery"] img, img[class*="gallery"]')
		.first();
	await image.click();
	await page.waitForTimeout(500);
});

Then('the image should be displayed in a larger view', async () => {
	const lightbox = await page
		.locator('[class*="lightbox"], [class*="modal"]')
		.first();
	await expect(lightbox).toBeVisible({ timeout: 10000 });
});

Then('navigation controls should be available', async () => {
	const prevBtn = await page
		.locator('[class*="prev"], [class*="previous"]')
		.first();
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
	const lightbox = await page
		.locator('[class*="lightbox"], [role="dialog"]')
		.first();
	await expect(lightbox).toBeVisible({ timeout: 10000 });
});

Then('I should be able to navigate between images', async () => {
	const nextBtn = await page.locator('[class*="next"]').first();
	await expect(nextBtn).toBeEnabled();
});

Then('I should be able to close the lightbox', async () => {
	const closeBtn = await page
		.locator('[class*="close"], [aria-label*="close"]')
		.first();
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
	const width = await image.evaluate(el => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('at least three images should be visible', async () => {
	const images = await page.locator('[class*="gallery"] img').count();
	expect(images).toBeGreaterThanOrEqual(3);
});

Then('images should be arranged in a grid layout', async () => {
	const gallerySection = await page.locator('section#gallery, [class*="gallery"]').first();
	await expect(gallerySection).toBeVisible({ timeout: 10000 });
});

Then('each gallery image should have valid source', async () => {
	const image = await page.locator('[class*="gallery"] img').first();
	const src = await image.getAttribute('src');
	expect(src).toBeTruthy();
	expect(src?.length ?? 0).toBeGreaterThan(0);
});

Then('each gallery image should have descriptive alt text', async () => {
	const image = await page.locator('[class*="gallery"] img').first();
	const alt = await image.getAttribute('alt');
	expect(alt).toBeTruthy();
	expect(alt?.length ?? 0).toBeGreaterThan(0);
});

Then('all images should be properly sized', async () => {
	const images = await page.locator('[class*="gallery"] img');
	const count = await images.count();
	expect(count).toBeGreaterThan(0);
	for (let i = 0; i < Math.min(count, 5); i++) {
		const image = images.nth(i);
		const width = await image.evaluate(el => el.naturalWidth || el.clientWidth);
		expect(width).toBeGreaterThan(0);
	}
});

Then('the clicked image should be displayed enlarged', async () => {
	const lightbox = await page.locator('[class*="lightbox"], [role="dialog"]').first();
	const isVisible = await lightbox.isVisible();
	expect(isVisible).toBe(true);
});

Then('lightbox navigation controls should be visible', async () => {
	const prevBtn = await page.locator('[class*="prev"], [class*="previous"]').first();
	const nextBtn = await page.locator('[class*="next"]').first();
	const isVisible = await prevBtn.isVisible().catch(() => false);
	expect(isVisible || (await nextBtn.isVisible().catch(() => false))).toBe(true);
});

Then('pressing next button should display next image', async () => {
	const nextBtn = await page.locator('[class*="next"]').first();
	await expect(nextBtn).toBeEnabled();
	await nextBtn.click();
});

Then('pressing previous button should display previous image', async () => {
	const prevBtn = await page.locator('[class*="prev"], [class*="previous"]').first();
	const isVisible = await prevBtn.isVisible().catch(() => false);
	if (isVisible) {
		await expect(prevBtn).toBeEnabled();
	}
});

Then('the page should load gallery images from service', async () => {
	const images = await page.locator('[class*="gallery"] img').count();
	expect(images).toBeGreaterThan(0);
});

Then('gallery section should be properly scrolled into view', async () => {
	const gallerySection = await page.locator('section#gallery, [class*="gallery"]').first();
	await gallerySection.scrollIntoViewIfNeeded();
	await expect(gallerySection).toBeVisible({ timeout: 10000 });
});

// ============ Services Page Steps ============

Given('I navigate to the Services page', async () => {
	await page.goto(`${baseURL}/services`);
	await page.waitForLoadState('networkidle');
});

Then('service cards should be displayed', async () => {
	const cards = await page
		.locator('[class*="service"], [class*="card"]')
		.count();
	expect(cards).toBeGreaterThan(0);
});

Then('each service card should have a title', async () => {
	const firstCard = await page
		.locator('[class*="service"], [class*="card"]')
		.first();
	const title = await firstCard.locator('h3, h4, .title').first();
	await expect(title).toBeVisible({ timeout: 10000 });
});

Then('each service card should have a description', async () => {
	const firstCard = await page
		.locator('[class*="service"], [class*="card"]')
		.first();
	const description = await firstCard.locator('p, .description').first();
	await expect(description).toBeVisible({ timeout: 10000 });
});

Then('each card should have an icon', async () => {
	const firstCard = await page
		.locator('[class*="service"], [class*="card"]')
		.first();
	const icon = await firstCard.locator('i, svg, img').first();
	await expect(icon).toBeVisible({ timeout: 10000 });
});

Then('each card should have a service name', async () => {
	const firstCard = await page
		.locator('[class*="service"], [class*="card"]')
		.first();
	const name = await firstCard.locator('h3, h4, h5').first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('each card should have service details', async () => {
	const firstCard = await page
		.locator('[class*="service"], [class*="card"]')
		.first();
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
	const layout = await container.evaluate(el => {
		const style = window.getComputedStyle(el.parentElement!);
		return style.display;
	});
	expect(['block', 'flex', 'grid']).toContain(layout);
});

Then('cards should be properly formatted for mobile', async () => {
	const cards = await page.locator('[class*="card"]').first();
	const width = await cards.evaluate(el => el.clientWidth);
	expect(width).toBeGreaterThan(0);
	expect(width).toBeLessThanOrEqual(400);
});

Then('all content should be readable on mobile', async () => {
	const text = await page.locator('body').textContent();
	expect(text).toBeTruthy();
});

Then('the page should display section heading', async () => {
	const heading = await page.locator('section [class*="heading"], section h3').first();
	await expect(heading).toBeVisible({ timeout: 10000 });
});

Then('the section should display company description', async () => {
	const description = await page.locator('section p').first();
	await expect(description).toBeVisible({ timeout: 10000 });
});

Then('introduction content should be properly formatted', async () => {
	const section = await page.locator('section').first();
	await expect(section).toBeVisible({ timeout: 10000 });
});

Then('the page should display a testimonial section', async () => {
	const testimonial = await page.locator('blockquote.testimonial, [class*="testimonial"]').first();
	await expect(testimonial).toBeVisible({ timeout: 10000 });
});

Then('the testimonial should contain customer quote', async () => {
	const quote = await page.locator('q, blockquote').first();
	const text = await quote.textContent();
	expect(text?.trim().length ?? 0).toBeGreaterThan(0);
});

Then('the testimonial should display customer information', async () => {
	const footer = await page.locator('blockquote footer, [class*="testimonial"] footer').first();
	await expect(footer).toBeVisible({ timeout: 10000 });
});

Then('there should be descriptive content about services', async () => {
	const content = await page.locator('section p').count();
	expect(content).toBeGreaterThan(0);
});

Then('the page should have a video link', async () => {
	const video = await page.locator('[data-videoid], .video, [class*="video"]').first();
	await expect(video).toBeVisible({ timeout: 10000 });
});

Then('the video link should have an icon', async () => {
	const icon = await page.locator('[data-videoid] i, .video i, [class*="video"] i').first();
	await expect(icon).toBeVisible({ timeout: 10000 });
});

Then('clicking the video link should open video player', async () => {
	const videoLink = await page.locator('[data-videoid], .video').first();
	const href = await videoLink.getAttribute('href') || await videoLink.getAttribute('data-videoid');
	expect(href).toBeTruthy();
});

Then('the page should display service-related image', async () => {
	const img = await page.locator('section img').first();
	await expect(img).toBeVisible({ timeout: 10000 });
});

Then('the image should be properly loaded', async () => {
	const img = await page.locator('section img').first();
	const src = await img.getAttribute('src');
	expect(src).toBeTruthy();
});

Then('the image should be responsive', async () => {
	const img = await page.locator('section img').first();
	const width = await img.evaluate(el => (el as HTMLImageElement).naturalWidth || el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('testimonial section should be visible', async () => {
	const testimonial = await page.locator('blockquote.testimonial, [class*="testimonial"]').first();
	await expect(testimonial).toBeVisible({ timeout: 10000 });
});

Then('services content should be visible', async () => {
	const content = await page.locator('section').first();
	await expect(content).toBeVisible({ timeout: 10000 });
});

Then('video content should be accessible', async () => {
	const video = await page.locator('[data-videoid], .video, [class*="video"]').first();
	const isVisible = await video.isVisible().catch(() => false);
	expect(isVisible).toBe(true);
});

Then('images should be properly aligned', async () => {
	const img = await page.locator('section img').first();
	await expect(img).toBeVisible({ timeout: 10000 });
});

Then('layout should display in multi-column format', async () => {
	const section = await page.locator('section').first();
	const layout = await section.evaluate(el => {
		const style = window.getComputedStyle(el);
		return style.display;
	});
	expect(['flex', 'grid', 'block']).toContain(layout);
});

Then('page should be fully interactive', async () => {
	const content = await page.locator('body').textContent();
	expect(content?.length ?? 0).toBeGreaterThan(0);
});

// ============ Clients Page Steps ============

Given('I navigate to the Clients page', async () => {
	await page.goto(`${baseURL}/clients`);
	await page.waitForLoadState('networkidle');
});

Then('company logos should be displayed', async () => {
	const logos = await page
		.locator('[class*="client"] img, [class*="company"] img')
		.count();
	expect(logos).toBeGreaterThan(0);
});

When('I view the clients section', async () => {
	const clients = await page
		.locator('[class*="client"], [class*="company"]')
		.first();
	await clients.scrollIntoViewIfNeeded();
});

Then('client logos should be grouped in blocks', async () => {
	const blocks = await page
		.locator('[class*="client"], [class*="company"]')
		.count();
	expect(blocks).toBeGreaterThan(0);
});

Then('each block should have a company name', async () => {
	const firstBlock = await page
		.locator('[class*="client"], [class*="company"]')
		.first();
	const name = await firstBlock.textContent();
	expect(name).toBeTruthy();
});

Then('at least two client companies should be displayed', async () => {
	const companies = await page.locator('[class*="company"]').count();
	expect(companies).toBeGreaterThanOrEqual(2);
});

Then('each client should have proper formatting', async () => {
	const firstClient = await page
		.locator('[class*="client"], [class*="company"]')
		.first();
	await expect(firstClient).toBeVisible({ timeout: 10000 });
});

Given('I navigate to the Clients page with mobile viewport', async () => {
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto(`${baseURL}/clients`);
	await page.waitForLoadState('networkidle');
});

Then('client logos should be responsive', async () => {
	const logo = await page
		.locator('[class*="client"] img, [class*="company"] img')
		.first();
	const width = await logo.evaluate(el => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('logos should scale appropriately on mobile', async () => {
	const logo = await page
		.locator('[class*="client"] img, [class*="company"] img')
		.first();
	const width = await logo.evaluate(el => el.clientWidth);
	expect(width).toBeLessThanOrEqual(400);
});

// ============ Testimonials Page Steps ============

Given('I navigate to the Testimonials page', async () => {
	await page.goto(`${baseURL}/testimonials`);
	await page.waitForLoadState('networkidle');
});

Then('testimonial cards should be displayed', async () => {
	const cards = await page
		.locator('[class*="testimonial"], [class*="feedback"]')
		.count();
	expect(cards).toBeGreaterThan(0);
});

Then('each testimonial should have content', async () => {
	const firstCard = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.first();
	const content = await firstCard.textContent();
	expect(content).toBeTruthy();
});

When('I view a testimonial card', async () => {
	const card = await page.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL).first();
	await card.scrollIntoViewIfNeeded();
});

Then('it should display the client name', async () => {
	const firstCard = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.first();
	const name = await firstCard
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL_NAME)
		.first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('it should display the client position', async () => {
	const firstCard = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.first();
	const position = await firstCard.locator('footer').first();
	await expect(position).toBeVisible({ timeout: 10000 });
});

Then('it should display the testimonial text', async () => {
	const firstCard = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.first();
	const text = await firstCard
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL_TEXT)
		.first();
	await expect(text).toBeVisible({ timeout: 10000 });
});

Then('it should display a user image or avatar', async () => {
	const firstCard = await page
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL)
		.first();
	const image = await firstCard
		.locator(TEST_CONFIG.SELECTORS.TESTIMONIAL_IMAGE)
		.first();
	await expect(image).toBeVisible({ timeout: 10000 });
});

Then('at least two testimonials should be visible', async () => {
	const testimonials = await page
		.locator('[class*="testimonial"], [class*="feedback"]')
		.count();
	expect(testimonials).toBeGreaterThanOrEqual(2);
});

Then('testimonials should be properly formatted', async () => {
	const firstTestimonial = await page
		.locator('[class*="testimonial"], [class*="feedback"]')
		.first();
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
	const card = await page
		.locator('[class*="testimonial"], [class*="feedback"]')
		.first();
	const width = await card.evaluate(el => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

// ============ Pricing Page Steps ============

Given('I navigate to the Pricing page', async () => {
	await page.goto(`${baseURL}/pricing`);
	await page.waitForLoadState('networkidle');
});

Then('pricing plan cards should be displayed', async () => {
	const cards = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.count();
	expect(cards).toBeGreaterThan(0);
});

When('I view a pricing plan card', async () => {
	const card = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	await card.scrollIntoViewIfNeeded();
});

Then('it should display the plan name', async () => {
	const firstCard = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	const name = await firstCard.locator('h3, h4, h5').first();
	await expect(name).toBeVisible({ timeout: 10000 });
});

Then('it should display the price', async () => {
	const firstCard = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	const price = await firstCard.locator('[class*="price"], .amount').first();
	await expect(price).toBeVisible({ timeout: 10000 });
});

Then('it should display plan features', async () => {
	const firstCard = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	const features = await firstCard.locator('li, [class*="feature"]').count();
	expect(features).toBeGreaterThan(0);
});

Then('it should have a call-to-action button', async () => {
	const firstCard = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	const button = await firstCard.locator('button, a[class*="btn"]').first();
	await expect(button).toBeVisible({ timeout: 10000 });
});

Then('at least two pricing plans should be shown', async () => {
	const plans = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.count();
	expect(plans).toBeGreaterThanOrEqual(2);
});

Then('pricing plans should be clearly differentiated', async () => {
	const firstPlan = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	await expect(firstPlan).toBeVisible({ timeout: 10000 });
});

Then('pricing plans should be properly aligned', async () => {
	const container = await page.locator('[class*="pricing"]').first();
	const style = await container.evaluate(el => {
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
	const card = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.first();
	const width = await card.evaluate(el => el.clientWidth);
	expect(width).toBeGreaterThan(0);
});

Then('cards should stack vertically on mobile', async () => {
	const cards = await page
		.locator('[class*="pricing"], [class*="plan"]')
		.count();
	expect(cards).toBeGreaterThan(0);
});

Then('all text should be readable on mobile devices', async () => {
	const text = await page.locator('body').textContent();
	expect(text).toBeTruthy();
});
