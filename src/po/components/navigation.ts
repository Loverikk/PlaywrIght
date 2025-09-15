import { Page } from "@playwright/test";

export class Navigation {
  constructor(
    readonly page: Page,
    readonly categories = page.locator('a[data-test="nav-categories"]'),
    readonly categoriesDropdown = page.locator(".dropdown-menu.show"),
    readonly powerToolsCategory = page.locator('[data-test="nav-power-tools"]')
  ) {}
}
