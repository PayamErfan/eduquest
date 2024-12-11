"use client";

import React, { useState, useEffect } from 'react';
import AnswerBox from '../answer_box';
import GameOverPopup from '../gameOver_popup';
import '../map_game.css';


type State = | 'Alabama'| 'Alaska'| 'Arizona'| 'Arkansas'| 'California'| 'Colorado'| 'Connecticut'| 'Delaware'
        | 'Florida'| 'Georgia'| 'Hawaii'| 'Idaho'| 'Illinois'| 'Indiana'| 'Iowa'| 'Kansas'| 'Kentucky'| 'Louisiana'| 'Maine'| 'Maryland'
        | 'Massachusetts'| 'Michigan'| 'Minnesota'| 'Mississippi'| 'Missouri'| 'Montana'| 'Nebraska'| 'Nevada'| 'NewHampshire'| 'NewJersey'
        | 'NewMexico'| 'NewYork'| 'NorthCarolina'| 'NorthDakota'| 'Ohio'| 'Oklahoma'| 'Oregon'| 'Pennsylvania'| 'RhodeIsland'| 'SouthCarolina'
        | 'SouthDakota'| 'Tennessee'| 'Texas'| 'Utah'| 'Vermont'| 'Virginia'| 'Washington'| 'WestVirginia'| 'Wisconsin'| 'Wyoming';

interface Question {
  correctAnswer: State;
  choices: State[];
}

const StateImages: Record<State, string> = {
    Alabama: '/mapQuest_images/US_States/Alabama.png',
    Alaska: '/mapQuest_images/US_States/Alaska.png',
    Arizona: '/mapQuest_images/US_States/Arizona.png',
    Arkansas: '/mapQuest_images/US_States/Arkansas.png',
    California: '/mapQuest_images/US_States/California.png',
    Colorado: '/mapQuest_images/US_States/Colorado.png',
    Connecticut: '/mapQuest_images/US_States/Connecticut.png',
    Delaware: '/mapQuest_images/US_States/Delaware.png',
    Florida: '/mapQuest_images/US_States/Florida.png',
    Georgia: '/mapQuest_images/US_States/Georgia.png',
    Hawaii: '/mapQuest_images/US_States/Hawaii.png',
    Idaho: '/mapQuest_images/US_States/Idaho.png',
    Illinois: '/mapQuest_images/US_States/Illinois.png',
    Indiana: '/mapQuest_images/US_States/Indiana.png',
    Iowa: '/mapQuest_images/US_States/Iowa.png',
    Kansas: '/mapQuest_images/US_States/Kansas.png',
    Kentucky: '/mapQuest_images/US_States/Kentucky.png',
    Louisiana: '/mapQuest_images/US_States/Louisiana.png',
    Maine: '/mapQuest_images/US_States/Maine.png',
    Maryland: '/mapQuest_images/US_States/Maryland.png',
    Massachusetts: '/mapQuest_images/US_States/Massachusetts.png',
    Michigan: '/mapQuest_images/US_States/Michigan.png',
    Minnesota: '/mapQuest_images/US_States/Minnesota.png',
    Mississippi: '/mapQuest_images/US_States/Mississippi.png',
    Missouri: '/mapQuest_images/US_States/Missouri.png',
    Montana: '/mapQuest_images/US_States/Montana.png',
    Nebraska: '/mapQuest_images/US_States/Nebraska.png',
    Nevada: '/mapQuest_images/US_States/Nevada.png',
    NewHampshire: '/mapQuest_images/US_States/New Hampshire.png',
    NewJersey: '/mapQuest_images/US_States/New Jersey.png',
    NewMexico: '/mapQuest_images/US_States/New Mexico.png',
    NewYork: '/mapQuest_images/US_States/New York.png',
    NorthCarolina: '/mapQuest_images/US_States/North Carolina.png',
    NorthDakota: '/mapQuest_images/US_States/North Dakota.png',
    Ohio: '/mapQuest_images/US_States/Ohio.png',
    Oklahoma: '/mapQuest_images/US_States/Oklahoma.png',
    Oregon: '/mapQuest_images/US_States/Oregon.png',
    Pennsylvania: '/mapQuest_images/US_States/Pennsylvania.png',
    RhodeIsland: '/mapQuest_images/US_States/Rhode Island.png',
    SouthCarolina: '/mapQuest_images/US_States/South Carolina.png',
    SouthDakota: '/mapQuest_images/US_States/South Dakota.png',
    Tennessee: '/mapQuest_images/US_States/Tennessee.png',
    Texas: '/mapQuest_images/US_States/Texas.png',
    Utah: '/mapQuest_images/US_States/Utah.png',
    Vermont: '/mapQuest_images/US_States/Vermont.png',
    Virginia: '/mapQuest_images/US_States/Virginia.png',
    Washington: '/mapQuest_images/US_States/Washington.png',
    WestVirginia: '/mapQuest_images/US_States/West Virginia.png',
    Wisconsin: '/mapQuest_images/US_States/Wisconsin.png',
    Wyoming: '/mapQuest_images/US_States/Wyoming.png',
};

const shuffleArray = (array: State[]): State[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const StateGame: React.FC = () => {
  const states: State[] = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida',
                                'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
                                'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','NewHampshire','NewJersey',
                                'NewMexico','NewYork','NorthCarolina','NorthDakota','Ohio','Oklahoma','Oregon','Pennsylvania','RhodeIsland','SouthCarolina',
                                'SouthDakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','WestVirginia','Wisconsin','Wyoming',];
  const [usedStates, setUsedStates] = useState<State[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<State | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [questionUpdating, setQuestionUpdating] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);



  
  const generateQuestion = (): Question | null => {
    const remainingStates = states.filter(state => !usedStates.includes(state) && state !== previousQuestion?.correctAnswer);
    if (remainingStates.length === 0) {
      setGameOver(true);
      //handleGameOver();
      return null;
    }

    const correctAnswer = remainingStates[Math.floor(Math.random() * remainingStates.length)];
    const otherChoices = states.filter(state => state !== correctAnswer);
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

  const handleAnswer = (answer: State) => {
    if (answer === question?.correctAnswer) {
      setScore((prev) => prev + 1);
      setMessage('Correct!');
      setSelectedAnswer(answer);
      setUsedStates((prev) => [...prev, question.correctAnswer]);

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
    setUsedStates((prev) => [...prev, question!.correctAnswer]);
    

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
        <img src={StateImages[question.correctAnswer]} 
        alt={question.correctAnswer} 
        className="mx-auto mb-4 rounded-lg"
        width="400" />
        <h2 className="text-2xl font-semibold text-white">Which state is this?</h2>
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

export default StateGame;
