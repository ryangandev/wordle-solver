import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const deepCopy = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
