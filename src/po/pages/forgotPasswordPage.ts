import { BasePage } from "./basePage";
import { Page } from "@playwright/test";

export class ForgotPasswordPage extends BasePage {
  constructor(
    readonly path: string,
    readonly page: Page,
    readonly emailField = page.getByPlaceholder("Your email *"),
    readonly setNewPasswordBtn = page.locator("input.btnSubmit"),
    readonly errorMessage = page.locator('div[data-test="email-error"]')
  ) {
    super(path, page);
  }

  async setNewPassword() {
    await this.setNewPasswordBtn.click();
  }
}
