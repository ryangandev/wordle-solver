import words from 'an-array-of-english-words';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { MdOutlineBugReport, MdOutlineFeedback } from 'react-icons/md';

import { WordleSize } from '@/lib/types';

export const getWordsBySize = (size: WordleSize) => {
  return words.filter((word) => word.length === size);
};

export const wordleSizes: WordleSize[] = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

export const footerLinks = [
  {
    name: 'View on GitHub',
    url: 'https://github.com/ryangandev/wordle-solver',
    icon: React.createElement(AiFillGithub),
  },
  {
    name: 'Report an issue',
    url: 'https://forms.gle/XsZ5dpUzrhgUDQXV7',
    icon: React.createElement(MdOutlineBugReport),
  },
  {
    name: 'Leave Feedback',
    url: 'https://forms.gle/UbZd8ZtdVyj4uyw77',
    icon: React.createElement(MdOutlineFeedback),
  },
];
