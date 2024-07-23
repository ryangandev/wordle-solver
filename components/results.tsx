import React from 'react';

type ResultsProps = {
  results: string[];
  isLoading: boolean;
};

const Results: React.FC<ResultsProps> = ({ results, isLoading }) => {
  return (
    <section className="w-full space-y-4">
      {isLoading && <p>Loading...</p>}
      <h4>We found {results.length} results</h4>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {results.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded bg-gray-100 p-2 font-semibold uppercase tracking-wide"
          >
            {word}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Results;
