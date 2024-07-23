'use client';

import React, { useEffect, useMemo, useState } from 'react';

import GameSelect from '@/components/game-select';
import GridInput from '@/components/grid-input';
import Results from '@/components/results';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getWordsBySize } from '@/lib/data';
import { LetterState, WordleSize } from '@/lib/types';
import { PlusCircledIcon } from '@radix-ui/react-icons';

const WordleSolver = () => {
  const [wordleSize, setWordleSize] = useState<WordleSize>(5);
  const [letterState, setLetterState] = useState<LetterState>({
    correct: Array(wordleSize).fill(''),
    misplaced: Array(wordleSize).fill(''),
    invalid: Array(wordleSize).fill(''),
  });
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const wordBank = useMemo(() => getWordsBySize(wordleSize), [wordleSize]);

  useEffect(() => {
    setLetterState({
      correct: Array(wordleSize).fill(''),
      misplaced: Array(wordleSize).fill(''),
      invalid: Array(wordleSize).fill(''),
    });
    setPossibleWords([]);
  }, [wordleSize]);

  const isLetterStateModified = !(
    letterState.correct.every((letter) => letter === '') &&
    letterState.misplaced.every((letter) => letter === '') &&
    letterState.invalid.every((letter) => letter === '')
  );

  // Get filtered words based on letterState
  const getFilteredWords = async () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        // Turn invalid letters array into a set for O(1) lookups
        const invalidLettersSet = new Set(
          letterState.invalid.filter((letter) => letter !== ''),
        );

        const filteredWords = wordBank.filter((word) => {
          // Check for correct letters
          for (let i = 0; i < wordleSize; i++) {
            const correctLetter = letterState.correct[i];
            if (correctLetter && word[i] !== correctLetter) {
              return false;
            }
          }

          // Check for misplaced letters
          for (let i = 0; i < wordleSize; i++) {
            const misplacedLetter = letterState.misplaced[i];
            if (misplacedLetter) {
              if (
                !word.includes(misplacedLetter) ||
                word[i] === misplacedLetter
              ) {
                return false;
              }
            }
          }

          // Check for invalid letters
          for (const letter of word) {
            if (invalidLettersSet.has(letter)) {
              return false;
            }
          }

          return true;
        });

        resolve(filteredWords);
      }, 0);
    });
  };

  const handleSolve = async () => {
    setPossibleWords([]);
    setIsLoading(true);

    try {
      const filteredWords = await getFilteredWords();
      setPossibleWords(filteredWords);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLetterState({
      correct: Array(wordleSize).fill(''),
      misplaced: Array(wordleSize).fill(''),
      invalid: Array(wordleSize).fill(''),
    });
    setPossibleWords([]);
  };

  return (
    <section className="flex w-full max-w-3xl flex-col items-center space-y-4">
      <Card className="w-fit min-w-96 rounded-sm p-2">
        <CardHeader>
          <GameSelect wordleSize={wordleSize} setWordleSize={setWordleSize} />
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="space-y-3">
            <Badge className="bg-green-700" variant={'custom'} size={'md'}>
              Correct Letters
            </Badge>
            <GridInput
              letterInputs={letterState.correct}
              onInputChange={(correctInputs: string[]) => {
                setLetterState((prev) => ({
                  ...prev,
                  correct: correctInputs,
                }));
              }}
              inputBackgroundColor="bg-green-700"
            />
          </div>
          <div className="space-y-3">
            <Badge className="bg-yellow-500" variant={'custom'} size={'md'}>
              Misplaced Letters
            </Badge>
            <GridInput
              letterInputs={letterState.misplaced}
              onInputChange={(newInputs: string[]) => {
                setLetterState((prev) => ({
                  ...prev,
                  misplaced: newInputs,
                }));
              }}
              inputBackgroundColor="bg-yellow-500"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Badge className="w-fit bg-gray-500" variant={'custom'} size={'md'}>
              Invalid Letters
            </Badge>
            <GridInput
              letterInputs={letterState.invalid}
              onInputChange={(newInputs: string[]) => {
                setLetterState((prev) => ({
                  ...prev,
                  invalid: newInputs,
                }));
              }}
              inputBackgroundColor="bg-gray-500"
            />
            <small className="mx-auto flex cursor-pointer flex-row items-center hover:opacity-70">
              <PlusCircledIcon className="mr-1.5" />
              Add More
            </small>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="w-fit"
            onClick={handleClear}
            disabled={isLetterStateModified}
            variant="default"
          >
            Clear
          </Button>
          <Button className="w-fit" onClick={handleSolve} disabled={false}>
            Make Guesses
          </Button>
        </CardFooter>
      </Card>
      <Results results={possibleWords} isLoading={isLoading} />
    </section>
  );
};

export default WordleSolver;
