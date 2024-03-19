import { useState } from "react";
import GenerateRecipeSection from "./generateRecipeSection";
import ModalDisplayRecipe from "./modalDisplay";
import generateInstructions from "../src/utils/generateInstructions";
import { state } from "../src/services/type";
import { formatRecipe } from "../src/utils/formatRecipe";

export default function DisplaySection({
  datasState,
  throwError,
}: {
  datasState: state;
  throwError: (errorName: string) => void;
}) {
  const [recipe, setRecipe] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecipeModalOpen, setisRecipeModalOpen] = useState(false);

  const formattedRecipe = formatRecipe(recipe);

  const handleGenerateInstructions = () => {
    if (!datasState.persons) {
      throwError("persons");
    } else if (datasState.ingredientList.length < 4) {
      throwError("ingredientList");
    } else {
      setRecipe("");
      setInstructions(generateInstructions({ datasState }));
      setisRecipeModalOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const result = await fetch("/api/foodrequest", {
      method: "POST",
      body: JSON.stringify({ instructions }),
    });
    setInstructions("");

    const body = result.body;

    if (!body) {
      alert("Something went wrong");
      return;
    }

    const reader = body.getReader();

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        setLoading(false);
        return;
      }

      const chunk = new TextDecoder().decode(value);
      setRecipe((prev) => prev + chunk);
      await readChunk();
    };

    await readChunk();
  };

  if (instructions) {
    handleSubmit();
  }

  return (
    <>
      <GenerateRecipeSection
        openModal={setisRecipeModalOpen}
        generateInstructions={handleGenerateInstructions}
        recipe={!!recipe}
      />
      <ModalDisplayRecipe
        formattedRecipe={formattedRecipe}
        setisRecipeModalOpen={setisRecipeModalOpen}
        isRecipeModalOpen={isRecipeModalOpen}
      />
    </>
  );
}
