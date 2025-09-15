import { Page } from "@playwright/test";
import { Navigation } from "../components/navigation";

export class BasePage {
  readonly navigation: Navigation;
  constructor(public path: string, readonly page: Page) {
    this.navigation = new Navigation(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }
}
