import { useState } from "react";
import { setState, state } from "../src/services/type";

export default function MyDropdown({
  setState,
  state,
}: {
  setState: setState;
  state: state;
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const unityTab = ["-", "g", "kg", "ml", "L"];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleUnitySelection = (unity: string) => {
    setState({ ...state, quantityUnit: unity === "-" ? "" : unity });
  };

  const closeDropdown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;

    if (!target.closest || !target.closest("#dropdownDefaultButton")) {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="absolute inline-block text-left" onClick={closeDropdown}>
      <div
        className={`${
          isDropdownOpen ? "z-1" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      ></div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-gray-800 bg-gray-300 hover:bg-gray-500 focus:ring-gray-400 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center"
        type="button"
      >
        {state.quantityUnit == "" ? "-" : state.quantityUnit}
      </button>

      <div
        id="dropdown"
        className={`z-50 absolute ${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-15 dark:bg-gray-500`}
      >
        <ul
          className="py-2 text-sm text-gray-500 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {unityTab.map((unity, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleUnitySelection(unity)}
                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {unity}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
