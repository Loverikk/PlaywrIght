import { BasePage } from "./basePage";
import { Page } from "@playwright/test";

export class AccountPage extends BasePage {
  constructor(
    readonly path: string,
    readonly page: Page,
    readonly pageTitle = page.getByRole("heading", {
      name: "My account",
      level: 1,
    })
  ) {
    super(path, page);
  }

  
}
