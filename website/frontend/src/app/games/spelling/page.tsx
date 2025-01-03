'use client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainMenu from '@/components/MainMenu';
import { playBGM } from '@/utils/SoundPlayer';
import SpellingGame from '@/components/SpellingGame';
import FinishLevel from '@/components/FinishLevel';
//require('dotenv').config();
//import TTSPage from './utils/lmntTTS';
//import Game from './components/Game';
//import synthesizeSpeech from './utils/LmntTestR';
//import Game from './components/Game';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [words, setWords] = useState([]);
  const [wordList, setWordList] = useState([]);

  const startGame = (status) => setIsGameStarted(status);
  const changeLevel = (level) => setSelectedLevel(level);

  const handleFinishLevel = () => {
    setIsGameStarted(false); // Stop the game
    setIsLevelFinished(true); // Show FinishLevel screen
  };

  const handleRestartGame = () => {
    setIsGameStarted(false); // Return to the main menu
  };

  const handleWordListChange = (newWordList) => {
    setWordList(newWordList);
  };

  //setWordList(newWordList);

  return (
    <div className="App">
      {/* Main Menu */}
      {!isGameStarted && !isLevelFinished && (
        <MainMenu
          onStartGame={startGame}
          onLevelChange={changeLevel}
          newWordList={wordList}
          onWordListChange={handleWordListChange}
        />
      )}

      {/* Spelling Game */}
      {isGameStarted && !isLevelFinished && (
        <SpellingGame
          level={selectedLevel}
          levelwordList={wordList}
          onRestart={handleRestartGame}
          onFinishLevel={handleFinishLevel}
        />
      )}

      {/* Finish Level Screen */}
      {isLevelFinished && (
        <FinishLevel
          currentLevel={selectedLevel}
          wordList={wordList}
          onRestart={handleRestartGame}
          onStartGame={startGame}
          onLevelChange={changeLevel}
        />
      )}
    </div>
  );
}

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/assets/images/oski.png`} className="App-logo" alt="Oski" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/
