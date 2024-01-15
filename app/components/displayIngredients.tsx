import Button from "./button";
import { setState, state } from "../src/services/type";
import { Trash2 } from "lucide-react";

export default function DisplayIngredients({
  ingredients,
  setState,
  state,
}: {
  ingredients: { quantity: string; ingredient: string }[];
  setState: setState;
  state: state;
}) {
  const handleDelete = (index: number) => {
    setState({
      ...state,
      ingredientList: ingredients.filter((ing, i) => i !== index),
    });
  };
  return (
    <div className="flex w-full h-full flex flex-col flex-wrap">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex mb-3">
          <div className="font-mono text-white rounded text-lg font-bold w-60 bg-blue-500 p-2 mr-3">
            {ingredient.quantity ? `${ingredient.quantity} ` : ""}

            {ingredient.ingredient.charAt(0).toUpperCase() +
              ingredient.ingredient.slice(1)}
          </div>
          <Button
            text={<Trash2 />}
            classname="px-2.5"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
    </div>
  );
}
