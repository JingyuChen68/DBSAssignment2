import { test, expect } from "@playwright/test";

test.describe("EmbedPrep — Full App Test Suite", () => {

  test("Dashboard loads with correct title and hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/EmbedPrep/);
    await expect(page.locator("text=Welcome to EmbedPrep")).toBeVisible();
  });

  test("Dashboard shows stat cards", async ({ page }) => {
    await page.goto("/");
    // Should show the stat cards with labels
    await expect(page.getByText("Questions", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("mastered").first()).toBeVisible();
  });

  test("Navbar has all 7 navigation links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav");
    await expect(nav.getByText("Dashboard")).toBeVisible();
    await expect(nav.getByText("Lessons")).toBeVisible();
    await expect(nav.getByText("Questions")).toBeVisible();
    await expect(nav.getByText("Industry")).toBeVisible();
    await expect(nav.getByText("Career")).toBeVisible();
    await expect(nav.getByText("Companies")).toBeVisible();
    await expect(nav.getByText("Checklist")).toBeVisible();
  });

  test("Questions page loads with pre-loaded questions", async ({ page }) => {
    await page.goto("/questions");
    // Should have question links visible
    const questionLinks = page.locator("a[href^='/questions/']");
    await expect(questionLinks.first()).toBeVisible();
    const count = await questionLinks.count();
    expect(count).toBeGreaterThan(5);
  });

  test("Can navigate to a question detail page (dynamic route)", async ({ page }) => {
    await page.goto("/questions");
    const firstQuestion = page.locator("a[href^='/questions/']").first();
    const href = await firstQuestion.getAttribute("href");
    await firstQuestion.click();
    await expect(page).toHaveURL(href!);
    // Detail page should have difficulty badge visible
    await expect(page.getByText("Easy").or(page.getByText("Medium")).or(page.getByText("Hard")).first()).toBeVisible();
  });

  test("Can add a new question via the form", async ({ page }) => {
    await page.goto("/questions");
    // Open the form
    const addButton = page.getByRole("button", { name: /add|new/i }).first();
    await addButton.click();
    // Fill in the title
    await page.locator("input[type='text']").first().fill("What is a watchdog timer?");
    // Submit
    await page.getByRole("button", { name: /save question/i }).click();
    // Verify the question appears on the page
    await expect(page.getByText("What is a watchdog timer?")).toBeVisible();
  });

  test("Lessons page loads with all lesson cards", async ({ page }) => {
    await page.goto("/lessons");
    await expect(page.getByRole("heading", { name: "Study Guides & Lessons" })).toBeVisible();
    await expect(page.getByText("Mastering Embedded C/C++")).toBeVisible();
    await expect(page.getByText("Famous Embedded Bugs")).toBeVisible();
  });

  test("Can navigate to a lesson detail page (dynamic route)", async ({ page }) => {
    await page.goto("/lessons/embedded-c-cpp");
    await expect(page.getByRole("heading", { name: "Mastering Embedded C/C++" })).toBeVisible();
    await expect(page.getByText("Contents")).toBeVisible();
    await expect(page.getByText("Progress")).toBeVisible();
  });

  test("Lesson detail has working section navigation", async ({ page }) => {
    await page.goto("/lessons/embedded-c-cpp");
    // First section should be visible
    await expect(page.getByRole("heading", { name: /Pointers/ })).toBeVisible();
    // Click Next Section button
    await page.getByRole("button", { name: /Next Section/ }).click();
    // Second section heading should now appear
    await expect(page.getByRole("heading", { name: /Bit Manipulation/ })).toBeVisible();
  });

  test("Industry Intel page loads with all three tabs", async ({ page }) => {
    await page.goto("/industry");
    await expect(page.getByRole("heading", { name: "Industry Intel" })).toBeVisible();
    // Check tab buttons exist
    await expect(page.getByRole("button", { name: /Companies/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Real Questions/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Industry Topics/ })).toBeVisible();
  });

  test("Industry page company cards expand on click", async ({ page }) => {
    await page.goto("/industry");
    // Click on a company card
    const teslaButton = page.locator("button", { hasText: "Tesla" }).first();
    await teslaButton.click();
    // Should show expanded details
    await expect(page.getByText("Embedded Teams")).toBeVisible();
  });

  test("Industry page questions tab shows filterable questions", async ({ page }) => {
    await page.goto("/industry");
    await page.getByRole("button", { name: /Real Questions/ }).click();
    // Should show filter dropdowns
    await expect(page.locator("select").first()).toBeVisible();
    // Should show question cards
    await expect(page.getByText("questions found")).toBeVisible();
  });

  test("Career page loads with career paths and skills tracker", async ({ page }) => {
    await page.goto("/career");
    await expect(page.getByRole("heading", { name: "Career Roadmap" })).toBeVisible();
    await expect(page.getByText("Firmware Engineer")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills Self-Assessment" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Milestones/ })).toBeVisible();
  });

  test("Companies page loads", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("Checklist page loads with pre-populated items", async ({ page }) => {
    await page.goto("/checklist");
    await expect(page.getByText("Review C pointer")).toBeVisible();
    // Should have a progress indicator
    await expect(page.getByText("%")).toBeVisible();
  });

  test("All pages are reachable from navbar navigation", async ({ page }) => {
    await page.goto("/");

    // Navigate to Lessons
    await page.click("nav >> text=Lessons");
    await expect(page).toHaveURL("/lessons");

    // Navigate to Questions
    await page.click("nav >> text=Questions");
    await expect(page).toHaveURL("/questions");

    // Navigate to Industry
    await page.click("nav >> text=Industry");
    await expect(page).toHaveURL("/industry");

    // Navigate to Career
    await page.click("nav >> text=Career");
    await expect(page).toHaveURL("/career");

    // Navigate to Checklist
    await page.click("nav >> text=Checklist");
    await expect(page).toHaveURL("/checklist");

    // Back to Dashboard
    await page.click("nav >> text=Dashboard");
    await expect(page).toHaveURL("/");
  });
});
