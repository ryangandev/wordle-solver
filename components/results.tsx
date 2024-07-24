import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ResultsProps = {
  results: string[];
  isLoading: boolean;
  currentResultPage: number;
  setCurrentResultPage: React.Dispatch<React.SetStateAction<number>>;
};

const Results: React.FC<ResultsProps> = ({
  results,
  isLoading,
  currentResultPage,
  setCurrentResultPage,
}) => {
  const wordsPerPage = 50;

  const hasMore = results.length > currentResultPage * wordsPerPage;

  const handleLoadMore = () => {
    setCurrentResultPage((prev) => prev + 1);
  };

  return (
    <Card className="w-full rounded">
      {isLoading && <p>Loading...</p>}
      <CardHeader className="py-4">
        <h4>We found {results.length} results</h4>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {results
          .slice(0, currentResultPage * wordsPerPage)
          .map((word, index) => (
            <Badge
              key={index}
              variant={'outline'}
              size={'md'}
              className="justify-center rounded px-2 py-1.5 font-semibold uppercase tracking-wide"
            >
              {word}
            </Badge>
          ))}
      </CardContent>
      {hasMore && (
        <CardFooter className="flex justify-center">
          <Button
            variant={'ghost'}
            className="font-bold text-blue-400"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Results;
