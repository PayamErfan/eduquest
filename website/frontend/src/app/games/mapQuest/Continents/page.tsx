"use client";

import React, { useState, useEffect } from "react";
import AnswerBox from "../answer_box";
import GameOverPopup from "../gameOver_popup";
import "../map_game.css";

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

  const generateQuestion = (): Question | null => {
    // Filter out continents that have already been used
    const remainingContinents = continents.filter(
      (continent) => !usedContinents.includes(continent)
    );
    console.log("Remaining Continents:", remainingContinents);
    console.log("Used Continents:", usedContinents);

    if (remainingContinents.length === 0) {
      setGameOver(true); // If no continents remain, end the game
      return null;
    }

    // Pick a random continent from the remaining ones
    const correctAnswer =
      remainingContinents[Math.floor(Math.random() * remainingContinents.length)];

    // Generate 3 incorrect choices excluding the correct answer
    const otherChoices = continents.filter(
      (continent) => continent !== correctAnswer
    );

    // Shuffle and combine correctAnswer with other choices
    const shuffledChoices = shuffleArray([correctAnswer, ...otherChoices.slice(0, 3)]);

    return { correctAnswer, choices: shuffledChoices };
  };

  const updateQuestion = () => {
    if (gameOver || questionUpdating) return; // Prevent updates if the game is over or already updating
    setQuestionUpdating(true); // Lock updates

    const newQuestion = generateQuestion();
    if (newQuestion) {
      setQuestion(newQuestion);
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

      // Add the correct answer to the used continents list
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
      <GameOverPopup
        score={score}
        onPlayAgain={() => {
          setUsedContinents([]);
          setScore(0);
          setGameOver(false);
          setTimer(15);
          updateQuestion();
        }}
      />
    );
  }

  if (!question) return <div>Loading...</div>;

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

export default MapGame;
