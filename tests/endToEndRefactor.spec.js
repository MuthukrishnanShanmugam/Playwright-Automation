const { test, expect }  =  require("@playwright/test");
const { count } = require("console");
const exp = require("constants");
const { get } = require("http");


test('Login test', async ({ page })=>{

    const email = "krish19296@gmail.com";
    const password = "Test1234";
    // const context = await browser.contexts();
    // const page = await context.newPage();

    const productName = page.locator('.card-body');
    const cart = page.locator('[routerlink*="cart"]');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole("button", {name: 'Login'}).click();

    // await productName.waitFor();
    await page.waitForLoadState("networkidle");

    // click add to cart button
    await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: "Add To Cart"}).click();

    // click cart
    await page.getByRole('listitem').getByRole("button", {name:'Cart'}).click(); 

    // wait for cart to load
    await page.locator('div li').first().waitFor();
    
    // check if product is added to cart
    await page.getByText('ZARA COAT 3').isVisible();

    // click checkout
    await page.getByRole('button', {name: 'Checkout'}).click();

    // fill the CVV and name on card details
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('Test');
    
    // click select country and type Ind one by one
    await page.getByPlaceholder('Select Country').pressSequentially('Ind');
    
    // click India on the suggestion
    await page.getByRole('button', {name: 'India'}).nth(1).click();
    
    // check if email is displayed
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    
    // click place order
    await page.getByText('PLACE ORDER').click();

    // check if order is placed
    await page.getByText('Thankyou for the order.').isVisible();

    // get order id
    const getOrderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderId = getOrderId.split('|')[1];
    
    // click orders
    await page.getByRole('listitem').getByRole("button", {name:'ORDERS'}).click();
    
    // wait for table to load
    await page.locator('tbody').waitFor();
    const getTable = await page.locator('tbody tr');

    // click view button for the placed order
    await page.getByRole('row', {name: orderId}).getByRole("button", {name: 'View'}).click();
    
    // check if order id is displayed in the order details
    await page.getByText(orderId).isVisible();
})


