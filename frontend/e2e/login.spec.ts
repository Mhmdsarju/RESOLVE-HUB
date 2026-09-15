import { test, expect } from "@playwright/test";

test("organization admin can login successfully", async ({ page }) => {
  await page.goto("/organization/login");

  await page.getByPlaceholder("admin@company.com").fill("mhmdsarju@gmail.com");

  await page.getByPlaceholder("Enter your password").fill("Sarjun@1");

  await page.getByRole("button", {
    name: /continue to workspace/i,
  }).click();

  await expect(page).toHaveURL(/dashboard/);
});