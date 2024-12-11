"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from '../../answer_box';
import GameOverPopup from '../../gameOver_popup';
import '../../map_game.css';


type Country = 'Afghanistan'|'Bahrain'|'Bangladesh'|'Bhutan'|'Brunei'|'Cambodia'|'China'|'Hong Kong'|'India'|'Indonesia'|'Iran'|'Iraq'|
                'Japan'|'Jordan'|'Kuwait'|'Krygyzstan'|'Laos'|'Lebanon'|'Macau'|'Malaysia'|'Maldives'|'Mongolia'|'Myanmar'|'Nepal'|
                'NorthKorea'|'Oman'|'Pakistan'|'Palestine'|'Philippines'|'Qatar'|'SaudiArabia'|'Singapore'|'SouthKorea'|'SriLanka'|
                'Syria'|'Taiwan'|'Tajikistan'|'Thailand'|'Timor-Leste'|'Turkmenistan'|'UAE'|'Uzbekistan'|'Vietnam'|'Yemen';

interface Question {
  correctAnswer: Country;
  choices: Country[];
}

const countryImages: Record<Country, string> = {
  Afghanistan: '/mapQuest_images/Countries/Asia/Afghanistan.png',
  Bahrain: '/mapQuest_images/Countries/Asia/Bahrain.png',
  Bangladesh: '/mapQuest_images/Countries/Asia/Bangladesh.png',
  Bhutan: '/mapQuest_images/Countries/Asia/Bhutan.png',
  Brunei: '/mapQuest_images/Countries/Asia/Brunei.png',
  Cambodia: '/mapQuest_images/Countries/Asia/Cambodia.png',
  China: '/mapQuest_images/Countries/Asia/China.png',
  "Hong Kong": '/mapQuest_images/Countries/Asia/Hong_Kong.png',
  India: '/mapQuest_images/Countries/Asia/India.png',
  Indonesia: '/mapQuest_images/Countries/Asia/Indonesia.png',
  Iran: '/mapQuest_images/Countries/Asia/Iran.png',
  Iraq: '/mapQuest_images/Countries/Asia/Iraq.png',
  Japan: '/mapQuest_images/Countries/Asia/Japan.png',
  Jordan: '/mapQuest_images/Countries/Asia/Jordan.png',
  Kuwait: '/mapQuest_images/Countries/Asia/Kuwait.png',
  Krygyzstan: '/mapQuest_images/Countries/Asia/Krygyzstan.png',
  Laos: '/mapQuest_images/Countries/Asia/Laos.png',
  Lebanon: '/mapQuest_images/Countries/Asia/Lebanon.png',
  Macau: '/mapQuest_images/Countries/Asia/Macau.png',
  Malaysia: '/mapQuest_images/Countries/Asia/Malaysia.png',
  Maldives: '/mapQuest_images/Countries/Asia/Maldives.png',
  Mongolia: '/mapQuest_images/Countries/Asia/Mongolia.png',
  Myanmar: '/mapQuest_images/Countries/Asia/Myanmar.png',
  Nepal: '/mapQuest_images/Countries/Asia/Nepal.png',
  NorthKorea: '/mapQuest_images/Countries/Asia/NorthKorea.png',
  Oman: '/mapQuest_images/Countries/Asia/Oman.png',
  Pakistan: '/mapQuest_images/Countries/Asia/Pakistan.png',
  Palestine: '/mapQuest_images/Countries/Asia/Palestine.png',
  Philippines: '/mapQuest_images/Countries/Asia/Philippines.png',
  Qatar: '/mapQuest_images/Countries/Asia/Qatar.png',
  SaudiArabia: '/mapQuest_images/Countries/Asia/SaudiArabia.png',
  Singapore: '/mapQuest_images/Countries/Asia/Singapore.png',
  SouthKorea: '/mapQuest_images/Countries/Asia/SouthKorea.png',
  SriLanka: '/mapQuest_images/Countries/Asia/SriLanka.png',
  Syria: '/mapQuest_images/Countries/Asia/Syria.png',
  Taiwan: '/mapQuest_images/Countries/Asia/Taiwan.png',
  Tajikistan: '/mapQuest_images/Countries/Asia/Tajikistan.png',
  Thailand: '/mapQuest_images/Countries/Asia/Thailand.png',
  "Timor-Leste": '/mapQuest_images/Countries/Asia/Timor-Leste.png',
  Turkmenistan: '/mapQuest_images/Countries/Asia/Turkmenistan.png',
  UAE: '/mapQuest_images/Countries/Asia/UAE.png',
  Uzbekistan: '/mapQuest_images/Countries/Asia/Uzbekistan.png',
  Vietnam: '/mapQuest_images/Countries/Asia/Vietnam.png',
  Yemen: '/mapQuest_images/Countries/Asia/Yemen.png',
};

const shuffleArray = (array: Country[]): Country[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const AsiaMapGame: React.FC = () => {
  const countries: Country[] = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", 
    "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Japan", "Jordan", "Kuwait", 
    "Krygyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", 
    "Myanmar", "Nepal", "NorthKorea", "Oman", "Pakistan", "Palestine", "Philippines", 
    "Qatar", "SaudiArabia", "Singapore", "SouthKorea", "SriLanka", "Syria", "Taiwan", 
    "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "UAE", "Uzbekistan", 
    "Vietnam", "Yemen"];
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
      setTimer(15);
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
    <div className="game bg-blue-200 text-black min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Map Quest</h1>
      <div className="text-center mb-8">
        <img
          src={countryImages[question.correctAnswer]}
          alt={question.correctAnswer}
          className="mx-auto mb-4 rounded-lg shadow-lg"
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

export default AsiaMapGame;
