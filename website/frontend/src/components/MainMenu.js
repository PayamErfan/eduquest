import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // For routing
import '../style/MainMenu.css';
import styled from 'styled-components';
import { importCSV } from '../utils/CsvImporter';
import { randomWordGenerator } from '../utils/WordsGenerator';

//onStartGame & onLevelChange changes the game status in Game.js and select the right level
const levels = ["Easy", "Medium", "Hard", "Final"];

const MainMenu = ({ onStartGame, onLevelChange}) => {
    const [level, setLevel] = useState('Easy');
    const [active, setActive] = useState(levels[0]);
    const [words, setWords] = useState([]);
    const [wordList, setWordList] = useState([]);

    const handleStartGame = () => {
        onStartGame(true); // This will be passed from App.js to set the game state to 'started'
        onLevelChange(level); // Pass the selected level to the game component
    };

    const wordFile = (level) => {
        const csvName = `/assets/words/OP EduQuest Spelling Game Word Bank - 850${level}.csv`;
        setWords(importCSV(csvName));
    }


    const handleInstruction = () => {
        alert("Instructions will go here!");
    };

    // const handleBackground = (level) => {
    //     let backgroundUrl = '';
    //     if (level == "Easy"){
    //         backgroundUrl = '/assets/images/og level.png';
    //     } else if (level == "Medium") {
    //         backgroundUrl = '/assets/images/noir level.png';
    //     } else if (level == "Hard") {
    //         backgroundUrl = '/assets/images/biohazard level.png';
    //     } else if (level == "Final") {
    //         backgroundUrl = '/assets/images/sunset level.png';
    //     }

    //     document.body.style.backgroundImage = `url(${backgroundUrl})`;
    //     document.body.style.backgroundSize = 'cover';
    //     document.body.style.backgroundPosition = 'center'; 
    // };

    const handleLevelSelect = async (level) => {
        setActive(level);
        setLevel(level);
        // setLoading(true);
        // setError(null);
        const wordFile = `/assets/words/OP EduQuest Spelling Game Word Bank - 850${level}.csv`;
        const importedwords = await importCSV(wordFile);  // Wait for CSV import
        setWords(importedwords);      // Update state with new words
        setWordList(randomWordGenerator(importedwords));
        
        console.log("Generated wordList in MainMenu:", wordList);
        //handleBackground(level);
    };

    

    

    return (
        <div className={`Main-menu ${level}`}>
            <h1>Moski's Spelling Adventure</h1>

            <button onClick={handleStartGame}>
                Start
            </button>

            <div className="select-level">
                {levels.map((level) => (
                    <button
                        key={level}
                        className={active === level ? 'active' : ''}
                        onClick={() => handleLevelSelect(level)}
                    >
                        {level}
                    </button>
                ))}


            </div>


            <div>
                {console.log("wordList before rendering in MainMenu:", wordList)}
                <h2>Words for {level} Level</h2>
                <ul>
                    {wordList.length > 0 ? (
                        wordList.map((wordPair, index) => (
                        <li key={index}>
                            {wordPair.word}: {wordPair.sentence}
                        </li>
                        ))
                    ) : (
                    <li>No words available</li> // If wordList is empty, display a message.
                    )}
                </ul>
            </div>


            
            {/* <button onClick={handleExit}>
                Exit Game
            </button> 
            maybe we dont need exit buttong since it will be a webpage game, 
            exitgamehandler will simple set onStartGame(false)*/}

            <button onClick={handleInstruction}>
                How to Play
            </button>
        </div>
    );
};

export default MainMenu;



