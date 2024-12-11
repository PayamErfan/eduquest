"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from '../../answer_box';
import GameOverPopup from '../../gameOver_popup';
import '../../map_game.css';


type Country = 'Albania' | 'Andorra' | 'Armenia' | 'Austria' | 'Azerbaijan' | 'Belarus' | 'Belgium'
                  |'Bosnia'|'Bulgaria'|'Croatia'|'Cyprus'|'Czechia'|'Denmark'|'Estonia'|'Finland'|
                  'France'|'Georgia'|'Germany'|'Greece'|'Gribraltar'|'Hungary'|'Iceland'|'Ireland'|
                  'Italy'|'Kosovo'|'Latvia'|'Lithuania'|'Luxembourg'|'Moldova'|'Monaco'|'Montenegro'|
                  'Netherlands'|'NorthMacedonia'|'Norway'|'Poland'|'Portugal'|'Romania'|'Russia'|'Serbia'|
                  'Slovakia'|'Slovenia'|'Spain'|'Svalbard'|'Sweden'|'Switzerland'|'Turkiye'|'Ukraine'|'UnitedKingdom';

interface Question {
  correctAnswer: Country;
  choices: Country[];
}

const countryImages: Record<Country, string> = {
  Albania: '/mapQuest_images/Countries/Europe/Albania.png',
  Andorra: '/mapQuest_images/Countries/Europe/Andorra.png',
  Armenia: '/mapQuest_images/Countries/Europe/Armenia.png',
  Austria: '/mapQuest_images/Countries/Europe/Austria.png',
  Azerbaijan: '/mapQuest_images/Countries/Europe/Azerbaijan.png',
  Belarus: '/mapQuest_images/Countries/Europe/Belarus.png',
  Belgium: '/mapQuest_images/Countries/Europe/Belgium.png',
  Bosnia: '/mapQuest_images/Countries/Europe/Bosnia.png',
  Bulgaria: '/mapQuest_images/Countries/Europe/Bulgaria.png',
  Croatia: '/mapQuest_images/Countries/Europe/Croatia.png',
  Cyprus: '/mapQuest_images/Countries/Europe/Cyprus.png',
  Czechia: '/mapQuest_images/Countries/Europe/Czechia.png',
  Denmark: '/mapQuest_images/Countries/Europe/Denmark.png',
  Estonia: '/mapQuest_images/Countries/Europe/Estonia.png',
  Finland: '/mapQuest_images/Countries/Europe/Finland.png',
  France: '/mapQuest_images/Countries/Europe/France.png',
  Georgia: '/mapQuest_images/Countries/Europe/Georgia.png',
  Germany: '/mapQuest_images/Countries/Europe/Germany.png',
  Greece: '/mapQuest_images/Countries/Europe/Greece.png',
  Gribraltar: '/mapQuest_images/Countries/Europe/Gribraltar.png',
  Hungary: '/mapQuest_images/Countries/Europe/Hungary.png',
  Iceland: '/mapQuest_images/Countries/Europe/Iceland.png',
  Ireland: '/mapQuest_images/Countries/Europe/Ireland.png',
  Italy: '/mapQuest_images/Countries/Europe/Italy.png',
  Kosovo: '/mapQuest_images/Countries/Europe/Kosovo.png',
  Latvia: '/mapQuest_images/Countries/Europe/Latvia.png',
  Lithuania: '/mapQuest_images/Countries/Europe/Lithuania.png',
  Luxembourg: '/mapQuest_images/Countries/Europe/Luxembourg.png',
  Moldova: '/mapQuest_images/Countries/Europe/Moldova.png',
  Monaco: '/mapQuest_images/Countries/Europe/Monaco.png',
  Montenegro: '/mapQuest_images/Countries/Europe/Montenegro.png',
  Netherlands: '/mapQuest_images/Countries/Europe/Netherlands.png',
  NorthMacedonia: '/mapQuest_images/Countries/Europe/NorthMacedonia.png',
  Norway: '/mapQuest_images/Countries/Europe/Norway.png',
  Poland: '/mapQuest_images/Countries/Europe/Poland.png',
  Portugal: '/mapQuest_images/Countries/Europe/Portugal.png',
  Romania: '/mapQuest_images/Countries/Europe/Romania.png',
  Russia: '/mapQuest_images/Countries/Europe/Russia.png',
  Serbia: '/mapQuest_images/Countries/Europe/Serbia.png',
  Slovakia: '/mapQuest_images/Countries/Europe/Slovakia.png',
  Slovenia: '/mapQuest_images/Countries/Europe/Slovenia.png',
  Spain: '/mapQuest_images/Countries/Europe/Spain.png',
  Svalbard: '/mapQuest_images/Countries/Europe/Svalbard.png',
  Sweden: '/mapQuest_images/Countries/Europe/Sweden.png',
  Switzerland: '/mapQuest_images/Countries/Europe/Switzerland.png',
  Turkiye: '/mapQuest_images/Countries/Europe/Turkiye.png',
  Ukraine: '/mapQuest_images/Countries/Europe/Ukraine.png',
  UnitedKingdom: '/mapQuest_images/Countries/Europe/UnitedKingdom.png',
};

const shuffleArray = (array: Country[]): Country[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const EuropeMapGame: React.FC = () => {
  const countries: Country[] = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
    "Bosnia", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia",
    "Finland", "France", "Georgia", "Germany", "Greece", "Gribraltar", "Hungary",
    "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Lithuania", "Luxembourg",
    "Moldova", "Monaco", "Montenegro", "Netherlands", "NorthMacedonia", "Norway",
    "Poland", "Portugal", "Romania", "Russia", "Serbia", "Slovakia", "Slovenia",
    "Spain", "Svalbard", "Sweden", "Switzerland", "Turkiye", "Ukraine", "UnitedKingdom"];
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

    <div className="game bg-blue-300 text-black min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Map Quest</h1>
      <div className="text-center mb-8">
        <img
          src={countryImages[question.correctAnswer]}
          alt={question.correctAnswer}
          className="mx-auto mb-4 rounded-lg"
          width="400"
        />
        <h2 className="text-2xl font-semibold text-white">
          Which country is this?
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

export default EuropeMapGame;
