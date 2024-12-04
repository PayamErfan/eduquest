import React, { useState } from 'react';
import MainMenu from '@/components/MainMenu';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [words, setWords] = useState([]);
  const [wordList, setWordList] = useState([]);

  const startGame = (status) => setIsGameStarted(status);
  const changeLevel = (level) => setSelectedLevel(level);

  return (
    <div className="App">
      {!isGameStarted ? (
        <MainMenu
          onStartGame={startGame}
          onLevelChange={changeLevel}
          words={words}
          wordList={wordList}
        />
      ) : (
        <div>
          <h1>Game Level: {selectedLevel}</h1>
          <p>The game will go here!</p>
        </div>
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
