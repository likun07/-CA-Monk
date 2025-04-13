import { useEffect, useState } from 'react';

interface Question {
  id: number;
  sentence: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  { id: 1, sentence: "The sky is ___", options: ["blue", "green", "red", "yellow"], answer: "blue" },
  { id: 2, sentence: "Grass is ___", options: ["blue", "green", "brown", "white"], answer: "green" }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState(30);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  const handleSelect = (word: string) => {
    setSelected(word);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setTime(30);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Finished!</h1>
        <p className="text-xl">Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-xl font-bold mb-4">Time Left: {time}s</div>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {questions[current].sentence.replace("___", selected || "___")}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {questions[current].options.map((word) => (
            <button
              key={word}
              onClick={() => handleSelect(word)}
              className={`p-2 border rounded ${selected === word ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {word}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;