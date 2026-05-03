const { test, expect } = require('@playwright/test');

test('Расчет стоимости билета через UI', async ({ page }) => {
    await page.goto('/');

    await page.fill('#passport', 'AB123456');
    await page.fill('#basePrice', '200');
    await page.fill('#baggageWeight', '20');
    await page.selectOption('#serviceClass', 'economy');

    await page.click('text=Рассчитать');

    await expect(page.locator('#result')).toContainText('180');
});