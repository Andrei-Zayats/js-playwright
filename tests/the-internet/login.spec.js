const { test, expect } = require("@playwright/test");

test.describe("Login Page", () => {
  const userNameInput = "#username";
  const passwordInput = "#password";
  const loginButton = "#login button";
  const username = "tomsmith";
  const password = "SuperSecretPassword!";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
  });

  [
    {
      description: "User can login with valid credentials",
      username,
      password,
      message: "You logged into a secure area!",
    },
    {
      description: "User can't login with invalid user name",
      username: "username",
      password,
      message: "Your username is invalid!",
    },
    {
      description: "User can't login with invalid password",
      username,
      password: "SecretPassword",
      message: "Your password is invalid!",
    },
  ].forEach(({ description, username, password, message }) => {
    test(description, async ({ page }) => {
      await page.fill(userNameInput, username);
      await page.fill(passwordInput, password);
      await page.locator(loginButton).click();

      await expect(page.locator(`text=${message}`).first()).toBeVisible();
    });
  });

  test("Login Page Snapshot", async ({ page }) => {
    await expect(page.locator(loginButton)).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("login.png");
  });
});
