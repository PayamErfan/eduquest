// import React, { useState, useEffect } from 'react';
// import '../style/MainMenu.css';
// import { importCSV } from '../utils/CsvImporter';
// import { randomWordGenerator } from '../utils/WordsGenerator';
// import {playBGM} from '../utils/SoundPlayer';
// import MainMenu from "./MainMenu";
// import SpellingGame from './SpellingGame';



import React from 'react';
import '../style/FinishLevel.css'; // Assuming you have a CSS file for styling

const FinishLevel = ({ points, currentLevel, onNextLevel, onMainMenu }) => {
    // Map levels to determine the next one
    const levelMap = {
        Easy: "Medium",
        Medium: "Hard",
        Hard: "Final",
        Final: null, // No next level after the Final level
    };

    // Change the background based on the level
    const changeBackground = (level) => {
        let backgroundUrl = '';
        if (level === 'Easy') {
            backgroundUrl = '/assets/images/easy-level-bg.png';
        } else if (level === 'Medium') {
            backgroundUrl = '/assets/images/medium-level-bg.png';
        } else if (level === 'Hard') {
            backgroundUrl = '/assets/images/hard-level-bg.png';
        } else if (level === 'Final') {
            backgroundUrl = '/assets/images/final-level-bg.png';
        }

        document.body.style.backgroundImage = `url(${backgroundUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    };

    // Start the next level
    const startNextLevel = async () => {
        const nextLevel = levelMap[currentLevel];
        if (!nextLevel) {
            alert("Congratulations! You’ve completed all levels!");
            onMainMenu(); // Return to the main menu when all levels are completed
            return;
        }

        // Change the background for the new level
        changeBackground(nextLevel);

        // Trigger the next level (passed as a prop)
        onNextLevel(nextLevel);
    };

    // const handleNextLevel ()

    return (
        <div className={`Main-menu ${currentLevel}`}>
            <h1>Finished Level: {currentLevel}</h1>
            {/* <button className="next-level-btn" onClick={startNextLevel}>
                Next Level
            </button> */}
            {/* <button className='next-level-btn' onClick={handleNextLevel}>
                Next Level

            </button> */}
            <h1> Points: {points}</h1>
            <button className="main-menu-btn" onClick={onMainMenu}>
                Main Menu
            </button>
        </div>
    );
};

export default FinishLevel;


// import React from 'react';

// const FinishLevel = ({ currentLevel, onNextLevel, onMainMenu }) => {


//     return (
//         <div className="finish-level-screen">
//             <h1>Finished Level: {currentLevel}</h1>
//             <button className="next-level-btn" onClick={onNextLevel}>
//                 Next Level
//             </button>
//             <button className="main-menu-btn" onClick={onMainMenu}>
//                 Main Menu
//             </button>
//         </div>
//     );
// };

// export default FinishLevel;


// const FinishLevel = ({ currentLevel, wordList, onRestart, onStartGame, onLevelChange }) => {
//     const [newLevel, setNewLevel] = useState(currentLevel);

//     // Update the new level only when needed
//     useEffect(() => {
//         if (currentLevel === "Easy") {
//             setNewLevel("Medium");
//         } else if (currentLevel === "Medium") {
//             setNewLevel("Hard");
//         } else if (currentLevel === "Hard") {
//             setNewLevel("Final");
//         }
//     }, [currentLevel]);

//     const handleNextLevel = () => {
//         onStartGame(true, wordList); // Restart the game
//         onLevelChange(newLevel);    // Set the new level
//         //const SpellingGame = ({ level, levelwordList, onRestart, onFinishLevel})
//     };

//     const handleMainMenu = () => {
//         onRestart(); // Return to the main menu

//     };

//     return (
//         <div className={`Main-menu ${newLevel}`}>
//             <h1>Finished Level!</h1>

//             <button onClick={handleNextLevel}>
//                 Next Level: {newLevel}
//             </button>

//             <button onClick={handleMainMenu}>
//                 Main Menu
//             </button>
//         </div>
//     );
// };

// export default FinishLevel;
// // const FinishLevel = ({currentLevel, wordList, onRestart, onStartGame, onLevelChange }) => {
// //     const [newLevel, setNewLevel] = useState(currentLevel);

// //     const handleNewLevel = (currentLevel) => {
// //         if (currentLevel == "Easy") {
// //             setNewLevel("Medium");
// //         } else if (currentLevel == "Medium") {
// //             setNewLevel("Hard");
// //         } else if (currentLevel == "Hard") {
// //             setNewLevel("Final");
// //         }
// //     }



// //     const handleNextLevel = (currentLevel) => {
// //         handleNewLevel(currentLevel);
// //         onStartGame(true, wordList); // This will be passed from App.js to set the game state to 'started
// //         onLevelChange(newLevel);
// //          // Pass the selected level to the game component
        

// //     }

// //     const handleMainMenu = () => {
// //         if (onRestart) {
// //             onRestart(); // Notify parent to go back to the main menu
// //         }
    
// //     }
// //     return (
// //         <div className={`Main-menu ${newLevel}`}>
// //             <h1> Finished Level! </h1>

// //             <button onClick={handleNextLevel(currentLevel)}>
// //                 Next Level: {newLevel}
// //             </button>

// //             <button onClick={handleMainMenu}>
// //                 Main Menu
// //             </button>
// //         </div>
// //     );
// // };

// // export default FinishLevel;