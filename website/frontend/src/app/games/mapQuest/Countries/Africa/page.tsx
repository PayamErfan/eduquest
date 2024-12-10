"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from '../../answer_box';
import GameOverPopup from '../../gameOver_popup';
import '../../map_game.css';


type Country = 'Algeria' | 'Angola' | 'Benin' | 'Botswana' | 'Burkina Faso' | 'Burundi' | 'Cameroon'
                  |'Central African Republic'|'Chad'|'Democratic Republic Of Congo'|'Djibouti'|'Egypt'|'Equitorial Guinea'|'Eritrea'|'eswatini'|
                  'Ethiopia'|'Gabon'|'Gambia'|'Ghana'|'Guinea Bissau'|'Guinea'|'Ivory Coast'|'Kenya'|
                  'Lesotho'|'Liberia'|'Libya'|'Madagascar'|'Malawi'|'Mali'|'Mauritania'|'Morocco'|
                  'Mozambique'|'Namibia'|'Niger'|'Nigeria'|'Republic Of Congo'|'Rwanda'|'Senegal'|'Sierra Leone'|
                  'Somalia'|'South Africa'|'South Sudan'|'Sudan'|'Tanzania'|'Togo'|'Tunisia'|'Uganda'|'Western Sahara'|'Zambia'|'Zimbabwe';

interface Question {
  correctAnswer: Country;
  choices: Country[];
}

const countryImages: Record<Country, string> = {
    Algeria: '/mapQuest_images/Countries/Africa/Algeria.png',
    Angola: '/mapQuest_images/Countries/Africa/Angola.png',
    Benin: '/mapQuest_images/Countries/Africa/Benin.png',
    Botswana: '/mapQuest_images/Countries/Africa/Botswana.png',
    "Burkina Faso": '/mapQuest_images/Countries/Africa/Burkina_Faso.png',
    Burundi: '/mapQuest_images/Countries/Africa/Burundi.png',
    Cameroon: '/mapQuest_images/Countries/Africa/Cameroon.png',
    "Central African Republic": '/mapQuest_images/Countries/Africa/Central_African_Republic.png',
    Chad: '/mapQuest_images/Countries/Africa/Chad.png',
    "Democratic Republic Of Congo": '/mapQuest_images/Countries/Africa/Democratic_Republic_Of_Congo.png',
    Djibouti: '/mapQuest_images/Countries/Africa/Djibouti.png',
    Egypt: '/mapQuest_images/Countries/Africa/Egypt.png',
    "Equitorial Guinea": '/mapQuest_images/Countries/Africa/Equitorial_Guinea.png',
    Eritrea: '/mapQuest_images/Countries/Africa/Eritrea.png',
    eswatini: '/mapQuest_images/Countries/Africa/eswatini.png',
    Ethiopia: '/mapQuest_images/Countries/Africa/Ethiopia.png',
    Gabon: '/mapQuest_images/Countries/Africa/Gabon.png',
    Gambia: '/mapQuest_images/Countries/Africa/Gambia.png',
    Ghana: '/mapQuest_images/Countries/Africa/Ghana.png',
    "Guinea Bissau": '/mapQuest_images/Countries/Africa/Guinea_Bissau.png',
    Guinea: '/mapQuest_images/Countries/Africa/Guinea.png',
    "Ivory Coast": '/mapQuest_images/Countries/Africa/Ivory_Coast.png',
    Kenya: '/mapQuest_images/Countries/Africa/Kenya.png',
    Lesotho: '/mapQuest_images/Countries/Africa/Lesotho.png',
    Liberia: '/mapQuest_images/Countries/Africa/Liberia.png',
    Libya: '/mapQuest_images/Countries/Africa/Libya.png',
    Madagascar: '/mapQuest_images/Countries/Africa/Madagascar.png',
    Malawi: '/mapQuest_images/Countries/Africa/Malawi.png',
    Mali: '/mapQuest_images/Countries/Africa/Mali.png',
    Mauritania: '/mapQuest_images/Countries/Africa/Mauritania.png',
    Morocco: '/mapQuest_images/Countries/Africa/Morocco.png',
    Mozambique: '/mapQuest_images/Countries/Africa/Mozambique.png',
    Namibia: '/mapQuest_images/Countries/Africa/Namibia.png',
    Niger: '/mapQuest_images/Countries/Africa/Niger.png',
    Nigeria: '/mapQuest_images/Countries/Africa/Nigeria.png',
    "Republic Of Congo": '/mapQuest_images/Countries/Africa/Republic_Of_Congo.png',
    Rwanda: '/mapQuest_images/Countries/Africa/Rwanda.png',
    Senegal: '/mapQuest_images/Countries/Africa/Senegal.png',
    "Sierra Leone": '/mapQuest_images/Countries/Africa/Sierra_Leone.png',
    Somalia: '/mapQuest_images/Countries/Africa/Somalia.png',
    "South Africa": '/mapQuest_images/Countries/Africa/South_Africa.png',
    "South Sudan": '/mapQuest_images/Countries/Africa/South_Sudan.png',
    Sudan: '/mapQuest_images/Countries/Africa/Sudan.png',
    Tanzania: '/mapQuest_images/Countries/Africa/Tanzania.png',
    Togo: '/mapQuest_images/Countries/Africa/Togo.png',
    Tunisia: '/mapQuest_images/Countries/Africa/Tunisia.png',
    Uganda: '/mapQuest_images/Countries/Africa/Uganda.png',
    "Western Sahara": '/mapQuest_images/Countries/Africa/Western_Sahara.png',
    Zambia: '/mapQuest_images/Countries/Africa/Zambia.png',
    Zimbabwe: '/mapQuest_images/Countries/Africa/Zimbabwe.png',
};

const shuffleArray = (array: Country[]): Country[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const EuropeMapGame: React.FC = () => {
  const countries: Country[] = ["Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
    "Central African Republic", "Chad", "Democratic Republic Of Congo", "Djibouti", "Egypt",
    "Equitorial Guinea", "Eritrea", "eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana",
    "Guinea Bissau", "Guinea", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya",
    "Madagascar", "Malawi", "Mali", "Mauritania", "Morocco", "Mozambique", "Namibia",
    "Niger", "Nigeria", "Republic Of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia",
    "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
    "Western Sahara", "Zambia", "Zimbabwe"];
  const [usedCountries, setUsedCountries] = useState<Country[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
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
    <div className="game bg-blue-500 text-black">
      <h1>Map Game</h1>
      <div className="question">
        <img src={countryImages[question.correctAnswer]} alt={question.correctAnswer} width="400" />
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

export default EuropeMapGame;
