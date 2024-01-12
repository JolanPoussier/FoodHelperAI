import { SetStateAction } from "react";

export type setState = (
  value: SetStateAction<{
    persons: string;
    ingredientList: {
      quantity: string;
      ingredient: string;
    }[];
    cookingTime: string;
    ingredient: string;
    quantityNumber: string;
    quantityUnit: string;
  }>
) => void;

export type state = {
  persons: string;
  ingredientList: {
    quantity: string;
    ingredient: string;
  }[];
  cookingTime: string;
  ingredient: string;
  quantityNumber: string;
  quantityUnit: string;
};
