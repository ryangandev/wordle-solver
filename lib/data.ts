import words from "an-array-of-english-words";

import { Letter, WordleSize } from "@/lib/types";

export const getWordsBySize = (size: WordleSize) => {
  return words.filter((word) => word.length === size);
};

export const alphabetLetters: Letter[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const wordleSizes: WordleSize[] = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;
