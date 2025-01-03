import React, { useState } from 'react';
//import React from 'react';
import '../style/Instruction.css'; // Add styling for the modal


const InstructionsModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <h2>How to Play Moski's Spelling Adventure</h2>
            <p>Welcome to Moski's Spelling Adventure! Here's how to play:</p>
            <ol>
                <li><b>Select a Level:</b> Choose a difficulty level to start your adventure:
                    <ul>
                        <li><b>Easy:</b> Words with less than 5 letters.</li>
                        <li><b>Medium:</b> Words between 4 to 7 letters.</li>
                        <li><b>Hard:</b> Words between 6 to 9 letters.</li>
                        <li><b>Final:</b> Words with up to 12 letters.</li>
                    </ul>
                </li>
                <li><b>Start the Game:</b> Click 'Start' to begin the spelling challenges.</li>
                <li><b>Gameplay:</b>
                    <ul>
                        <li>You have <b>3 attempts</b> to spell each word correctly.</li>
                        <li>Press the <b>'Next Word'</b> button to submit your spelling.</li>
                        <li>If you spell incorrectly:
                            <ul>
                                <li>Hint 1: The number of letters in the word will be revealed.</li>
                                <li>Hint 2: The first letter of the word will be shown.</li>
                                <li>Hint 3: The last letter of the word will be shown.</li>
                            </ul>
                        </li>
                        <li>If all 3 lives are used, the correct word will be displayed.</li>
                        <li>You can proceed to the next word with <b>0 points</b> if you spell the word correctly after seeing the correct word.</li>
                    </ul>
                </li>
                <li><b>Scoring:</b>
                    <ul>
                        <li>Earn points by spelling words correctly without losing lives.</li>
                        <li>The <b>maximum score</b> for a level is:
                            <ul>
                                <li><b>15 words x 3 lives left = 45 points</b>.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><b>Winning:</b>
                    <ul>
                        <li>Complete all words in the level to finish.</li>
                        <li>You may restart the game at any time for a higher score.</li>
                    </ul>
                </li>
            </ol>
            <h2>Have fun with Moski!</h2>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);
};

export default InstructionsModal;