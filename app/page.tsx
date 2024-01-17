"use client";

import { useState } from "react";
import { formatRecipe } from "./src/utils/formatRecipe";
import Input from "./components/input";
import Button from "./components/button";
import DisplayIngredients from "./components/displayIngredients";
import DropMenu from "./components/dropMenu";
import { Plus, Sparkles } from "lucide-react";
import SuggestionsList from "./components/suggestionsList";
import generateInstructions from "./src/utils/generateInstructions";
import ModalDisplayRecipe from "./components/modalDisplay";

export default function Home() {
  const [instructions, setInstructions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecipeModalOpen, setisRecipeModalOpen] = useState(false);
  const [errorState, setErrorState] = useState({
    persons: false,
    ingredient: false,
    ingredientList: false,
  });
  const [state, setState] = useState({
    persons: "",
    ingredientList: [] as { quantity: string; ingredient: string }[],
    cookingTime: "",
    ingredient: "",
    quantityNumber: "",
    quantityUnit: "",
  });

  const handleDataChange = (data: string, section: string) => {
    setState({ ...state, [section]: data });
    setErrorState({ ...errorState, [section]: false });
    // console.log(data);
    // console.log(section);
  };

  const handleSubmitIngredient = () => {
    state.ingredient !== ""
      ? setState({
          ...state,
          ingredientList: [
            ...state.ingredientList,
            {
              quantity: `${state.quantityNumber}${state.quantityUnit}`,
              ingredient: state.ingredient,
            },
          ],
          ingredient: "",
          quantityNumber: "",
          quantityUnit: "",
        })
      : throwError("ingredient");
  };

  const throwError = (errorName: string) => {
    setErrorState({ ...errorState, [errorName]: true });
  };

  const handleGenerateInstructions = () => {
    setRecipe("");
    setInstructions(generateInstructions({ state }));
    setisRecipeModalOpen(true);
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
  const formattedRecipe = formatRecipe(recipe);

  return (
    <main className="h-full text-lg relative w-4/5 mx-auto bg-grey-400">
      <h1 className="pt-3 pb-5 text-3xl font-bold">Préparez votre repas</h1>
      <div className="w-full pt-4 flex pb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-56 mb-4 md:mb-0">
            <div>Pour</div>
            <div className="flex items-center">
              <Input
                classname="w-20 p-1 gap-4 rounded-md"
                section="persons"
                placeholder="2"
                value={state.persons}
                onChange={handleDataChange}
              />
              &nbsp;personne(s)
            </div>
          </div>
          <div className="">
            <div>Temps de préparation maximum (facultatif)</div>
            <div className="flex items-center">
              <Input
                classname="w-20 p-1 gap-4 rounded-md"
                section="cookingTime"
                placeholder="30"
                value={state.cookingTime}
                onChange={handleDataChange}
              />
              &nbsp;min
            </div>
          </div>
        </div>
      </div>
      <h1 className="pt-3 text-3xl font-bold">Ingrédients disponibles</h1>
      <div className="w-full pt-4 flex pb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-56  mb-4 md:mb-0">
            <div>Aliment</div>
            <div>
              <Input
                classname="w-44 p-1 gap-4 rounded-md"
                errorMessage={
                  errorState.ingredient ? "Entrez un ingrédient" : ""
                }
                section="ingredient"
                placeholder="carottes"
                value={state.ingredient}
                onChange={handleDataChange}
              />
            </div>
          </div>
          <div>
            <div>Quantité (facultatif)</div>
            <div className="flex flex-row">
              <Input
                classname="w-20 p-1 gap-4 rounded-md $"
                section="quantityNumber"
                placeholder="30"
                value={state.quantityNumber}
                onChange={handleDataChange}
              />
              <div className="pl-2">
                <DropMenu state={state} setState={setState} />
              </div>
              <div className="self-end pl-28">
                <Button
                  classname="w-9 h-9 flex justify-center items-center	"
                  text={<Plus />}
                  onClick={handleSubmitIngredient}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold pb-2">Suggestions</div>
      <div className="h-28 overflow-x-auto mb-6">
        <SuggestionsList state={state} setState={setState} />
      </div>
      <div className="text-2xl font-bold pb-2">Liste :</div>
      <div className="h-2/5 overflow-x-auto">
        <DisplayIngredients
          setState={setState}
          state={state}
          ingredients={state.ingredientList}
        />
      </div>
      <Button
        text={
          <span className="flex flex-raw">
            {!recipe ? "Générer" : "Autre recette"}
            &nbsp;&nbsp;&nbsp;
            <Sparkles />
          </span>
        }
        classname="mb-12"
        onClick={handleGenerateInstructions}
      />
      {recipe ? (
        <Button
          classname="ml-8"
          text="Résultat"
          onClick={() => setisRecipeModalOpen(true)}
        />
      ) : (
        ""
      )}
      <ModalDisplayRecipe
        formattedRecipe={formattedRecipe}
        setisRecipeModalOpen={setisRecipeModalOpen}
        isRecipeModalOpen={isRecipeModalOpen}
      />
    </main>
  );
}
