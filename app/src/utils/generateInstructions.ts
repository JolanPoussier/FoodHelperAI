import { state } from "../services/type";

export default function generateInstructions({ state }: { state: state }) {
  return `Donne moi une recette à faire avec une partie de ces ingrédients en dessous uniquement mais sans obligation de les utiliser tous et de tout utiliser.

Sois le plus précis possible sur les étapes avec les temps et les quantités exacts.

La première ligne doit être le nom du plat.

${state.ingredientList.map(
  (ingredient) => `${ingredient.quantity} ${ingredient.ingredient} `
)}

${state.persons ? `C’est une recette pour ${state.persons} personnes.` : ""}

${
  state.cookingTime
    ? `Cette recette devra pouvoir être cuisinée en moins de ${state.cookingTime} minutes.`
    : ""
}`;
}
