import { expect, test } from "@playwright/test";

test("connected story, preview navigation, theme persistence and browser history", async ({ page }) => {
  const errors: string[] = [];
  const backendRequests: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => { if (request.url().includes(":8000")) backendRequests.push(request.url()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("One connected");
  await page.getByRole("button", { name: "Deliver", exact: true }).first().click();
  await expect(page.locator("#workflow-detail")).toContainText("Follow the work all the way to code.");
  await page.getByRole("button", { name: "Run the business", exact: true }).first().click();
  await expect(page.locator("#workflow-detail")).toContainText("Connect delivery to the bigger picture.");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("button", { name: "Explore the preview" }).first().click();
  await expect(page).toHaveURL(/view=app/);
  await expect(page.getByRole("note")).toContainText("Sample data");
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("note")).toBeVisible();
  await page.getByRole("button", { name: "Product Overview", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(backendRequests).toEqual([]);
  expect(errors).toEqual([]);
});

for (const width of [390, 768, 1440]) {
  for (const theme of ["dark", "light"]) {
    test(`layout ${width}px ${theme}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript(value => localStorage.setItem("theme", value), theme);
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveClass(new RegExp(theme));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.getByRole("heading", { level: 1 }).evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(40);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`landing-${width}-${theme}.png`), fullPage: true, animations: "disabled" });
      await page.getByRole("button", { name: "Collaborate", exact: true }).first().click();
      await expect(page.locator("#workflow-detail")).toContainText("Keep the conversation with the work.");
    });
  }
}

test("reduced motion and keyboard controls work without a canvas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const control = page.getByRole("button", { name: "Deliver", exact: true }).first();
  await control.focus();
  await page.keyboard.press("Enter");
  await expect(control).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#workflow-detail")).toContainText("Follow the work all the way to code.");
});

test("WebGL unavailable preserves the interactive HTML story", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Run the business", exact: true }).first().click();
  await expect(page.locator("#workflow-detail")).toContainText("Connect delivery to the bigger picture.");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("desktop canvas loads and stops when the illustration is offscreen", async ({ page }) => {
  const clockWarnings: string[] = [];
  page.on("console", message => {
    if (message.text().includes("THREE.Clock") && message.text().includes("deprecated")) clockWarnings.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Deliver", exact: true }).first().click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.locator("#roadmap").scrollIntoViewIfNeeded();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
  await expect(page.locator("canvas")).toBeVisible();
  expect(clockWarnings).toEqual([]);
});

test("walkthrough advances, pauses on selection, and replays", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-step]')).toHaveAttribute("data-step", "1", { timeout: 9000 });
  await page.getByRole("button", { name: "Deliver", exact: true }).first().click();
  await expect(page.getByRole("button", { name: "Play walkthrough", exact: true })).toBeVisible();
  await expect(page.locator('[data-step]')).toHaveAttribute("data-step", "2");
  await page.getByRole("button", { name: "Replay walkthrough" }).click();
  await expect(page.locator('[data-step]')).toHaveAttribute("data-step", "0");
  await expect(page.getByRole("button", { name: "Pause walkthrough" })).toBeVisible();
  await page.getByRole("button", { name: "Pause walkthrough" }).click();
  await expect(page.getByRole("button", { name: "Play walkthrough", exact: true })).toBeVisible();
});
