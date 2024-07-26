'use client';

import React, { useRef, ChangeEvent, KeyboardEvent, memo } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type GridInputProps = {
  letterInputs: string[];
  onInputChange: (index: number, value: string) => boolean;
  inputBackgroundColor?: string;
  className?: string;
};

const GridInput: React.FC<GridInputProps> = memo(
  ({
    letterInputs,
    onInputChange,
    inputBackgroundColor = 'transparent',
    className,
  }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
      const result = onInputChange(index, value);

      // Focus next input
      if (result && value !== '' && index < letterInputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === 'Backspace' && index > 0 && letterInputs[index] === '') {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < letterInputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    return (
      <div
        className={cn(
          'grid auto-rows-max grid-cols-6 gap-1 sm:gap-1.5',
          className,
        )}
      >
        {letterInputs.map((letter, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-sm border border-gray-300 text-center text-2xl font-bold uppercase text-primary-foreground caret-black dark:border-gray-700 dark:caret-white sm:h-12 sm:w-12',
              letter && inputBackgroundColor,
              letter && 'border-none',
            )}
            value={letter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, index)
            }
            maxLength={1}
          />
        ))}
      </div>
    );
  },
);

GridInput.displayName = 'GridInput';

export default GridInput;
