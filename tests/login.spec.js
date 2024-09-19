const {
  test,
  expect
} = require('@playwright/test');

test('To test the login page', async ({
  page
}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.fill('input[name="username"]', 'Admin');
  //await page.locator('input[name="username"]').type('Admin');

  await page.fill('input[name="password"]', 'admin123');
  //await page.locator('input[name="password"]').type('admin123');


  await page.click("button[type='submit']");
  //await page.locator("button[type='submit']").click();


  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/dashboard/);

  await expect(page.locator('h6')).toHaveText('Dashboard');


  await page.getByAltText("profile picture").first().click();

  await page.getByText("Logout").click()

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(/login/);

});


test('Negative test for invalid login', async ({
  page
}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.fill('input[name="username"]', 'InvalidUser');

  await page.fill('input[name="password"]', 'wrongpassword');

  await page.click('button[type="submit"]');

  await page.waitForSelector('.oxd-alert-content');

  await expect(page).not.toHaveURL(/dashboard/);

  const errorMessage = await page.locator('.oxd-alert-content');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Invalid credentials');
});