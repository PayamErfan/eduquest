'use client';

import React, { useState, useEffect } from 'react';
import AnswerBox from './answer_box';
import './map_game.css';

// Define the types for the continent images and question
type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'NorthAmerica'
  | 'SouthAmerica'
  | 'Antarctica'
  | 'Australia';

interface Question {
  correctAnswer: Continent;
  choices: Continent[];
}

const continentImages: Record<Continent, string> = {
  Africa: '/mapQuest_images/Continents/Africa.png',
  Asia: '/mapQuest_images/Continents/Asia.png',
  Europe: '/mapQuest_images/Continents/Europe.png',
  NorthAmerica: '/mapQuest_images/Continents/North_America.svg',
  SouthAmerica: '/mapQuest_images/Continents/South_America.png',
  Antarctica: '/mapQuest_images/Continents/Antarctica.png',
  Australia: '/mapQuest_images/Continents/Oceania.png',
};

const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const continents: Continent[] = [
    'Africa',
    'Asia',
    'Europe',
    'NorthAmerica',
    'SouthAmerica',
    'Antarctica',
    'Australia',
  ];
  const [usedContinents, setUsedContinents] = useState<Continent[]>([]); // Track used continents
  const [question, setQuestion] = useState<Question | null>(null); // Current question
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Generate a random question from remaining continents
  const generateQuestion = (): Question => {
    // Filter out used continents
    const remainingContinents = continents.filter(
      (continent) => !usedContinents.includes(continent)
    );
    if (remainingContinents.length === 0) {
      setGameOver(true);
      return null;
    }

    // Pick a random continent from the remaining ones
    const correctAnswer =
      remainingContinents[
        Math.floor(Math.random() * remainingContinents.length)
      ];

    // Create choices, ensuring the correct answer is included
    const otherChoices = continents.filter(
      (continent) => continent !== correctAnswer
    );
    const shuffledOtherChoices = shuffleArray(otherChoices).slice(0, 3); // Pick 3 wrong choices

    const choices = [correctAnswer, ...shuffledOtherChoices]; // Ensure the correct answer is included
    return {
      correctAnswer,
      choices: shuffleArray(choices), // Shuffle the choices
    };
  };

  const updateQuestion = () => {
    const newQuestion = generateQuestion();
    if (newQuestion) {
      setQuestion(newQuestion);
    }
  };

  useEffect(() => {
    updateQuestion();
  }, []);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleTimerEnd();
    }
  }, [timer, gameOver]);

  const handleAnswer = (answer: Continent) => {
    if (answer === question?.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
      setSelectedAnswer(answer);
      setUsedContinents((prev) => [...prev, question.correctAnswer]);

      setTimeout(() => {
        setSelectedAnswer(null);
        setMessage('');
        updateQuestion();
        setTimer(10);
      } else {
        setMessage('Try Again!');
        setSelectedAnswer(answer);
      }
    }, 2000);

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage('');
    }, 2000);
  };

  const handleTimerEnd = () => {
    setMessage('Time is up! Moving to the next question.');
    setUsedContinents((prev) => [...prev, question!.correctAnswer]);

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage('');
      updateQuestion();
      setTimer(10);
    }, 2000);
  };

  // If the question is still null (loading), show a fallback
  if (!question) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="game bg-blue-500 text-black">
        <h1>Map Game</h1>
        <div className="question">
          <img
            src={`/${continentImages[question.correctAnswer]}`}
            alt={question.correctAnswer}
            width="400"
          />
          <h2>Which continent is this?</h2>
          <div className="choices">
            {question.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                disabled={selectedAnswer !== null}
                className={`${
                  selectedAnswer === choice
                    ? choice === question.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-white'
                } text-black py-2 px-4 rounded`}
              >
                {choice}
              </button>
            ))}
          </div>
          <p>{message}</p>
          <p>Time left: {timer}s</p>
          <p>Score: {score}</p>
        </div>
      </div>
    );
  }
};

export default MapGame;
