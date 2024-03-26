import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://ia-cooker-2cd92e0c1e3b.herokuapp.com/");
  // await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AI Cooker/);
});

test.beforeEach(
  async ({ page }) =>
    await page.goto("https://ia-cooker-2cd92e0c1e3b.herokuapp.com/")
  // await page.goto("http://localhost:3000/")
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
    await page.getByRole("button", { name: "-" }).first().click();
    await page.getByRole("button", { name: "g", exact: true }).click();

    //Click on submission button
    // await inputQuantity.press("Enter");
    await page.getByTestId("+").first().click();

    //Verification of the input after clean
    await expect(inputIngredient).toBeEmpty();
    await expect(inputQuantity).toBeEmpty();

    // Verification of the Element in the list
    await expect(page.getByText("12g Raviolis")).toBeVisible();
  });

  test("should allow me to enter ingredient with shortchut", async ({
    page,
  }) => {
    await page.getByRole("checkbox").first().click();

    await page.getByRole("button", { name: "Beurre" }).click();
    await expect(page.getByText("Beurre")).toBeVisible();
  });
});

test.describe("Enter equipment", () => {
  test("should allow me to enter manualy first equipment", async ({ page }) => {
    // Click to open the equipment side
    await page.getByRole("checkbox").last().click();

    // Fill in the equipment.
    const inputEquipment = page.getByPlaceholder("Four");

    await inputEquipment.fill("Casserole");

    //Click on submission button
    await page.getByTestId("+").last().click();

    //Verification of the input after clean
    await expect(inputEquipment).toBeEmpty();

    // Verification of the Element in the list
    await expect(page.getByText("Casserole")).toBeVisible();
  });

  test("should allow me to enter equipment with shortchut", async ({
    page,
  }) => {
    await page.getByRole("checkbox").last().click();

    await page.getByRole("button", { name: "Moule" }).click();
    await expect(page.getByText("Moule")).toBeVisible();
  });
});

test.describe("Delete ingredient/equipment", () => {
  test("Should allow to delete ingredient from the list", async ({ page }) => {
    await page.getByRole("checkbox").first().click();

    await page.getByRole("button", { name: "Beurre" }).click();
    await expect(page.getByText("Beurre")).toBeVisible();

    await page.locator(".h-80 > div > div > .bg-accent").first().click();
    await expect(page.getByText("Beurre")).toBeHidden();
  });

  test("Should allow to delete equipment from the list", async ({ page }) => {
    await page.getByRole("checkbox").last().click();

    await page.getByRole("button", { name: "Moule" }).click();
    await expect(page.getByText("Moule")).toBeVisible();

    await page.locator(".h-80 > div > div > .bg-accent").first().click();
    await expect(page.getByText("Moule")).toBeHidden();
  });
});

test.describe("Generate a complete recipe", () => {
  test("should generate a recipe after adding persons, time, 4 ingredients, equipment", async ({
    page,
  }) => {
    //Add persons and cookingTime
    const inputPersons = page.getByPlaceholder("2");
    const inputCookingTIme = page.getByPlaceholder("30");

    await inputPersons.fill("3");
    await inputCookingTIme.fill("40");

    await expect(inputPersons).toHaveValue("3");
    await expect(inputCookingTIme).toHaveValue("40");

    //Add 4 ingredients with shortcuts
    await page.getByRole("checkbox").first().click();

    await page.getByRole("button", { name: "Beurre" }).click();
    await page.getByRole("button", { name: "Gruyère" }).click();
    await page.getByRole("button", { name: "Lait" }).click();
    await page.getByRole("button", { name: "Crème" }).click();

    //Add an hoven
    await page.getByRole("checkbox").last().click();

    await page.getByRole("button", { name: "Four" }).click();

    //Click on the generation button
    await expect(page.locator("#dropdownModal")).toBeHidden();
    await page.getByRole("button", { name: "Générer" }).click();

    const recipeContentInModal = page.locator("#dropdownModal > pre > span");

    //Check that the modal is open and full
    await expect(page.locator("#dropdownModal")).toBeVisible();
    await expect(recipeContentInModal).not.toBeEmpty();
    const firstRecipe = await recipeContentInModal.innerHTML();

    //Close the modal
    await page.locator(".top-2").click();
    await expect(page.locator("#dropdownModal")).toBeHidden();

    //ReOpen the modal
    await page.getByRole("button", { name: "Résultat" }).click();
    await expect(page.locator("#dropdownModal")).toBeVisible();
    await page.locator(".top-2").click();
    await expect(page.locator("#dropdownModal")).toBeHidden();

    //Change the recipe
    await page.getByRole("button", { name: "Autre recette" }).click();
    await expect(page.locator("#dropdownModal")).toBeVisible();
    await expect(recipeContentInModal).not.toBeEmpty();
    const secondRecipe = await recipeContentInModal.innerHTML();
    expect(firstRecipe).not.toEqual(secondRecipe);
  });
});
