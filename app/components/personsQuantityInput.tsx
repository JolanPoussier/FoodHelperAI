import { errorState, state } from "../src/services/type";
import Input from "./input";

export default function PersonsQuantityInput({
  datasState,
  handleDataChange,
  errorState,
}: {
  datasState: state;
  handleDataChange: (data: string, section: string) => void;
  errorState: errorState;
}) {
  return (
    <div className="w-56 mb-4 lg:mb-0">
      <div>Pour</div>
      <div className="flex content-start">
        <Input
          classname="w-20 p-1 rounded-md flex flex-col"
          section="persons"
          placeholder="2"
          value={datasState.persons}
          onChange={handleDataChange}
          errorMessage={errorState.persons ? "A remplir" : ""}
        />
        &nbsp;personne(s)
      </div>
    </div>
  );
}
