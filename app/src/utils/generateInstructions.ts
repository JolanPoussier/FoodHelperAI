import { state } from "../services/type";

export default function generateInstructions({
  datasState,
}: {
  datasState: state;
}) {
  return `Donne moi une recette à faire avec une partie de ces ingrédients en dessous uniquement mais sans obligation de les utiliser tous et de tout utiliser.

Sois le plus précis possible sur les étapes avec les temps et les quantités exacts.

La première ligne doit être le nom du plat.

${datasState.ingredientList.map(
  (ingredient) => `${ingredient.quantity} ${ingredient.ingredient} `
)}

${
  datasState.persons
    ? `C’est une recette pour ${datasState.persons} personnes.`
    : ""
}

${
  datasState.kitchenEquipmentList.length > 0
    ? `Le matériel disponible pour cuisiner est: ${datasState.kitchenEquipmentList.map(
        (equipment) => `${equipment} `
      )}`
    : ""
}

${
  datasState.cookingTime
    ? `Cette recette devra pouvoir être cuisinée en moins de ${datasState.cookingTime} minutes.`
    : ""
}`;
}
