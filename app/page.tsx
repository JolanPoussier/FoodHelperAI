"use client";

import { FormEvent, useState } from "react";
import { formatRecipe } from "./src/utils/formatRecipe";
import Input from "./components/input";
import Button from "./components/button";
import DropMenu from "./components/dropMenu";
import { Plus } from "lucide-react";
import SuggestionsList from "./components/suggestionsList";
import generateInstructions from "./src/utils/generateInstructions";
import ModalDisplayRecipe from "./components/modalDisplay";
import {
  suggestionsListEquipments,
  suggestionsListIngredients,
} from "./src/services/datas";
import DisplayList from "./components/displayList";
import Header from "./components/header";
import GenerateRecipeSection from "./components/generateRecipeSection";
import Presentation from "./components/presentation";

export default function Home() {
  const [instructions, setInstructions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecipeModalOpen, setisRecipeModalOpen] = useState(false);
  const [errorState, setErrorState] = useState({
    persons: false,
    ingredient: false,
    ingredientList: false,
    equipment: false,
  });
  const [state, setState] = useState({
    persons: "",
    ingredientList: [] as { quantity: string; ingredient: string }[],
    cookingTime: "",
    ingredient: "",
    equipment: "",
    quantityNumber: "",
    quantityUnit: "",
    kitchenEquipmentList: [] as string[],
  });

  const handleDataChange = (data: string, section: string) => {
    setState({ ...state, [section]: data });
    setErrorState({ ...errorState, [section]: false });
  };

  const throwError = (errorName: string) => {
    setErrorState({ ...errorState, [errorName]: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitIngredient = (e: FormEvent) => {
    e.preventDefault();
    if (state.ingredient !== "") {
      setState({
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
      });
      state.ingredientList.length > 3
        ? setErrorState({ ...errorState, ingredientList: false })
        : "";
    } else {
      throwError("ingredient");
    }
  };
  const handleSubmitEquipment = (e: FormEvent) => {
    e.preventDefault();
    if (state.equipment !== "") {
      setState({
        ...state,
        kitchenEquipmentList: [...state.kitchenEquipmentList, state.equipment],
        equipment: "",
      });
    } else {
      throwError("equipment");
    }
  };

  const handleGenerateInstructions = () => {
    if (!state.persons) {
      throwError("persons");
    } else if (state.ingredientList.length < 4) {
      throwError("ingredientList");
    } else {
      setRecipe("");
      setInstructions(generateInstructions({ state }));
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
    console.log(instructions);
    handleSubmit();
  }

  if (state.ingredientList.length > 3) {
    errorState.ingredientList ? (errorState.ingredientList = false) : "";
  }

  const formattedRecipe = formatRecipe(recipe);

  return (
    <main className="h-full text-lg relative w-full sm:w-4/5 md:w-2/3 xl:w-1/2 max-w-[800px] mx-auto bg-primary text-gray-800">
      <Header />
      <Presentation />
      <div className="mt-8 px-6 flex flex-col items-center bg-secondary rounded-2xl">
        <h1 className="pt-8 pb-5 text-3xl font-bold">Préparez votre repas</h1>
        <div className="w-full pt-4 flex lg:justify-center pb-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-56 mb-4 lg:mb-0">
              <div>Pour</div>
              <div className="flex content-start">
                <Input
                  classname="w-20 p-1 rounded-md flex flex-col"
                  section="persons"
                  placeholder="2"
                  value={state.persons}
                  onChange={handleDataChange}
                  errorMessage={errorState.persons ? "A remplir" : ""}
                />
                &nbsp;personne(s)
              </div>
            </div>
            <div className="">
              <div>Temps de préparation (facultatif)</div>
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
        <div className="w-full flex flex-col items-center my-6">
          {/* 

        Ingredient Side 

        */}
          <div
            className={`collapse w-full max-w-[605px] collapse-arrow border border-gray-200 h-fit bg-secondary shadow-md${
              errorState.ingredientList ? " border-red-500" : ""
            }`}
          >
            <input type="checkbox" className="peer" />
            <h1 className="collapse-title pt-3 text-2xl font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
              Ingrédients disponibles ({state.ingredientList.length})
              {errorState.ingredientList ? (
                <span className="pt-3 text-lg font-bold text-red-500">
                  &nbsp;&nbsp;&nbsp;{`(Min 4)`}
                </span>
              ) : (
                ""
              )}
            </h1>
            <div className="collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <form onSubmit={handleSubmitIngredient}>
                <div className="w-full pt-4 flex pb-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-56  mb-4 md:mb-0">
                      <div>Ingrédient</div>
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
                          classname="w-20 p-1 gap-4 rounded-md"
                          section="quantityNumber"
                          placeholder="30"
                          value={state.quantityNumber}
                          onChange={handleDataChange}
                        />
                        <div className="pl-2">
                          <DropMenu state={state} setState={setState} />
                        </div>
                        <div className="pl-28">
                          <Button
                            classname="w-9 h-9 flex justify-center items-center	rounded-md"
                            text={<Plus />}
                            type="submit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="text-2xl font-bold pb-2">Suggestions</div>
              <div className="h-28 overflow-x-auto mb-6 w-full scrollbar">
                <SuggestionsList
                  submitSuggestion={(suggestion) => {
                    setState({
                      ...state,
                      ingredientList: [
                        ...state.ingredientList,
                        {
                          quantity: "",
                          ingredient: suggestion,
                        },
                      ],
                    });
                  }}
                  suggestionList={suggestionsListIngredients}
                />
              </div>
              <div className="text-2xl font-bold pb-2">Liste :</div>
              <div className="h-80 overflow-x-auto scrollbar">
                <DisplayList
                  setState={setState}
                  state={state}
                  list={state.ingredientList}
                  listName="ingredientList"
                />
              </div>
            </div>
          </div>

          {/* 
        
        Kitchen Tools 
        
        */}
          <div className="collapse w-full max-w-[605px] collapse-arrow mt-8 border border-gray-200 bg-secondary h-fit shadow-md">
            <input type="checkbox" />
            <h1 className="collapse-title pt-3 text-2xl font-bold">
              Matériel disponible
            </h1>
            <div className="collapse-content">
              <form onSubmit={handleSubmitEquipment}>
                <div className="w-full pt-4 flex pb-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-56  mb-4 md:mb-0">
                      <div>Matériel</div>
                      <div className="flex flex-row">
                        <Input
                          classname="w-44 p-1 gap-4 rounded-md"
                          errorMessage={
                            errorState.equipment ? "Entrez l'équipement" : ""
                          }
                          section="equipment"
                          placeholder="Four"
                          value={state.equipment}
                          onChange={handleDataChange}
                        />
                        <div className="pl-14 md:pl-28">
                          <Button
                            classname="w-9 h-9 flex justify-center items-center	rounded-md"
                            text={<Plus />}
                            type="submit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="text-2xl font-bold pb-2">Suggestions</div>
              <div className="h-28 overflow-x-auto mb-6 w-full scrollbar">
                <SuggestionsList
                  submitSuggestion={(suggestion) => {
                    setState({
                      ...state,
                      kitchenEquipmentList: [
                        ...state.kitchenEquipmentList,
                        suggestion,
                      ],
                    });
                  }}
                  suggestionList={suggestionsListEquipments}
                />
              </div>
              <div className="text-2xl font-bold pb-2">Liste :</div>
              <div className="h-80 overflow-x-auto scrollbar">
                <DisplayList
                  setState={setState}
                  state={state}
                  list={state.kitchenEquipmentList}
                  listName="kitchenEquipmentList"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Validation Buttons */}
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
      </div>
      <div className="pb-6"></div>
    </main>
  );
}
