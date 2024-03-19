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

export type setErrorState = (
  value: SetStateAction<{
    persons: boolean;
    ingredient: boolean;
    ingredientList: boolean;
    equipment: boolean;
  }>
) => void;

export type errorState = {
  persons: boolean;
  ingredient: boolean;
  ingredientList: boolean;
  equipment: boolean;
};
