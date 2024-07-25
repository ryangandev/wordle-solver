import React from 'react';

import WordleSolver from '@/components/worldle-solver';

const Home = () => {
  return (
    <main
      className="mb-8 flex min-w-[350px] flex-col items-center space-y-4 p-3 sm:p-4 md:space-y-8"
      style={{
        minHeight: 'calc(100vh - 135px)',
      }}
    >
      <h1 className="mt-4">Wordle Solver</h1>
      <WordleSolver />
    </main>
  );
};

export default Home;
