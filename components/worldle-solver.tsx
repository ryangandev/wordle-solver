'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { TrashIcon } from '@radix-ui/react-icons';

import GameSelect from '@/components/game-select';
import GridInput from '@/components/grid-input';
import Results from '@/components/results';
import { ThemeSwitch } from '@/components/theme-switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getWordsBySize } from '@/lib/data';
import { ValidLetterState, WordleSize } from '@/lib/types';
import Instruction from './instruction';

const WordleSolver = () => {
  const [wordleSize, setWordleSize] = useState<WordleSize>(5);
  const [validLetterState, setValidLetterState] = useState<ValidLetterState>({
    correct: Array(wordleSize).fill(''),
    misplaced: Array(wordleSize).fill(''),
  });
  const [invalidLetterState, setInvalidLetterState] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentResultPage, setCurrentResultPage] = useState<number>(1);

  const wordBank = useMemo(() => getWordsBySize(wordleSize), [wordleSize]);

  // Reset all letter states
  const handleReset = useCallback(() => {
    setValidLetterState({
      correct: Array(wordleSize).fill(''),
      misplaced: Array(wordleSize).fill(''),
    });
    setInvalidLetterState('');
    setPossibleWords([]);
    setErrorMsg('');
    setCurrentResultPage(1);
  }, [wordleSize]);

  useEffect(() => {
    handleReset();
  }, [handleReset, wordleSize]);

  const isLetterStateModified = !(
    validLetterState.correct.every((letter) => letter === '') &&
    validLetterState.misplaced.every((letter) => letter === '') &&
    invalidLetterState === ''
  );

  // Handle letter state changes based on type
  const handleValidLetterStateChange = useCallback(
    (type: 'correct' | 'misplaced', index: number, value: string): boolean => {
      setErrorMsg('');
      if (!/^[a-zA-Z]$/.test(value) && value !== '') return false;

      const lowerCaseValue = value.toLowerCase();
      if (
        lowerCaseValue !== '' &&
        invalidLetterState.includes(lowerCaseValue)
      ) {
        setErrorMsg(
          `You can't put "${lowerCaseValue.toUpperCase()}" in GOOD and BAD spots at the same time`,
        );
        return false;
      }

      setValidLetterState((prev) => {
        const newState = {
          correct: [...prev.correct],
          misplaced: [...prev.misplaced],
        };

        newState[type][index] = lowerCaseValue;

        const oppositeType = type === 'correct' ? 'misplaced' : 'correct';
        if (
          lowerCaseValue === prev[oppositeType][index] &&
          lowerCaseValue !== ''
        ) {
          newState[oppositeType][index] = '';
        }

        return newState;
      });

      return true;
    },
    [invalidLetterState],
  );

  // On change function for correct letter state, variants of handleValidLetterStateChange
  const handleCorrectLetterStateChange = useCallback(
    (index: number, value: string): boolean => {
      return handleValidLetterStateChange('correct', index, value);
    },
    [handleValidLetterStateChange],
  );

  // On change function for misplaced letter state, variants of handleValidLetterStateChange
  const handleMisplacedLetterStateChange = useCallback(
    (index: number, value: string): boolean => {
      return handleValidLetterStateChange('misplaced', index, value);
    },
    [handleValidLetterStateChange],
  );

  const handleInvalidLetterStateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrorMsg('');
    const newInput = event.target.value.toLowerCase().replace(/[^a-z]/g, '');

    // Check for duplicates within the new input
    if (new Set(newInput).size !== newInput.length) {
      setErrorMsg(`You can't add the same letter twice`);
      return;
    }

    // Check if any character in the new input is already in correct or misplaced arrays
    const allValidLetters = new Set(
      [...validLetterState.correct, ...validLetterState.misplaced].filter(
        (char) => char !== '',
      ),
    );
    for (const char of newInput) {
      if (allValidLetters.has(char)) {
        setErrorMsg(
          `You can't put "${char.toUpperCase()}" in GOOD and BAD spots at the same time`,
        );
        return;
      }
    }

    setInvalidLetterState(newInput);
  };

  // Clear letters based on type
  const handleClearletters = (type: 'correct' | 'misplaced' | 'invalid') => {
    if (type === 'invalid') {
      setInvalidLetterState('');
    } else {
      setValidLetterState((prev) => ({
        ...prev,
        [type]: Array(wordleSize).fill(''),
      }));
    }
  };

  // Get filtered words based on letterState
  const getFilteredWords = useCallback(async () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        // Turn invalid letters array into a set for O(1) lookups
        const invalidLettersSet = new Set(invalidLetterState);

        const filteredWords = wordBank.filter((word) => {
          // Check for correct letters
          for (let i = 0; i < wordleSize; i++) {
            const correctLetter = validLetterState.correct[i];
            if (correctLetter && word[i] !== correctLetter) {
              return false;
            }
          }

          // Check for misplaced letters
          for (let i = 0; i < wordleSize; i++) {
            const misplacedLetter = validLetterState.misplaced[i];
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
      }, 250);
    });
  }, [
    invalidLetterState,
    validLetterState.correct,
    validLetterState.misplaced,
    wordBank,
    wordleSize,
  ]);

  // Solve handler function
  const handleSolve = async () => {
    if (!isLetterStateModified) {
      toast.warning('Enter at least one letter to start!');
      return;
    }

    setPossibleWords([]);
    setCurrentResultPage(1);
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

  return (
    <section className="flex w-full max-w-3xl flex-col items-center space-y-4">
      <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* <Card className="flex w-[350px] flex-col items-center rounded p-2 sm:w-[384px] sm:min-w-[384px]"> */}
        <Card className="flex w-full flex-col items-center rounded p-2">
          <CardHeader className="w-full">
            <div className="flex w-full items-center justify-between">
              <GameSelect
                wordleSize={wordleSize}
                setWordleSize={setWordleSize}
              />
              <ThemeSwitch />
            </div>
          </CardHeader>
          <CardContent className="flex w-full flex-col space-y-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center rounded border bg-green-700" />
                <span className="font-semibold">Correct Letters</span>
                <ClearIconButton
                  onClick={() => handleClearletters('correct')}
                />
              </div>
              <GridInput
                letterInputs={validLetterState.correct}
                onInputChange={handleCorrectLetterStateChange}
                inputBackgroundColor="bg-green-700"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center rounded border bg-yellow-500" />
                <span className="font-semibold">Misplaced Letters</span>
                <ClearIconButton
                  onClick={() => handleClearletters('misplaced')}
                />
              </div>
              <GridInput
                letterInputs={validLetterState.misplaced}
                onInputChange={handleMisplacedLetterStateChange}
                inputBackgroundColor="bg-yellow-500"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center rounded border bg-gray-500" />
                <span className="font-semibold">Invalid Letters</span>
                <ClearIconButton
                  onClick={() => handleClearletters('invalid')}
                />
              </div>
              <Input
                className="h-10 w-full text-base font-bold uppercase tracking-widest"
                value={invalidLetterState}
                onChange={handleInvalidLetterStateChange}
                maxLength={26}
              />
            </div>
            {errorMsg && (
              <Alert
                variant={'destructive'}
                className="rounded bg-destructive/10 py-2 text-red-800"
              >
                <AlertDescription className="flex items-center text-xs font-semibold">
                  <span className="mr-2">
                    <IoWarningOutline className="h-4 w-4" />
                  </span>
                  <span>{errorMsg}</span>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex w-full justify-between">
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={!isLetterStateModified && !possibleWords.length}
            >
              Reset
            </Button>
            <Button onClick={handleSolve} disabled={false}>
              Solve
            </Button>
          </CardFooter>
        </Card>
        <Instruction />
      </div>
      <Results
        results={possibleWords}
        isLoading={isLoading}
        currentResultPage={currentResultPage}
        setCurrentResultPage={setCurrentResultPage}
      />
    </section>
  );
};

export default WordleSolver;

const ClearIconButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="ml-auto cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-200"
      onClick={onClick}
    >
      <TrashIcon />
    </button>
  );
};
