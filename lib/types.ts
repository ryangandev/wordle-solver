export type WordleSize = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ValidLetterState = {
  correct: string[];
  misplaced: string[];
};

export type LetterFrequency = Map<string, number>;
export type PositionFrequency = Map<number, LetterFrequency>;
