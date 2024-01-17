import { setState, state } from "../src/services/type";
import Button from "./button";

type Props = {
  setState: setState;
  state: state;
};

export default function SuggestionsList({ setState, state }: Props) {
  const suggestionsList = [
    "Œufs",
    "Crème",
    "Beurre",
    "Gruyère",
    "Poivre",
    "Lait",
    "Huile",
    "Farine",
    "Curry",
    "Basilic",
    "Sucre",
    "Origan",
    "Levure",
    "Sauce Tomate",
  ];

  const handleSubmitSuggestion = (suggestion: string) => {
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
  };

  return (
    <div className="h-full flex flex-col flex-wrap">
      {suggestionsList.map((suggestion, index) => (
        <Button
          onClick={() => handleSubmitSuggestion(suggestion)}
          text={suggestion}
          key={index}
          classname="mr-4 mb-2 min-w-32"
        />
      ))}
    </div>
  );
}
