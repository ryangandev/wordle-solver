import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { LetterFrequency, PositionFrequency } from '@/lib/types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const deepCopy = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

// Get letter frequencies and position frequencies, which gives higher scores to words that not only contain frequent letters but also have those letters in frequently occurring positions
export const getFrequencies = (
  words: string[],
): [LetterFrequency, PositionFrequency] => {
  const letterFreq: LetterFrequency = new Map();
  const positionFreq: PositionFrequency = new Map();

  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      // Overall letter frequency
      letterFreq.set(letter, (letterFreq.get(letter) || 0) + 1);

      // Position-based frequency
      if (!positionFreq.has(i)) {
        positionFreq.set(i, new Map());
      }

      const posFreq = positionFreq.get(i)!;
      posFreq.set(letter, (posFreq.get(letter) || 0) + 1);
    }
  }

  return [letterFreq, positionFreq];
};

// Score a word based on letter frequencies and position frequencies
export const scoreWord = (
  word: string,
  letterFreq: LetterFrequency,
  positionFreq: PositionFrequency,
): number => {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    // Combine overall and position-based frequencies
    score +=
      (letterFreq.get(letter) || 0) + (positionFreq.get(i)?.get(letter) || 0);
  }
  return score;
};
