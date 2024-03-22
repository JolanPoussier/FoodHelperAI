import { Plus } from "lucide-react";
import Button from "./button";
import Input from "./input";
import SuggestionsList from "./suggestionsList";
import DisplayList from "./displayList";
import DropMenu from "./dropMenu";
import { suggestionsListIngredients } from "../src/services/datas";
import { errorState, setState, state } from "../src/services/type";
import { FormEvent } from "react";

export default function Ingredients({
  state,
  setState,
  errorState,
  handleDataChange,
  throwError,
}: {
  state: state;
  setState: setState;
  errorState: errorState;
  handleDataChange: (data: string, section: string) => void;
  throwError: (errorName: string, value?: boolean) => void;
}) {
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
    } else {
      throwError("ingredient");
    }
  };

  return (
    <div
      className={`collapse w-full 2xl:w-1/2 max-w-[605px] collapse-arrow border border-gray-200 h-fit bg-secondary shadow-md${
        errorState.ingredientList ? " border-red-500" : ""
      }`}
    >
      <input type="checkbox" className="peer" />
      <h1 className="collapse-title pt-3 text-2xl font-bold">
        Ingrédients disponibles ({state.ingredientList.length})
        {errorState.ingredientList ? (
          <span className="pt-3 text-lg font-bold text-red-500">
            &nbsp;&nbsp;&nbsp;{`(Min 4)`}
          </span>
        ) : (
          ""
        )}
      </h1>
      <div className="collapse-content">
        <form onSubmit={handleSubmitIngredient}>
          <div className="w-full pt-4 flex pb-6">
            <div className="flex flex-col md:flex-row">
              <div className="w-48 mb-4 md:mb-0">
                <div>Ingrédient</div>
                <div>
                  <Input
                    classname="w-36 p-1 rounded-md"
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
                    placeholder="8"
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
                      id="+"
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
  );
}
