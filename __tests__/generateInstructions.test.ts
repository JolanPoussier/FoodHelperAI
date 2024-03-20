import generateInstructions from "../app/src/utils/generateInstructions";

const datasState = {
  persons: "2",
  ingredientList: [
    { quantity: "", ingredient: "Œufs" },
    { quantity: "", ingredient: "Crème" },
    { quantity: "", ingredient: "Beurre" },
    { quantity: "", ingredient: "Gruyère" },
  ],
  cookingTime: "",
  ingredient: "",
  equipment: "",
  quantityNumber: "",
  quantityUnit: "",
  kitchenEquipmentList: [],
};

test("generate the recipe instructions to give to the API with an object in parameters.", () => {
  expect(
    generateInstructions({
      datasState,
    })
  )
    .toBe(`Donne moi une recette à faire avec une partie de ces ingrédients en dessous uniquement mais sans obligation de les utiliser tous et de tout utiliser.

Sois le plus précis possible sur les étapes avec les temps et les quantités exacts.

La première ligne doit être le nom du plat.

 Œufs , Crème , Beurre , Gruyère 

C’est une recette pour 2 personnes.



`);
});
