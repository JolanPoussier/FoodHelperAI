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
  const [unitySelection, setUnitySelection] = useState("-");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleUnitySelection = (unity: string) => {
    setState({ ...state, quantityUnit: unity });
  };

  // Fermer le menu si on clique à l'extérieur de celui-ci
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
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {state.quantityUnit == "" ? "-" : state.quantityUnit}
        {/* <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        /> */}
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-15 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              onClick={() => handleUnitySelection("")}
              className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              -
            </button>
          </li>
          <li>
            <button
              onClick={() => handleUnitySelection("g")}
              className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              g
            </button>
          </li>
          <li>
            <button
              onClick={() => handleUnitySelection("cl")}
              className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              cl
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
