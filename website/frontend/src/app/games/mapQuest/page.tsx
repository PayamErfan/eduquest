"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from './answer_box';
import './map_game.css';

type Continent = 'Africa' | 'Asia' | 'Europe' | 'NorthAmerica' | 'SouthAmerica' | 'Antarctica' | 'Australia';

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
  Antarctica: '/mapQuest_images/Continents/Antartica.png',
  Australia: '/mapQuest_images/Continents/Oceania.png',
};

const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const continents: Continent[] = ['Africa', 'Asia', 'Europe', 'NorthAmerica', 'SouthAmerica', 'Antarctica', 'Australia'];
  const [usedContinents, setUsedContinents] = useState<Continent[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  
  const generateQuestion = (): Question | null => {
    const remainingContinents = continents.filter(continent => !usedContinents.includes(continent));
    if (remainingContinents.length === 0) {
      setGameOver(true);
      //handleGameOver();
      return null;
    }

    const correctAnswer = remainingContinents[Math.floor(Math.random() * remainingContinents.length)];
    const otherChoices = continents.filter(continent => continent !== correctAnswer);
    const shuffledChoices = shuffleArray([correctAnswer, ...otherChoices.slice(0, 3)]);
    return { correctAnswer, choices: shuffledChoices };
  };

  const updateQuestion = () => {
    if (gameOver) handleGameOver();
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
    if (gameOver) handleGameOver();
    setMessage('Time is up! Moving to the next question.');
    setSelectedAnswer(question!.correctAnswer);
    setUsedContinents((prev) => [...prev, question!.correctAnswer]);

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage('');
      updateQuestion();
      setTimer(10);
    }, 2000);
  };

  if(gameOver) {
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Final Score: {score}</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  
}


  if (!question) return <div>Loading...</div>;

  return (
    <div className="game bg-blue-500 text-black">
      <h1>Map Game</h1>
      <div className="question">
        <img src={continentImages[question.correctAnswer]} alt={question.correctAnswer} width="400" />
        <h2>Which continent is this?</h2>
        <div className="grid-container">
          {question.choices.map((choice, index) => (
            <AnswerBox
              key={index}
              text={choice}
              isSelected={selectedAnswer === choice}
              onSelect={() => handleAnswer(choice)}
              className={
                selectedAnswer === choice && choice === question.correctAnswer
                  ? "correct-answer"
                  : selectedAnswer === choice
                  ? "incorrect-answer"
                  : "default-answer"
              }
            />
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
