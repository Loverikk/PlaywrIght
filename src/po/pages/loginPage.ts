import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  constructor(
    readonly path: string,
    readonly page: Page,
    readonly emailField = page.getByLabel("email"),
    readonly passwordField = page.getByPlaceholder("Your password"),
    readonly loginBtn = page.getByRole("button", { name: "Login" }),
    readonly emailErrorField = page.locator('[data-test="email-error"]'),
    readonly passwordErrorField = page.locator('[data-test="password-error"]'),
    readonly wrongCredentialsError = page.locator('[data-test="login-error"]'),
    readonly eyeIcon = page.locator("button.btn.btn-outline-secondary"),
    readonly forgotPasswordLink = page.getByRole("link", {
      name: "Forgot your Password?",
    })
  ) {
    super(path, page);
  }

  async fillInEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillInPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async login() {
    await this.loginBtn.click();
  }

  async unmaskPassword() {
    await this.eyeIcon.click();
  }

  async getPasswordFieldType() {
    return await this.passwordField.getAttribute("type");
  }

  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  }
}
