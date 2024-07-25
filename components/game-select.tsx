'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { wordleSizes } from '@/lib/data';
import { WordleSize } from '@/lib/types';

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
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-42 text-center">
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
