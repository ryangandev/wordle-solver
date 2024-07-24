import WordleSolver from '@/components/worldle-solver';

const Home = () => {
  return (
    <main className="flex flex-col items-center space-y-8 p-3 sm:p-4">
      <h1 className="mt-4">Wordle Solver</h1>
      <WordleSolver />
    </main>
  );
};

export default Home;
