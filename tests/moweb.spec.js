const { test, expect, devices } = require('@playwright/test');


test.describe('Moweb sample test', () => {
test('Login page validate', async({page})=>
{

    await page.goto('https://www.airbnb.co.in/')
    // await page.waitForLoadState('networkidle');
    // await page.locator('[data-testid ="QA_EXPLORE_HEADER"]').isVisible();
    await page.getByTestId('QA_EXPLORE_HEADER').isVisible();
    // const blink =  page.locator('[href* ="documents-request"]')
    // await expect(blink).toHaveAttribute("class", '.blinkingText')

})
})