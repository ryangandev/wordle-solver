'use client';

import React, { useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import { cn } from '@/lib/utils';

type GridInputProps = {
  letterInputs: string[];
  onInputChange: (newInputs: string[]) => void;
  inputBackgroundColor?: string;
};

const GridInput: React.FC<GridInputProps> = ({
  letterInputs,
  onInputChange,
  inputBackgroundColor = 'transparent',
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z]$/.test(value) && value !== '') return;

    const newInputs = [...letterInputs];
    newInputs[index] = value;
    onInputChange(newInputs);

    // Focus next input
    if (value !== '' && index < letterInputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && letterInputs[index] === '') {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < letterInputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-1.5">
      {letterInputs.map((letter, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className={cn(
            'flex h-12 w-12 items-center justify-center border border-gray-400 text-center text-2xl font-bold uppercase text-primary-foreground caret-black',
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
};

export default GridInput;
