"use client";

import { useState } from "react";
import Input from "./input";
import KitchenTools from "./kitchenTools";
import Ingredients from "./ingredients";
import DisplaySection from "./displaySection";
import PersonsQuantityInput from "./personsQuantityInput";
import TimeConstraintsInput from "./timeConstraintsInput";

export default function RecipeMain() {
  const [errorState, setErrorState] = useState({
    persons: false,
    ingredient: false,
    ingredientList: false,
    equipment: false,
  });
  const [datasState, setDatasState] = useState({
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
    setDatasState({ ...datasState, [section]: data });
    setErrorState({ ...errorState, [section]: false });
  };

  const throwError = (errorName: string, value?: boolean) => {
    setErrorState({ ...errorState, [errorName]: value ? value : true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (datasState.ingredientList.length > 3) {
    errorState.ingredientList ? (errorState.ingredientList = false) : "";
  }

  return (
    <div className="mt-8 px-6 flex flex-col items-center bg-secondary rounded-2xl">
      <h1 className="pt-8 pb-5 text-3xl font-bold">Préparez votre repas</h1>
      <div className="w-full pt-4 flex lg:justify-center pb-6">
        <div className="flex flex-col lg:flex-row">
          <PersonsQuantityInput
            datasState={datasState}
            errorState={errorState}
            handleDataChange={handleDataChange}
          />
          <TimeConstraintsInput
            datasState={datasState}
            errorState={errorState}
            handleDataChange={handleDataChange}
          />
        </div>
      </div>
      <div className="w-full flex flex-col 2xl:flex-row items-center 2xl:items-start my-6">
        <Ingredients
          state={datasState}
          setState={setDatasState}
          errorState={errorState}
          throwError={throwError}
          handleDataChange={handleDataChange}
        />
        <KitchenTools
          state={datasState}
          setState={setDatasState}
          errorState={errorState}
          throwError={throwError}
          handleDataChange={handleDataChange}
        />
      </div>

      <DisplaySection datasState={datasState} throwError={throwError} />
    </div>
  );
}
