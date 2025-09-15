import dotenv from "dotenv";
dotenv.config();

import { test, expect } from "@playwright/test";
import { LoginPage } from "../po/pages/loginPage";
import { AccountPage } from "../po/pages/accountPage";
import { ForgotPasswordPage } from "../po/pages/forgotPasswordPage";
import {
  DUMMY_CREDENTIALS,
  PAGE_PATHS,
  TYPES,
  TITLES,
  ERROR_MESSAGES,
} from "../data";

test.describe("Testing login page", () => {
  let loginPage: LoginPage;
  let accountPage: AccountPage;
  let forgotPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(PAGE_PATHS.LOGIN, page);
    accountPage = new AccountPage(PAGE_PATHS.MY_ACCOUNT, page);
    forgotPasswordPage = new ForgotPasswordPage(
      PAGE_PATHS.FORGOT_PASSWORD,
      page
    );
    loginPage.open();
  });

  test("Should show the error messages when login with empty credentials", async () => {
    await loginPage.login();
    await expect(loginPage.emailErrorField).toBeVisible();
    await expect(loginPage.passwordErrorField).toBeVisible();
    await expect(loginPage.emailErrorField).toHaveText(
      ERROR_MESSAGES.EMAIL_REQUIRED
    );
    await expect(loginPage.passwordErrorField).toHaveText(
      ERROR_MESSAGES.PASSWORD_REQUIRED
    );
  });

  test("Should show the error when login with the invalid email", async () => {
    await loginPage.fillInEmail(DUMMY_CREDENTIALS.EMAIL);
    await loginPage.fillInPassword(process.env.CORRECT_PASSWORD!);
    await loginPage.login();

    await expect(loginPage.wrongCredentialsError).toBeVisible();
    await expect(loginPage.wrongCredentialsError).toHaveText(
      ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD
    );
  });

  test("Should show the error when login with the invalid password", async () => {
    await loginPage.fillInEmail(process.env.CORRECT_EMAIL!);
    await loginPage.fillInPassword(DUMMY_CREDENTIALS.PASSWORD);
    await loginPage.login();

    await expect(loginPage.wrongCredentialsError).toBeVisible();
    await expect(loginPage.wrongCredentialsError).toHaveText(
      ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD
    );
  });

  test("Should login with the valid credentials", async ({ page }) => {
    await loginPage.fillInEmail(process.env.CORRECT_EMAIL!);
    await loginPage.fillInPassword(process.env.CORRECT_PASSWORD!);
    await loginPage.login();

    await expect(accountPage.pageTitle).toHaveText(TITLES.MY_ACCOUNT);
    await expect(page).toHaveURL(PAGE_PATHS.MY_ACCOUNT_FULL);
  });

  test('Should reveal the password when click the "Eye" icon', async () => {
    await loginPage.fillInPassword(DUMMY_CREDENTIALS.PASSWORD);
    let type = await loginPage.getPasswordFieldType();
    expect(type).toBe(TYPES.PASSWORD);
    await loginPage.unmaskPassword();
    type = await loginPage.getPasswordFieldType();
    expect(type).toBe(TYPES.TEXT);
  });

  test("Should show the error message when restoring the password without the email", async ({
    page,
  }) => {
    await loginPage.clickForgotPasswordLink();

    await expect(page).toHaveURL(PAGE_PATHS.FORGOT_PASSWORD_FULL);

    await forgotPasswordPage.setNewPassword();
    await expect(forgotPasswordPage.errorMessage).toBeVisible();
    await expect(forgotPasswordPage.errorMessage).toHaveText(
      ERROR_MESSAGES.EMAIL_REQUIRED
    );
  });
});
