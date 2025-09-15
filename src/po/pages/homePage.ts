import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  constructor(
    readonly path: string,
    readonly page: Page,
    readonly sortDropdown = page.locator('select[data-test="sort"]')
  ) {
    super(path, page);
  }

  get sortDropdownValue() {
    return this.sortDropdown.inputValue();
  }

  async selectCategory(category: string) {
    await this.sortDropdown.selectOption(category);
  }
}
