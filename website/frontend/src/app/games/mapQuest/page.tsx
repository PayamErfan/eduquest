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

// Shuffle array
const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const continents: Continent[] = ['Africa', 'Asia', 'Europe', 'NorthAmerica', 'SouthAmerica', 'Antarctica', 'Australia'];
  const [usedContinents, setUsedContinents] = useState<Continent[]>([]); // Track used continents
  const [question, setQuestion] = useState<Question | null>(null); // Current question
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false); // Track game over status

  // Generate a random question from remaining continents
  const generateQuestion = (): Question => {
    // Filter out used continents
    const remainingContinents = continents.filter(continent => !usedContinents.includes(continent));
    if (remainingContinents.length === 0) {
      setGameOver(true); // End the game if all continents have been used
      return { correctAnswer: 'Africa', choices: [] }; // Placeholder to trigger game over
    }

    // Pick a random continent from the remaining ones
    const correctAnswer = remainingContinents[Math.floor(Math.random() * remainingContinents.length)];

    // Create choices, ensuring the correct answer is included
    const otherChoices = continents.filter(continent => continent !== correctAnswer);
    const shuffledOtherChoices = shuffleArray(otherChoices).slice(0, 3); // Pick 3 wrong choices

    const choices = [correctAnswer, ...shuffledOtherChoices]; // Ensure the correct answer is included
    return {
      correctAnswer,
      choices: shuffleArray(choices), // Shuffle the choices
    };
  };

  // Generate the first question after the component has mounted
  useEffect(() => {
    if (!gameOver) {
      setQuestion(generateQuestion());
    }
  }, [usedContinents, gameOver]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleTimerEnd();
    }
  }, [timer, gameOver]);

  // Handle the player's answer
  const handleAnswer = (answer: Continent): void => {
    if (answer === question?.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
    } else {
      setMessage('Try Again!');
    }
    setSelectedAnswer(answer);
    setUsedContinents((prev) => [...prev, question?.correctAnswer!]); // Mark this continent as used

    // Move to the next question after 2 seconds
    setTimeout(() => {
      if (!gameOver) {
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
