"use client";

import React, { useState, useEffect } from "react";
import AnswerBox from "./answer_box";
import "./map_game.css";

type Continent =
  | "Africa"
  | "Asia"
  | "Europe"
  | "NorthAmerica"
  | "SouthAmerica"
  | "Antarctica"
  | "Australia";

interface Question {
  correctAnswer: Continent;
  choices: Continent[];
}

const continentImages: Record<Continent, string> = {
  Africa: "/mapQuest_images/Continents/Africa.png",
  Asia: "/mapQuest_images/Continents/Asia.png",
  Europe: "/mapQuest_images/Continents/Europe.png",
  NorthAmerica: "/mapQuest_images/Continents/North_America.svg",
  SouthAmerica: "/mapQuest_images/Continents/South_America.png",
  Antarctica: "/mapQuest_images/Continents/Antartica.png",
  Australia: "/mapQuest_images/Continents/Oceania.png",
};

const shuffleArray = (array: Continent[]): Continent[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MapGame: React.FC = () => {
  const continents: Continent[] = [
    "Africa",
    "Asia",
    "Europe",
    "NorthAmerica",
    "SouthAmerica",
    "Antarctica",
    "Australia",
  ];
  const [usedContinents, setUsedContinents] = useState<Continent[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Continent | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [questionUpdating, setQuestionUpdating] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(
    null
  );

  const generateQuestion = (): Question | null => {
    const remainingContinents = continents.filter(
      (continent) =>
        !usedContinents.includes(continent) &&
        continent !== previousQuestion?.correctAnswer
    );
    if (remainingContinents.length === 0) {
      setGameOver(true);
      return null;
    }

    const correctAnswer =
      remainingContinents[
        Math.floor(Math.random() * remainingContinents.length)
      ];
    const otherChoices = continents.filter(
      (continent) => continent !== correctAnswer
    );
    const shuffledChoices = shuffleArray([
      correctAnswer,
      ...otherChoices.slice(0, 3),
    ]);
    return { correctAnswer, choices: shuffledChoices };
  };

  const updateQuestion = () => {
    if (gameOver || questionUpdating) return;
    setQuestionUpdating(true);
    const newQuestion = generateQuestion();
    if (newQuestion) {
      setQuestion(newQuestion);
      setPreviousQuestion(newQuestion);
    }
    setQuestionUpdating(false);
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
      setMessage("Correct!");
      setSelectedAnswer(answer);
      setUsedContinents((prev) => [...prev, question.correctAnswer]);

      setTimeout(() => {
        setSelectedAnswer(null);
        setMessage("");
        updateQuestion();
        setTimer(15);
      }, 2000);
    } else {
      setMessage("Try Again!");
      setSelectedAnswer(answer);

      setTimeout(() => {
        setSelectedAnswer(null);
        setMessage("");
      }, 2000);
    }
  };

  const handleTimerEnd = () => {
    if (gameOver) return;
    setMessage("Time is up! Moving to the next question.");
    setSelectedAnswer(question!.correctAnswer);
    setUsedContinents((prev) => [...prev, question!.correctAnswer]);

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage("");
      updateQuestion();
      setTimer(15);
    }, 2000);
  };

  if (gameOver) {
    return (
      <div className="game-over text-center bg-blue-300 p-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Game Over</h1>
        <p className="text-2xl mb-4">Final Score: {score}</p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-xl hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!question) return <div>Loading...</div>;

const MainPage: React.FC = () => {
  return (
    <div className="game bg-blue-300 text-black min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Map Quest</h1>
      <div className="text-center mb-8">
        <img
          src={continentImages[question.correctAnswer]}
          alt={question.correctAnswer}
          className="mx-auto mb-4 rounded-lg"
          width="400"
        />
        <h2 className="text-2xl font-semibold text-white">
          Which continent is this?
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {question.choices.map((choice, index) => (
          <AnswerBox
            key={index}
            text={choice}
            isSelected={selectedAnswer === choice}
            onSelect={() => handleAnswer(choice)}
            className={
              selectedAnswer === choice && choice === question.correctAnswer
                ? "bg-green-100 border-green-500"
                : selectedAnswer === choice
                ? "bg-red-100 border-red-500"
                : "bg-white border-gray-300"
            }
          />
        ))}
      </div>
      <p className="text-lg mt-4 text-white">{message}</p>
      <div className="mt-6 flex flex-col items-center">
        <p className="text-xl font-medium text-white">
          Time left: <span className="font-bold">{timer}s</span>
        </p>
        <p className="text-xl font-medium text-white">
          Score: <span className="font-bold">{score}</span>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
