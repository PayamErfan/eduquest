"use client";

import React, { useState, useEffect } from 'react';

// Define the types for the continent images and question
type Continent = 'Africa' | 'Asia' | 'Europe' | 'NorthAmerica' | 'SouthAmerica' | 'Antarctica' | 'Australia';

interface Question {
  correctAnswer: Continent;
  choices: Continent[];
}

// Sample continent images (ensure these images are in the public folder)
const continentImages: Record<Continent, string> = {
  Africa: 'Africa.png',
  Asia: 'Asia.png',
  Europe: 'Europe.png',
  NorthAmerica: 'North_America.png',
  SouthAmerica: 'South_America.png',
  Antarctica: 'Antarctica.png',
  Australia: 'Oceania.png',
};

// The structure of the game question
const generateQuestion = (): Question => {
  const continents: Continent[] = Object.keys(continentImages) as Continent[];
  const correctAnswer: Continent = continents[Math.floor(Math.random() * continents.length)];
  const shuffledChoices = shuffleArray(continents);
  return {
    correctAnswer,
    choices: shuffledChoices.slice(0, 4),
  };
};

// Shuffle array function to randomize choices
const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Check the answer
  const handleAnswer = (answer: Continent): void => {
    if (answer === question.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
    } else {
      setMessage('Try Again!');
    }
    setSelectedAnswer(answer);
    setTimeout(() => {
      setQuestion(generateQuestion());
      setSelectedAnswer(null);
      setMessage('');
      setTimer(30);
    }, 2000);
  };

  return (
    <div className="game">
      <h1>Map Game</h1>
      <div className="question">
        <img
          src={process.env.PUBLIC_URL + `/${continentImages[question.correctAnswer]}`}
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
              style={{
                backgroundColor: selectedAnswer === choice
                  ? (choice === question.correctAnswer ? 'green' : 'red')
                  : 'white',
              }}
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
};

export default MapGame;
