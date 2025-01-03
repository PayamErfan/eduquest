import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For routing
import '../style/MainMenu.css';
import styled from 'styled-components';
import { importCSV } from '../utils/CsvImporter';
import { randomWordGenerator } from '../utils/WordsGenerator';
import { playBGM } from '../utils/SoundPlayer';
import Instruction from '../components/Instruction';

const levels = ['Easy', 'Medium', 'Hard', 'Final'];

const MainMenu = ({ onStartGame, onLevelChange, onWordListChange }) => {
  const [level, setLevel] = useState(null); // No default selection
  const [active, setActive] = useState(null);
  const [words, setWords] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstruction = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleStartGame = () => {
    onStartGame(true, wordList); // Set game state to "started"
    onLevelChange(level); // Pass the selected level to the game component
    playBGM();
  };

  const handleLevelSelect = async (selectedLevel) => {
    setActive(selectedLevel);
    setLevel(selectedLevel);

    const wordFile = `/assets/words/OP EduQuest Spelling Game Word Bank - 850${selectedLevel}.csv`;
    const importedWords = await importCSV(wordFile); // Load word list
    setWords(importedWords);

    const randomWordList = randomWordGenerator(importedWords);
    setWordList(randomWordList);
    onWordListChange(randomWordList); // Update parent with word list
  };

  return (
    <div className="Main-menu">
      <h1>Moski's Spelling Adventure</h1>

      {/* Conditional rendering for "Select Level" or "Start" button */}
      {!level ? (
        <p className="select-level-text">Select Level</p>
      ) : (
        <button onClick={handleStartGame}>Start</button>
      )}

      <div className="select-level">
        {levels.map((lvl) => (
          <button
            key={lvl}
            className={active === lvl ? 'active' : ''}
            onClick={() => handleLevelSelect(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>

      <button onClick={handleInstruction}>How to Play</button>

      {/* Instruction Modal */}
      <Instruction show={showInstructions} onClose={handleCloseInstructions} />
    </div>
  );
};

export default MainMenu;
