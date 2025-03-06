const { test, expect } = require('@playwright/test');




test('Login test', async ({ page })=>{
    // const context = await browser.context();
    // const page = context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('krish19296@gmail.com');
    await page.locator('#userPassword').fill('Test1234');
    await page.locator('#login').click();
    // console.log(await page.locator('.card-body b').first().textContent());
    // console.log(await page.locator('.card-body b').nth(0).textContent());
    // await page.waitForLoadState("networkidle");
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
})


test('Validate the login page', async({page})=>{
    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState("networkidle");
    const blinking = page.locator("[href*='documents-request']");
    await expect(blinking).toHaveAttribute("class","blinkingText");
})

test('Switch to child window and back to parent window', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState("networkidle");
    const blink =  page.locator("[href*='documents-request']");

    const [new_page] = await Promise.all([

        // wait for element to be access the page and then click
        context.waitForEvent('page'),
        blink.click(),
    ])
    const page_text = await new_page.locator(".red").textContent();
    // console.log(page_text);
    const email = page_text.split("@")[1].split(" ")[0];
    console.log(email);

    // Switch back to parent window
    await page.locator("#username").type(email);    
    const username = await page.locator("#username").textContent();
    console.log("test", username);




    

});