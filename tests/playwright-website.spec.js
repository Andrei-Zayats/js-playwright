const { test, expect } = require('@playwright/test');

test.describe('Playwright Website', () => {

    test('Home Page have title Playwright', async({ page }) => {

        await page.goto('https://playwright.dev/');
        const title = page.locator('.navbar__inner .navbar__title');
        await expect(title).toHaveText('Playwright');

        expect(await page.screenshot()).toMatchSnapshot('home.png');
    });

    test('Home Page have link to Get Started Page', async({ page }) => {
        await page.goto('https://playwright.dev/');

        await expect(page.locator('text=Get Started').first()).toHaveAttribute('href', '/docs/intro');

        await page.click('text=Get Started');

        await expect(page.locator('text=System requirements').first()).toBeVisible();
    });

    test.skip('Get Started Page Snapshot', async({ page }) => {
        await page.goto('https://playwright.dev/docs/intro');
        await expect(page.locator('text=System requirements').first()).toBeVisible();

        expect(await page.screenshot()).toMatchSnapshot('get-started.png');
    });
})