"use client";

import React, { useState, useEffect } from 'react';

// Define the types for the continent images and question
type Continent = 'Africa' | 'Asia' | 'Europe' | 'NorthAmerica' | 'SouthAmerica' | 'Antarctica' | 'Australia';

interface Question {
  correctAnswer: Continent;
  choices: Continent[];
}

// Continent images
const continentImages: Record<Continent, string> = {
  Africa: 'mapQuest_images/Continents/Africa.png',
  Asia: 'mapQuest_images/Continents/Asia.png',
  Europe: 'mapQuest_images/Continents/Europe.png',
  NorthAmerica: 'mapQuest_images/Continents/North_America.svg',
  SouthAmerica: 'mapQuest_images/Continents/South_America.png',
  Antarctica: 'mapQuest_images/Continents/Antartica.png',
  Australia: 'mapQuest_images/Continents/Oceania.png',
};

// Generate a random question
const generateQuestion = (): Question => {
  const continents = Object.keys(continentImages) as Continent[]; // Explicitly cast keys as Continent[]
  const correctAnswer = continents[Math.floor(Math.random() * continents.length)];
  const newArray = continents.filter(item => item !== correctAnswer)
  const shuffledChoices = shuffleArray(newArray);
  return {
    correctAnswer,
    choices: shuffledChoices.slice(0, 3).concat(correctAnswer),
  };
};

// Shuffle array
const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null); // Initialize as null
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);

  // Generate the first question after the component has mounted
  useEffect(() => {
    setQuestion(generateQuestion());
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleTimerEnd();
    }
  }, [timer]);

  // Handle the player's answer
  const handleAnswer = (answer: Continent): void => {
    if (answer === question?.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
      setSelectedAnswer(answer);

      setTimeout(() => {
        setQuestion(generateQuestion());
        setSelectedAnswer(null);
        setMessage('');
        setTimer(10);
      }, 2000);
      
    } else {
      setMessage('Try Again!');
      setSelectedAnswer(answer);

      setTimeout(() => {
        setSelectedAnswer(null);
        setMessage('');
      }, 2000);
    }
  };

  const handleTimerEnd = () => {
    setMessage('Time Out!');
    setSelectedAnswer(question!.correctAnswer);

    setTimeout(() => {
      setQuestion(generateQuestion());
      setSelectedAnswer(null);
      setMessage('');
      setTimer(10);
    }, 2000);
  };

  // If the question is still null (loading), show a fallback
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game">
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
              style={{
                backgroundColor:
                  selectedAnswer === choice
                    ? choice === question.correctAnswer
                      ? 'green'
                      : 'red'
                    : 'black',
              }}
            >
              {choice}
            </button>
          ))
          }
        </div>
        <p>{message}</p>
        <p>Time left: {timer}s</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default MapGame;
