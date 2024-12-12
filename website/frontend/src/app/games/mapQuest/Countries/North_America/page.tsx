"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from '../../answer_box';
import GameOverPopup from '../../gameOver_popup';
import '../../map_game.css';


type Country = 'Belize'|'Canada'|'Costa Rica'|'Cuba'|'Dominican Republic'|'El Salvador'|'Greenland'|
'Guatemala'|'Haiti'|'Honduras'|'Jamaica'|'Mexico'|'Nicaragua'|'Panama'|'Puerto Rico'|'United States';

interface Question {
  correctAnswer: Country;
  choices: Country[];
}

const countryImages: Record<Country, string> = {
  Belize: '/mapQuest_images/Countries/NorthAmerica/Belize.png',
  Canada: '/mapQuest_images/Countries/NorthAmerica/Canada.png',
  'Costa Rica': '/mapQuest_images/Countries/NorthAmerica/CostaRica.png',
  Cuba: '/mapQuest_images/Countries/NorthAmerica/Cuba.png',
  'Dominican Republic': '/mapQuest_images/Countries/NorthAmerica/DominicanRepublic.png',
  'El Salvador': '/mapQuest_images/Countries/NorthAmerica/ElSalvador.png',
  Greenland: '/mapQuest_images/Countries/NorthAmerica/Greenland.png',
  Guatemala: '/mapQuest_images/Countries/NorthAmerica/Guatemala.png',
  Haiti: '/mapQuest_images/Countries/NorthAmerica/Haiti.png',
  Honduras: '/mapQuest_images/Countries/NorthAmerica/Honduras.png',
  Jamaica: '/mapQuest_images/Countries/NorthAmerica/Jamaica.png',
  Mexico: '/mapQuest_images/Countries/NorthAmerica/Mexico.png',
  Nicaragua: '/mapQuest_images/Countries/NorthAmerica/Nicaragua.png',
  Panama: '/mapQuest_images/Countries/NorthAmerica/Panama.png',
  'Puerto Rico': '/mapQuest_images/Countries/NorthAmerica/PuertoRico.png',
  'United States': '/mapQuest_images/Countries/NorthAmerica/UnitedStates.png',
};

const shuffleArray = (array: Country[]): Country[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const NorthAmericaMapGame: React.FC = () => {
  const countries: Country[] = ["Belize", "Canada", "Costa Rica", "Cuba",
    "Dominican Republic", "El Salvador", "Greenland", "Guatemala","Haiti", "Honduras", "Jamaica", "Mexico",
    "Nicaragua", "Panama", "Puerto Rico", "United States"];
  const [usedCountries, setUsedCountries] = useState<Country[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [questionUpdating, setQuestionUpdating] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);



  
  const generateQuestion = (): Question | null => {
    const remainingCountries = countries.filter(country => !usedCountries.includes(country) && country !== previousQuestion?.correctAnswer);
    if (remainingCountries.length === 0) {
      setGameOver(true);
      //handleGameOver();
      return null;
    }

    const correctAnswer = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
    const otherChoices = countries.filter(country => country !== correctAnswer);
    const shuffledChoices = shuffleArray([correctAnswer, ...otherChoices.slice(0, 3)]);
    return { correctAnswer, choices: shuffledChoices };
  };

  const updateQuestion = () => {
    if (gameOver || questionUpdating) return; // Prevent multiple updates
      setQuestionUpdating(true); // Lock updates
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

  const handleAnswer = (answer: Country) => {
    if (answer === question?.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
      setSelectedAnswer(answer);
      setUsedCountries((prev) => [...prev, question.correctAnswer]);

      setTimeout(() => {
        setSelectedAnswer(null);
        setMessage('');
        updateQuestion();
        setTimer(15);
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
    if (gameOver) return;
    setMessage('Time is up! Moving to the next question.');
    setSelectedAnswer(question!.correctAnswer);
    setUsedCountries((prev) => [...prev, question!.correctAnswer]);
    

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage('');
      updateQuestion();
      setTimer(10);
    }, 2000);
  };

  //This is what happens when the game is over
  if(gameOver) {
    return (
      <div>
      <GameOverPopup
        score={score}
        onPlayAgain={() => window.location.reload()}
      />
    </div>
    );
  
}


  if (!question) return <div>Loading...</div>;

  return (
    <div className="game bg-green-300 text-black min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Map Quest</h1>
      <div className="text-center mb-8">
        <img 
        src={countryImages[question.correctAnswer]} 
        alt={question.correctAnswer}
          className="mx-auto mb-4 rounded-lg"
          width="400"
        >
        </img>
        <h2 className="text-2xl font-semibold text-white">Which country is this?</h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
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
    </div>
  );
};

export default NorthAmericaMapGame;
