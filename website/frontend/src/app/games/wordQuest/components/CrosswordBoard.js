import React, { useState, useEffect, useCallback } from 'react';
import { crosswordData } from '../data/crosswordData';
import './styles.css';
// import Speech from 'lmnt-node';
import * as BufferPolyfill from 'buffer';
import { usePoints } from './PointsContext';
// import wrongAudioSrc from '../audio/wrong.mp3';
// import synthesizeSpeech from '../utils/LmntTestR';
// let correctAudioSrc = new Audio();
// let wrongAudioSrc = new Audio();
// window.Buffer = BufferPolyfill.Buffer;

const CrosswordBoard = ({ difficulty }) => {
  const difficultySettings = {
    easy: { gridSize: 10, cellSize: 40 },
    medium: { gridSize: 15, cellSize: 35 },
    hard: { gridSize: 20, cellSize: 30 },
    extreme: { gridSize: 25, cellSize: 25 },
  };

  const { gridSize, cellSize } = difficultySettings[difficulty];

  const [grid, setGrid] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(''))
  );
  const [highlightGrid, setHighlightGrid] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false))
  );
  const [correctGrid, setCorrectGrid] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false))
  );
  const [blockedGrid, setBlockedGrid] = useState(
    Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(false))
  );
  const [hints, setHints] = useState([]);
  const [feedback, setFeedback] = useState('');
  const { points, setPoints } = usePoints(); // New state for points
  const [revealedHints, setRevealedHints] = useState({}); // Track revealed hints

  const correctAudio = new Audio('/audio/correct.mp3');
  const wrongAudio = new Audio('/audio/wrong.mp3');
  const [completed, setCompleted] = useState(false); // State to indicate if the board is completed

  useEffect(() => {
    // Define data line ranges for each difficulty
    const wordRanges = {
      easy: [0, 89],
      medium: [90, 182],
      hard: [183, 237],
      extreme: [238, 277],
    };

    // Get the word range for the current difficulty
    const [startLine, endLine] = wordRanges[difficulty];

    // Filter words based on the range
    const wordsInRange = crosswordData.slice(startLine, endLine + 1);

    // Shuffle the words in the range
    const shuffledWords = wordsInRange.sort(() => Math.random() - 0.5);

    // Set the number of words to pick based on the difficulty
    const wordsToLimit = {
      easy: 5,
      medium: 8,
      hard: 10,
      extreme: 10,
    };

    // Select the number of words to place on the grid
    const wordsToPlace = shuffledWords.slice(0, wordsToLimit[difficulty]);

    // Proceed with placing words on the grid (use your existing placement logic)
    const newHints = [];
    const newHighlightGrid = [...highlightGrid];
    const gridCopy = [...grid];
    let blockedGridCopy = [...blockedGrid];

    wordsToPlace.forEach((wordToPlace, index) => {
      let placed = false;
      const maxAttempts = 50;
      let attempts = 0;

      while (!placed && attempts < maxAttempts) {
        attempts++;
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const maxRow =
          direction === 'horizontal'
            ? gridSize
            : gridSize - wordToPlace.wordLength;
        const maxCol =
          direction === 'horizontal'
            ? gridSize - wordToPlace.wordLength
            : gridSize;

        const startRow = Math.floor(Math.random() * maxRow);
        const startCol = Math.floor(Math.random() * maxCol);

        if (
          isSpaceAvailable(
            gridCopy,
            blockedGridCopy,
            startRow,
            startCol,
            wordToPlace.answer,
            direction
          )
        ) {
          placeWord(
            gridCopy,
            newHighlightGrid,
            startRow,
            startCol,
            wordToPlace.answer,
            direction
          );
          blockedGridCopy = updateBlockedGrid(
            blockedGridCopy,
            startRow,
            startCol,
            wordToPlace.answer,
            direction
          );
          newHints.push({
            hint: wordToPlace.hint,
            startRow,
            startCol,
            direction,
            length: wordToPlace.wordLength,
            number: index + 1, // Add the hint number here
          });
          placed = true;
        }
      }
    });

    setHints(newHints);
    setHighlightGrid(newHighlightGrid);
    setGrid(gridCopy);
    setBlockedGrid(blockedGridCopy);
  }, [difficulty, gridSize]);

  const updateBlockedGrid = (
    blockedGrid,
    startRow,
    startCol,
    word,
    direction
  ) => {
    const letters = word.toUpperCase().split('');
    const newBlockedGrid = [...blockedGrid];

    letters.forEach((_, i) => {
      const row = direction === 'horizontal' ? startRow : startRow + i;
      const col = direction === 'horizontal' ? startCol + i : startCol;

      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (
            r >= 0 &&
            r < newBlockedGrid.length &&
            c >= 0 &&
            c < newBlockedGrid[0].length
          ) {
            newBlockedGrid[r][c] = true;
          }
        }
      }
    });

    return newBlockedGrid;
  };
  const generateWordsAudio = async (word) => {
    const audioBlob = fetch('http://127.0.0.1:8000/wordQuest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: word }),
    }).then((data) => {
      return data.blob();
    });
    // Return the audio buffer
    // const audioBlob = new Blob([synthesis.audio], { type: 'audio/wav' });

    // Return the audio blob
    return audioBlob;
    // return synthesis.audio;
  };

  const generateWords = useCallback(async (word) => {
    // Generate audio for the question
    const audioBlob = word
      ? await generateWordsAudio(word, process.env.REACT_APP_LMNT_API_KEY)
      : null;
    const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : null;
    return {
      question: word,
      audioUrl,
    };
  });

  const playWordAudio = async (word) => {
    const newQuestion = await generateWords(word);

    // Play audio if available
    if (newQuestion.audioUrl) {
      const audio = new Audio(newQuestion.audioUrl);
      audio.play();
    }
  };
  const isSpaceAvailable = (
    grid,
    blockedGrid,
    startRow,
    startCol,
    word,
    direction
  ) => {
    const letters = word.toUpperCase().split('');
    const gridSize = grid.length;

    return letters.every((_, i) => {
      const row = direction === 'horizontal' ? startRow : startRow + i;
      const col = direction === 'horizontal' ? startCol + i : startCol;

      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
        return false;
      }

      if (blockedGrid[row][col]) {
        return false;
      }

      return true;
    });
  };

  const placeWord = (
    grid,
    highlightGrid,
    startRow,
    startCol,
    word,
    direction
  ) => {
    const letters = word.toUpperCase().split('');
    letters.forEach((_, i) => {
      const row = direction === 'horizontal' ? startRow : startRow + i;
      const col = direction === 'horizontal' ? startCol + i : startCol;

      grid[row][col] = '';
      highlightGrid[row][col] = true;
    });
  };

  const handleInputChange = (row, col, value, event) => {
    const keyPressed = event.key;

    // Ignore changes for cells already filled correctly
    if (correctGrid[row][col]) {
      return; // Do not change the value if the cell is already correct
    }

    // Handle Backspace
    if (keyPressed === 'Backspace') {
      const newGrid = [...grid];
      newGrid[row][col] = ''; // Clear the current cell
      setGrid(newGrid);

      moveWithinWord(row, col, -1); // Move to the previous cell in the word
      return;
    }

    // Ignore invalid input
    if (!/^[A-Za-z]$/.test(value)) return;

    // Handle normal input
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);

    validateAnswers(newGrid);

    moveWithinWord(row, col, 1); // Move to the next cell in the word
  };

  const fontSizeMapping = {
    easy: '20px', // Larger font for easier difficulty
    medium: '18px', // Slightly smaller font for medium difficulty
    hard: '16px', // Smaller font for hard difficulty
    extreme: '14px', // Smallest font for extreme difficulty
  };

  // Move to the next or previous cell in the current word
  const moveWithinWord = (row, col, step) => {
    const activeWord = hints.find(
      ({ startRow, startCol, direction, length }) => {
        // Check if the current cell is part of this word
        if (direction === 'horizontal') {
          return row === startRow && col >= startCol && col < startCol + length;
        } else if (direction === 'vertical') {
          return col === startCol && row >= startRow && row < startRow + length;
        }
        return false;
      }
    );

    if (!activeWord) return; // If no active word is found, do nothing

    const { startRow, startCol, direction, length } = activeWord;

    // Calculate the next position based on the step
    let newRow = row;
    let newCol = col;

    if (direction === 'horizontal') {
      newCol += step;
      if (newCol < startCol || newCol >= startCol + length) return; // Out of bounds for this word
    } else if (direction === 'vertical') {
      newRow += step;
      if (newRow < startRow || newRow >= startRow + length) return; // Out of bounds for this word
    }

    // Focus the next valid cell
    const nextInput = document.querySelector(
      `.crossword-board input[data-row="${newRow}"][data-col="${newCol}"]`
    );
    nextInput?.focus();
  };

  const validateAnswers = (currentGrid) => {
    const newCorrectGrid = [...correctGrid];
    let solved = false;
    let allCorrect = true; // Flag to check if all words are correct

    // Loop through each word in the hints to validate answers
    hints.forEach(({ hint, startRow, startCol, direction, length }, index) => {
      const word = [];
      for (let i = 0; i < length; i++) {
        const row = direction === 'horizontal' ? startRow : startRow + i;
        const col = direction === 'horizontal' ? startCol + i : startCol;
        word.push(currentGrid[row][col]);
      }

      const isWordCompleted = word.every((letter) => letter !== '');
      if (isWordCompleted) {
        const isCorrect =
          word.join('') ===
          crosswordData
            .find((hintObj) => hintObj.hint === hint)
            ?.answer.toUpperCase();

        if (isCorrect) {
          const isFirstCompletion = !correctGrid[startRow][startCol];

          if (isFirstCompletion) {
            solved = true;
            word.forEach((_, i) => {
              const row = direction === 'horizontal' ? startRow : startRow + i;
              const col = direction === 'horizontal' ? startCol + i : startCol;
              newCorrectGrid[row][col] = true;
            });

            // Update points based on the difficulty level
            const pointsForDifficulty = {
              easy: 5,
              medium: 7.5,
              hard: 10,
              extreme: 15,
            };
            setPoints((prev) => prev + pointsForDifficulty[difficulty]);

            // Play the correct audio only when the word is completed correctly
            correctAudio.play();

            // Move focus to the next word after the current one is correct
            moveToNextWord(index);
          }
        } else {
          // If the word is incorrect, clear the word
          wrongAudio.play();
          allCorrect = false; // Set flag to false if any word is incorrect

          for (let i = 0; i < length; i++) {
            const row = direction === 'horizontal' ? startRow : startRow + i;
            const col = direction === 'horizontal' ? startCol + i : startCol;
            currentGrid[row][col] = ''; // Clear the cell
          }
          setGrid([...currentGrid]);

          // Focus on the first cell of the current word
          const firstCell = document.querySelector(
            `.crossword-board input[data-row="${startRow}"][data-col="${startCol}"]`
          );
          firstCell?.focus();
        }
      } else {
        allCorrect = false; // Set flag to false if any word is not completed
      }
    });

    setCorrectGrid(newCorrectGrid);
    setFeedback(solved ? "Correct! You've solved the hint." : '');

    // Set the completed state if all words are correct
    if (allCorrect) {
      setCompleted(true);
    }
  };

  // Function to move focus to the next word
  const moveToNextWord = (currentIndex) => {
    // Find the next hint that has not been completed
    const nextHintIndex = hints.findIndex(
      (hintObj, i) =>
        i > currentIndex && !correctGrid[hintObj.startRow][hintObj.startCol]
    );

    if (nextHintIndex !== -1) {
      const nextHint = hints[nextHintIndex];
      const { startRow, startCol } = nextHint;

      // Focus on the next word's starting cell
      moveWithinWord(startRow, startCol, 0); // Focus on the first input of the next word
    }
  };

  const revealHint = (hint, index) => {
    if (revealedHints[index]) return;

    setRevealedHints((prev) => ({ ...prev, [index]: true }));
    const hintPenalty = {
      easy: 1,
      medium: 3,
      hard: 5,
      extreme: 10,
    };
    setPoints((prev) => prev - hintPenalty[difficulty]); // Deduct points for revealing a hint
  };
  return (
    <div>
      {completed && (
        <div
          style={{
            color: 'green',
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: '20px',
          }}
        >
          Nice job! You've completed the crossword!
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '800px', // Adjust based on your layout needs
            padding: '10px',
          }}
        >
          <h2
            style={{
              fontSize: '25px', // Reduced font size
              fontWeight: 'bold',
              color: '#000000',
              margin: '0',
              textShadow: '2px 2px 4px rgba(255, 170, 30, 0.8)',
            }}
          >
            Difficulty: {difficulty.toUpperCase()}
          </h2>
          <h3
            style={{
              fontSize: '18px', // Reduced font size
              fontWeight: 'bold',
              color: '#2c3e50',
              backgroundColor: '#ecf0f1',
              padding: '5px 10px',
              borderRadius: '6px',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
              margin: '0',
            }}
          >
            Points: {points}
          </h3>
        </div>

        <div
          className="crossword-board-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            top: '3px', // Moves the container (and the border) 3 pixels down
          }}
        >
          {/* Place the crossword board component here */}
        </div>
      </div>
      <div
        className="crossword-board"
        style={{
          color: 'black',
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
          width: `${cellSize * gridSize}px`,
          border: '4px solid #2c3e50',
          borderRadius: '0px', // Square border without rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)', // Optional: adds a subtle shadow for depth
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const hintNumber = hints.find(
              ({ startRow, startCol }) =>
                startRow === rowIndex && startCol === colIndex
            )?.number;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  position: 'relative',
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                {hintNumber && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      fontSize: '12px',
                      color: 'black',
                      zIndex: 1,
                    }}
                  >
                    {hintNumber}
                  </span>
                )}
                <input
                  className="cell"
                  type="text"
                  maxLength="1"
                  value={
                    highlightGrid[rowIndex][colIndex]
                      ? grid[rowIndex][colIndex]
                      : ''
                  }
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value,
                      e.nativeEvent
                    )
                  }
                  onKeyDown={(e) =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value,
                      e.nativeEvent
                    )
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: correctGrid[rowIndex][colIndex]
                      ? 'rgba(167, 243, 208, 0.8)' // Green for correct with opacity
                      : highlightGrid[rowIndex][colIndex]
                      ? 'rgba(219, 234, 254, 0.8)' // Highlighted with opacity
                      : 'rgba(255, 255, 255, 0.8)', // White with opacity
                    border: highlightGrid[rowIndex][colIndex]
                      ? '2px solid #3b82f6'
                      : '1px solid #ccc',
                    textAlign: 'center',
                    fontSize: fontSizeMapping[difficulty], // Set font size based on difficulty
                  }}
                  disabled={!highlightGrid[rowIndex][colIndex]}
                  data-row={rowIndex}
                  data-col={colIndex}
                />
              </div>
            );
          })
        )}
      </div>
      <div
        className="hints-container"
        style={{ position: 'fixed', right: '10px', top: '50px' }}
      >
        {/* Instruction Rectangle */}
        <div
          style={{
            color: 'black',
            background: 'white',
            padding: '15px',
            borderRadius: '5px',
            opacity: 0.9,
            width: '215px', // Increased width
            textAlign: 'center',
            marginBottom: '8px',
            fontSize: '10px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p>Click on the hint to reveal the answer.</p>
          <p>Press play to hear the audio.</p>
        </div>
        <div
          className="hints-box"
          style={{
            background: 'white',
            padding: '10px',
            borderRadius: '5px',
            opacity: 0.9,
            width: '200px',
          }}
        >
          {hints.map((hintObj, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              <p
                onClick={() => revealHint(hintObj.hint, index)}
                style={{
                  cursor: 'pointer',
                  color: revealedHints[index] ? 'green' : 'black',
                  fontWeight: revealedHints[index] ? 'bold' : 'normal',
                  fontSize:
                    difficulty === 'easy'
                      ? '16px'
                      : difficulty === 'medium'
                      ? '14px'
                      : difficulty === 'hard'
                      ? '12px'
                      : '10px',
                  margin: '0',
                  flex: 1,
                }}
              >
                <strong>{hintObj.number}.</strong>{' '}
                {revealedHints[index]
                  ? crosswordData.find(({ hint }) => hint === hintObj.hint)
                      ?.answer
                  : hintObj.hint}
              </p>
              <button
                onClick={() => playWordAudio(hintObj.hint)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#1d4ed8')
                } // Darker color on hover
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#3b82f6')
                } // Original color on mouse leave
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrosswordBoard;
