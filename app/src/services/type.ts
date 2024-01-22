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
    equipment: string;
    quantityNumber: string;
    quantityUnit: string;
    kitchenEquipmentList: string[];
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
  equipment: string;
  quantityNumber: string;
  quantityUnit: string;
  kitchenEquipmentList: string[];
};
