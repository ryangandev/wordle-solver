import Image from 'next/image';
import React, { Ref } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WordleSize } from '@/lib/types';
import { cn } from '@/lib/utils';
import '@/styles/loader.css';

type ResultsProps = {
  resultSectionRef: Ref<HTMLDivElement>;
  wordleSize: WordleSize;
  results: string[];
  isLoading: boolean;
  currentResultPage: number;
  setCurrentResultPage: React.Dispatch<React.SetStateAction<number>>;
  hasSearched: boolean;
};

const Results: React.FC<ResultsProps> = ({
  resultSectionRef,
  wordleSize,
  results,
  isLoading,
  currentResultPage,
  setCurrentResultPage,
  hasSearched,
}) => {
  const wordsPerPage = 200;

  const hasMore = results.length > currentResultPage * wordsPerPage;

  const handleLoadMore = () => {
    setCurrentResultPage((prev) => prev + 1);
  };

  const renderLoading = () => {
    return (
      <section className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="loader"></div>
        <span className="text-lg font-medium">Searching...</span>
      </section>
    );
  };

  const renderResultsNotFound = () => {
    return (
      <section className="flex flex-col items-center">
        <Image
          width={256}
          height={256}
          loading="lazy"
          alt="Not found"
          src="/static/not-found.svg"
          title="An image represent no content to show"
        />
        <p className="mt-2 text-center text-xl font-semibold">
          Sorry, we couldn&apos;t find any results
        </p>
      </section>
    );
  };

  const renderResults = () => {
    return (
      <>
        <h4 className="flex items-center">
          We found{' '}
          <span className={cn('mx-2 text-green-700')}>{results.length}</span>{' '}
          results
        </h4>
        <div
          className={cn(
            'grid gap-3',
            wordleSize > 7
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
          )}
        >
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
        </div>
        {hasMore && (
          <div className="flex justify-center">
            <Button
              aria-label={`Load more results. Currently showing ${currentResultPage * wordsPerPage} out of ${results.length} results.`}
              variant={'ghost'}
              className="font-bold"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </>
    );
  };

  if (!hasSearched) {
    return null;
  }

  return (
    <section
      ref={resultSectionRef}
      className="my-12 flex w-full flex-col space-y-4"
    >
      {isLoading
        ? renderLoading()
        : results.length === 0
          ? renderResultsNotFound()
          : renderResults()}
    </section>
  );
};

export default Results;
