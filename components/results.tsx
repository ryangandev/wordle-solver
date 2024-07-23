import React from 'react';

type ResultsProps = {
  results: string[];
  isLoading: boolean;
};

const Results: React.FC<ResultsProps> = ({ results, isLoading }) => {
  return (
    <section className="w-full">
      <h4>Tips for Solving Wordles</h4>
      {isLoading && <p>Loading...</p>}
      <p>We found {results.length} results</p>
      <div className="flex flex-wrap space-x-2">
        {results.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </section>
  );
};

export default Results;
