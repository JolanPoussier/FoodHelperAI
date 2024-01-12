import { SetStateAction } from "react";
import Button from "./button";

export default function DisplayIngredients({
  ingredients,
  setState,
  state,
}: {
  ingredients: { quantity: string; ingredient: string }[];
  setState: (
    value: SetStateAction<{
      persons: string;
      ingredientList: {
        quantity: string;
        ingredient: string;
      }[];
      cookingTime: string;
      ingredient: string;
      quantityNumber: string;
      quantityUnit: string;
    }>
  ) => void;
  state: {
    persons: string;
    ingredientList: {
      quantity: string;
      ingredient: string;
    }[];
    cookingTime: string;
    ingredient: string;
    quantityNumber: string;
    quantityUnit: string;
  };
}) {
  const handleDelete = (index: number) => {
    setState({
      ...state,
      ingredientList: ingredients.filter((ing, i) => i !== index),
    });
  };
  return (
    <div className="flex w-full h-1/2 flex flex-col overflow-x-auto">
      {ingredients.map((ingredient, index) => (
        <div
          className="font-mono text-white rounded text-lg font-bold w-60 bg-blue-500 p-2 mb-3"
          key={index}
        >
          {ingredient.quantity ? `${ingredient.quantity} ` : ""}

          {ingredient.ingredient.charAt(0).toUpperCase() +
            ingredient.ingredient.slice(1)}
          <Button text="delete" onClick={() => handleDelete(index)} />
        </div>
      ))}
    </div>
  );
}
