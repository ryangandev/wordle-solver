'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WordleSize } from '@/lib/types';
import { wordleSizes } from '@/lib/data';

type GameSelectProps = {
  wordleSize: WordleSize;
  setWordleSize: Dispatch<SetStateAction<WordleSize>>;
};

const GameSelect: React.FC<GameSelectProps> = ({
  wordleSize,
  setWordleSize,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-fit shadow-md">
          {wordleSize} Letter Word
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-center">
        <DropdownMenuLabel>Choose Wordle Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {wordleSizes.map((size) => (
          <DropdownMenuItem
            key={size}
            className="flex select-none justify-center"
            onClick={() => setWordleSize(size)}
          >
            {size} Letter Word
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GameSelect;
