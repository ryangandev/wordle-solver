export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
export type WordleSize = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type LetterState = {
  correct: string[];
  misplaced: string[];
  invalid: string[];
};
