import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./button";
import { X } from "lucide-react";

export default function ModalDisplayRecipe({
  formattedRecipe,
  setisRecipeModalOpen,
  isRecipeModalOpen,
}: {
  formattedRecipe: string;
  setisRecipeModalOpen: Dispatch<SetStateAction<boolean>>;
  isRecipeModalOpen: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrolling = () => {
      document.body.style.overflow = isRecipeModalOpen ? "hidden" : "auto";
    };
    handleScrolling();
    window.addEventListener("scroll", handleScrolling);
    return () => {
      window.removeEventListener("scroll", handleScrolling);
      document.body.style.overflow = "auto";
    };
  }, [isRecipeModalOpen]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }
  }, [formattedRecipe]);

  const closeDropdown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;

    if (!target.closest || !target.closest("#dropdownDefaultButton")) {
      setisRecipeModalOpen(false);
    }
  };

  return (
    <div
      className={`${
        isRecipeModalOpen ? "z-1" : "hidden"
      } bg-black bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-full max-h-full`}
    >
      <div className="absolute z-2 w-full h-full" onClick={closeDropdown}></div>
      <Button
        text={<X className="h-12 w-12" />}
        classname="fixed top-2 left-2 md:left-10 lg:left-16 bg-transparent hover:bg-transparent"
        onClick={() => setisRecipeModalOpen(false)}
      />
      <div
        id="dropdown"
        ref={modalRef}
        className="absolute z-50 w-11/12 h-5/6 bg-white divide-y divide-gray-100 rounded-lg shadow w-15 dark:bg-gray-700 overflow-y-scroll"
      >
        <pre className="w-full whitespace-pre-wrap overflow-wrap-break-word p-6">
          <span
            className="block"
            dangerouslySetInnerHTML={{ __html: formattedRecipe }}
          />
        </pre>
      </div>
    </div>
  );
}
