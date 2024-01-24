export const formatRecipe = (recipe: string) => {
  const lines = recipe.split("\n");

  const formattedLines = lines.map((line, index) => {
    //Titre de la recette
    if (index === 0) {
      return `<span class="block text-center text-2xl font-bold">${line}</span>`;
    }

    //Sous titres
    if (
      line.startsWith("Ingrédients") ||
      line.startsWith("Instructions") ||
      line.startsWith("Préparation") ||
      line.startsWith("Etapes") ||
      line.startsWith("Matériel")
    ) {
      return `<span class="inline-block pb-2 text-xl font-bold">${line}</span>`;
    }

    //Ingrédients
    // if (line.startsWith("-")) {
    // }

    //Etapes de préparation
    if (/^\d/.test(line)) {
      return `<span class="inline-block pb-3">${line}</span>`;
    }
    return line;
  });

  return formattedLines.join("\n");
};
