import {test, expect } from '@playwright/test';


test("Login field validation", async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption('Female');
    await page.getByPlaceholder("Password").fill("123456");
    await page.locator('[name="name"]').first().fill("test123");
    await page.locator('[name="email"]').fill("test123@gamil.com");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
})