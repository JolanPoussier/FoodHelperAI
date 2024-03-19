import { errorState, state } from "../src/services/type";
import Input from "./input";

export default function TimeConstraintsInput({
  datasState,
  handleDataChange,
  errorState,
}: {
  datasState: state;
  handleDataChange: (data: string, section: string) => void;
  errorState: errorState;
}) {
  return (
    <div className="">
      <div>Temps de préparation</div>
      <div className="flex items-center">
        <Input
          classname="w-20 p-1 gap-4 rounded-md"
          section="cookingTime"
          placeholder="30"
          value={datasState.cookingTime}
          onChange={handleDataChange}
        />
        &nbsp;min
      </div>
    </div>
  );
}
