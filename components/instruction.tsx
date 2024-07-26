import React from 'react';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { RxRocket } from 'react-icons/rx';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Instruction = () => {
  return (
    <Card className="w-full rounded">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <RxRocket className="mr-2 h-4 w-4 text-red-600" />
          How to use
        </CardTitle>
        <CardDescription>
          Find potential Wordle solutions based on your game feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>Select the word length.</li>
          <li>
            Enter known information:
            <ul className="list-inside list-disc indent-4">
              <li>
                <span className="font-bold text-green-700 dark:text-green-500">
                  Green
                </span>{' '}
                letters in <b>Correct Letters</b>
              </li>
              <li>
                <span className="font-bold text-yellow-500 dark:text-yellow-400">
                  Yellow
                </span>{' '}
                letters in <b>Misplaced Letters</b>
              </li>
              <li>
                <span className="font-bold text-gray-500 dark:text-gray-400">
                  Grey
                </span>{' '}
                letters in <b>Invalid Letters</b>
              </li>
            </ul>
          </li>
          <li>
            Click{' '}
            <b>
              <i>Solve</i>
            </b>{' '}
            to see possible words.
          </li>
        </ol>
      </CardContent>
      <CardHeader className="pb-2 pt-0">
        <CardTitle className="flex items-center text-lg">
          <MdOutlineTipsAndUpdates className="mr-2 h-4 w-4 text-yellow-600" />
          Wordle Strategies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>
            Start with words containing common letters (<b>E</b>, <b>A</b>,{' '}
            <b>R</b>, <b>I</b>, <b>O</b>, <b>T</b>, <b>S</b>). Try <i>STARE</i>,{' '}
            <i>AUDIO</i>, <i>ROATE</i>, etc, to eliminate most words.
          </li>
          <li>
            For subsequent guesses, use unused letters to gather more
            information and narrow down possibilities.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Instruction;
