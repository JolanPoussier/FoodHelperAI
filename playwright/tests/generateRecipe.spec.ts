import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://ia-cooker-2cd92e0c1e3b.herokuapp.com/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AI Cooker/);
});

test.beforeEach(
  async ({ page }) =>
    await page.goto("https://ia-cooker-2cd92e0c1e3b.herokuapp.com/")
);

test.describe("Enter ingredients", () => {
  test("should allow me to enter manualy first ingredient", async ({
    page,
  }) => {
    // Click to open the ingredient side
    await page.getByRole("checkbox").first().click();

    // Fill in the ingredient.
    const inputIngredient = page.getByPlaceholder("carottes");
    const inputQuantity = page.getByPlaceholder("8");

    await inputIngredient.fill("raviolis");
    await inputQuantity.fill("12");

    // Put the unity
    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "g", exact: true }).click();

    //Click on submission button
    // await inputQuantity.press("Enter");
    await page.getByTestId("+").click();

    //Verification of the input after clean
    await expect(inputIngredient).toBeEmpty();
    await expect(inputQuantity).toBeEmpty();

    // Verification of the Element in the list
    await expect(page.getByText("12g Raviolis")).toBeVisible();
  });
});
