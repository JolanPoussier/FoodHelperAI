import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  text: ReactNode;
  classname?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  id?: string;
};

export default function Button({ text, onClick, classname, type, id }: Props) {
  return (
    <button
      type={type ? type : undefined}
      onClick={() => onClick?.()}
      className={`bg-accent hover:bg-accentHover focus:ring-blue-800 focus:outline-none p-1 text-white shadow-md ${classname}`}
      data-testid={id ? id : null}
    >
      {text}
    </button>
  );
}
