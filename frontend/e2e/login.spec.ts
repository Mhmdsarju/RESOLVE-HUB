import { test, expect } from "@playwright/test";

test("organization admin can login successfully", async ({ page }) => {
  await page.goto("/user/login");

  await page.getByPlaceholder("engineer@company.com").fill("admin@resolvehub.com");

  await page.getByPlaceholder("Enter your password").fill("Sarjun@1");

  await page.getByRole("button", {
    name: /Sign In/i,
  }).click();

  await expect(page).toHaveURL(/dashboard/);
});