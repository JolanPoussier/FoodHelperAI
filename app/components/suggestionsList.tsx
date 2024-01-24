import { useState } from "react";
import Button from "./button";

type Props = {
  suggestionList: string[];
  submitSuggestion: (suggestion: string) => void;
};

export default function SuggestionsList({
  suggestionList,
  submitSuggestion,
}: Props) {
  const [suggestions, setSuggestions] = useState(suggestionList);
  return (
    <div className="h-full flex flex-col flex-wrap content-start">
      {suggestions.slice(0, 8).map((suggestion, index) => (
        <Button
          onClick={() => {
            submitSuggestion(suggestion);
            setSuggestions(
              suggestions.filter(
                (suggestionItem) => suggestionItem !== suggestion
              )
            );
          }}
          text={suggestion}
          key={index}
          classname="mr-4 mb-2 min-w-32 max-w-40 rounded-3xl"
        />
      ))}
    </div>
  );
}
