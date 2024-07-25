import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const Instruction = () => {
  return (
    <Card className="w-full rounded">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How to use</CardTitle>
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
              <li>Green letters in Correct Letters</li>
              <li>Yellow letters in Correct Letters</li>
              <li>Grey letters in Correct Letters</li>
            </ul>
          </li>
          <li>Click Solve to see possible words.</li>
        </ol>
      </CardContent>
      <CardHeader className="pb-2 pt-0">
        <CardTitle className="text-lg">Wordle Strategies</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>
            Start with words containing common letters (<b>E</b>, <b>A</b>,{' '}
            <b>R</b>,<b>I</b>, <b>O</b>, <b>T</b>, <b>S</b>). Try <i>STARE</i>,{' '}
            <i>AUDIO</i>, <i>ROATE</i>, etc.
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
