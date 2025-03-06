const { test, expect }  =  require("@playwright/test");
const { count } = require("console");
const exp = require("constants");
const { get } = require("http");


test('Login test', async ({ page })=>{

    const email = "Test123@gmail.com";
    const password = "Test1234";
    // const context = await browser.contexts();
    // const page = await context.newPage();

    const productName = page.locator('.card-body');
    const cart = page.locator('[routerlink*="cart"]');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();

    // await productName.waitFor();
    await page.waitForLoadState("networkidle");

    const product = await productName.count();

    for(let i = 0; i<product; i++) {
        if(await productName.nth(i).locator('b').textContent() === 'ZARA COAT 3') {
            await productName.nth(i).locator("text = Add To Cart").click();
        } 
    }

    await cart.click();
    await page.locator('div li').first().waitFor();
    const getProductName = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(getProductName).toBeTruthy();

    await page.getByRole('button', {name: 'Checkout'}).click();

    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('Test');
    await page.getByRole('textbox', {name: 'Select Country'}).click();
    await page.getByRole('textbox', {name: 'Select Country'}).pressSequentially('Ind');
    const option = await page.locator('.ta-results')
    await option.waitFor();
    const optionCount = await option.locator('button').count();

    for(let i =0; i<optionCount; i++) {
            const optionText = await option.locator('button').nth(i).textContent();
            if(optionText === ' India') {
                await option.locator('button').nth(i).click();
                break;
            }
    }
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

    const getOrderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderId = getOrderId.split('|')[1];
    
    await page.locator('[routerlink*="myorders"]').first().click();

    const getTable = await page.locator('tbody tr');

    for(let i  =0; i<getTable.count(); i++) {
        const getCell = await getTable.nth(i).locator('th').textContent();
        if(orderId.includes(getCell))
    } 
})


