"use client";

import { useState } from "react";
import { formatRecipe } from "./src/utils/formatRecipe";
import Input from "./components/input";
import Button from "./components/button";
import DisplayIngredients from "./components/displayIngredients";
import DropMenu from "./components/dropMenu";
import { Plus } from "lucide-react";

export default function Home() {
  const [dataForm, setDataForm] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
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
    console.log(data);
    console.log(section);
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

  // const handleClear = () => {
  // };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const result = await fetch("/api/foodrequest", {
      method: "POST",
      body: JSON.stringify({ dataForm }),
    });
    setDataForm("");

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

  const formattedRecipe = formatRecipe(recipe);

  console.log(state);

  return (
    <main className="h-full text-lg relative w-4/5 mx-auto bg-grey-400">
      <h1 className="pt-3 pb-5 text-3xl font-bold">Préparez votre repas</h1>
      <div className="w-full pt-4 flex pb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-48 mb-4 md:mb-0">
            <div>Pour</div>
            <div>
              <Input
                classname="w-1/4 p-1 gap-4 rounded-md"
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
            <div>
              <Input
                classname="w-1/4 p-1 gap-4 rounded-md"
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
          <div className="w-48  mb-4 md:mb-0">
            <div>Aliment</div>
            <div>
              <Input
                classname="w-1/2 p-1 gap-4 rounded-md"
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
                classname="w-1/2 p-1 gap-4 rounded-md $"
                section="quantityNumber"
                placeholder="30"
                value={state.quantityNumber}
                onChange={handleDataChange}
              />
              <div className="pl-2">
                <DropMenu state={state} setState={setState} />
              </div>
              <div className="self-end pl-12">
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
      <div className="text-2xl font-bold pb-2">Liste :</div>
      <div className="h-3/5 overflow-x-auto">
        <DisplayIngredients
          setState={setState}
          state={state}
          ingredients={state.ingredientList}
        />
      </div>
      <pre className=" w-full whitespace-pre-wrap overflow-wrap-break-word">
        <span
          className="block"
          dangerouslySetInnerHTML={{ __html: formattedRecipe }}
        />
      </pre>
    </main>
  );
}
