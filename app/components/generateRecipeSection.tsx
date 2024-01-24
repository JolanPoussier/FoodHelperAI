import { Sparkles } from "lucide-react";
import Button from "./button";

export default function GenerateRecipeSection({
  recipe,
  generateInstructions,
  openModal,
}: {
  recipe: boolean;
  generateInstructions: () => void;
  openModal: (boolean: boolean) => void;
}) {
  return (
    <div className="pb-12 pt-6 flex justify-center w-full max-w-[605px]">
      <Button
        text={
          <span className="flex flex-raw justify-center text-xl items-center">
            {!recipe ? "Générer" : "Autre recette"}
            <Sparkles className="sm:ml-3" />
          </span>
        }
        classname={`rounded-3xl py-2 w-full px-4 ${recipe ? "mr-4" : ""}`}
        onClick={generateInstructions}
      />
      {recipe ? (
        <Button
          classname="ml-4 rounded-3xl py-2 w-full text-xl"
          text="Résultat"
          onClick={() => openModal(true)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
