import { Plus } from "lucide-react";
import Button from "./button";
import Input from "./input";
import SuggestionsList from "./suggestionsList";
import DisplayList from "./displayList";
import { suggestionsListEquipments } from "../src/services/datas";
import { errorState, setState, state } from "../src/services/type";
import { FormEvent } from "react";

export default function KitchenTools({
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
  throwError: (section: string) => void;
}) {
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

  return (
    <div className="collapse w-full 2xl:w-1/2 max-w-[605px] collapse-arrow mt-8 2xl:mt-0 2xl:ml-4 border border-gray-200 bg-secondary h-fit shadow-md">
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
                      classname="w-9 h-9 flex justify-center items-center rounded-md"
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
  );
}
