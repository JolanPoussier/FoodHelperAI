import { setState, state } from "../src/services/type";
import Button from "./button";
import { Trash2 } from "lucide-react";

export default function DisplayList({
  listName,
  list,
  setState,
  state,
}: {
  listName: string;
  list: any[];
  setState: setState;
  state: state;
}) {
  const handleDelete = (index: number) => {
    setState({
      ...state,
      [listName]: list.filter((ing, i) => i !== index),
    });
  };
  return (
    <div className="flex w-full h-full flex-col flex-wrap content-start	">
      {list.map((ingredient, index) => (
        <div key={index} className="flex mb-3 mr-8 max-w-64">
          <div className="font-mono text-black rounded-md text-lg font-bold w-60 bg-primary shadow-md border border-gray-100 p-2 mr-1.5 ellipsis">
            {ingredient.quantity ? `${ingredient.quantity} ` : ""}
            {ingredient.ingredient
              ? ingredient.ingredient.charAt(0).toUpperCase() +
                ingredient.ingredient.slice(1)
              : ""}
            {typeof ingredient === "string"
              ? ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
              : ""}
          </div>
          <Button
            text={<Trash2 />}
            classname="px-2.5 rounded-md bg-transparent text-gray-900 hover:bg-red-50 hover:text-red-500"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
    </div>
  );
}
