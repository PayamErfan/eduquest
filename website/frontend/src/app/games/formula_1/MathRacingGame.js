import React, { useState, useEffect, useCallback } from 'react';
import { Car, RotateCcw, Pause, Volume2, VolumeX, Target } from 'lucide-react';
// import { Speech } from 'lmnt-node';
import { motion } from 'motion/react';
import dotenv from 'dotenv';
dotenv.config();

// Polyfill Buffer for browser environment
// window.Buffer = BufferPolyfill.Buffer;

// Audio utility function (modified to work in browser)
const generateQuestionAudio = async (questionText) => {
  // try {
  //   console.log('Attempting to generate audio for:', questionText);
  //   // Ensure the API key is available
  //   const apiKey = process.env.REACT_APP_LMNT_API_KEY;
  //   if (!apiKey) {
  //     throw new Error(
  //       'REACT_APP_LMNT_API_KEY not found. Please set it in your .env file.'
  //     );
  //   }
  //   // Initialize speech synthesis
  //   const speech = new Speech(apiKey);
  //   // Convert mathematical symbols to spoken words
  try {
    const spokenText = questionText
      .replace('+', 'plus')
      .replace('-', 'minus')
      .replace('?', '');
    const audio = fetch(`http://127.0.0.1:8000/formula_1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: spokenText }),
    }).then((response) => {
      return response.blob();
    });
    return audio;
  } catch (error) {
    console.log(error);
  }

  //   // Synthesize speech
  //   console.log('pre-synthesis');
  //   const synthesis = await speech.synthesize(spokenText, 'lily');
  //   console.log('post-synthesis');
  //   // Return the audio buffer
  //   const audioBlob = new Blob([synthesis.audio], { type: 'audio/wav' });
  //   // Return the audio blob
  //   return audioBlob;
  //   // return synthesis.audio;
  // } catch (error) {
  //   console.error('Error generating audio:', error);
  //   return null;
  // }
};

// Hooks for managing game logic and state
const useMathRacing = () => {
  const [gameState, setGameState] = useState({
    playerPosition: 60,
    opponentPosition: 40,
    isGameOver: false,
    winner: null,
    difficulty: 1,
    gameScreen: 'menu',
    operationType: null,
    digitType: '1-10',
    soundOn: true,
    currentQuestion: null,
    currentAnswerOptions: [],
    correctAnswer: null,
    audioUrl: null,
    incorrectFeedback: null,
  });

  const generateQuestion = useCallback(async () => {
    const generateNumbers = (digitType) => {
      const max = digitType === '1-10' ? 5 : 49;
      return [
        Math.floor(Math.random() * max) + 1,
        Math.floor(Math.random() * max) + 1,
      ];
    };

    const [num1, num2] = generateNumbers(gameState.digitType);

    const createQuestion = () => {
      switch (gameState.operationType) {
        case 'addition':
          return {
            text: `${num1} + ${num2}?`,
            correct: num1 + num2,
          };
        case 'subtraction':
          const [larger, smaller] = [
            Math.max(num1, num2),
            Math.min(num1, num2),
          ];
          return {
            text: `${larger} - ${smaller}?`,
            correct: larger - smaller,
          };
        default:
          const operations = [
            { text: `${num1} + ${num2}?`, correct: num1 + num2 },
            {
              text: `${Math.max(num1, num2)} - ${Math.min(num1, num2)}?`,
              correct: Math.max(num1, num2) - Math.min(num1, num2),
            },
          ];
          return operations[Math.floor(Math.random() * operations.length)];
      }
    };

    const { text, correct } = createQuestion();
    const incorrectOptions = [correct + 1, correct - 1, correct + 2];

    // Generate audio for the question
    const audioBlob = gameState.soundOn
      ? await generateQuestionAudio(text)
      : null;

    const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : null;

    return {
      question: text,
      correct,
      options: [correct, ...incorrectOptions].sort(() => Math.random() - 0.5),
      audioUrl,
    };
  }, [gameState.operationType, gameState.digitType, gameState.soundOn]);

  const handleAnswer = useCallback(
    (selectedAnswer) => {
      if (selectedAnswer === gameState.currentQuestion.correct) {
        // Player moves forward
        const newPlayerPosition = Math.min(
          gameState.playerPosition + 150,
          1350
        );

        setGameState((prev) => ({
          ...prev,
          playerPosition: newPlayerPosition,
          currentQuestion: null,
          incorrectFeedback: null,
        }));

        // Check if player wins
        if (newPlayerPosition >= 1350) {
          setGameState((prev) => ({
            ...prev,
            isGameOver: true,
            winner: 'player',
          }));
        }
      } else {
        // Incorrect answer handling
        setGameState((prev) => ({
          ...prev,
          incorrectFeedback: 'Incorrect! Try again.',
          // Optionally, you could add a small penalty for incorrect answers
          playerPosition: Math.max(prev.playerPosition - 20, 60),
        }));
      }
    },
    [gameState.playerPosition, gameState.currentQuestion]
  );

  const advanceOpponent = useCallback(() => {
    if (!gameState.isGameOver) {
      const newOpponentPosition =
        gameState.opponentPosition + gameState.difficulty;

      if (newOpponentPosition >= 1350) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: true,
          winner: 'opponent',
        }));
      } else {
        setGameState((prev) => ({
          ...prev,
          opponentPosition: newOpponentPosition,
        }));
      }
    }
  }, [gameState.opponentPosition, gameState.difficulty, gameState.isGameOver]);

  const playQuestionAudio = useCallback(() => {
    if (gameState.currentQuestion?.audioUrl && gameState.soundOn) {
      const audio = new Audio(gameState.currentQuestion.audioUrl);
      audio.play();
    }
  }, [gameState.currentQuestion, gameState.soundOn]);

  const toggleSound = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      soundOn: !prev.soundOn,
    }));
  }, []);

  // Game loop effects
  useEffect(() => {
    if (!gameState.isGameOver && gameState.gameScreen === 'game') {
      // Generate new question if no current question
      if (!gameState.currentQuestion) {
        const generateAndSetQuestion = async () => {
          const newQuestion = await generateQuestion();
          setGameState((prev) => ({
            ...prev,
            currentQuestion: newQuestion,
            currentAnswerOptions: newQuestion.options,
          }));

          // Play audio if available
          if (newQuestion.audioUrl) {
            const audio = new Audio(newQuestion.audioUrl);
            audio.play();
          }
        };

        generateAndSetQuestion();
      }

      // Move opponent

      const opponentInterval = setInterval(advanceOpponent, 1000);
      return () => clearInterval(opponentInterval);
    }
  }, [
    gameState.isGameOver,
    gameState.gameScreen,
    gameState.currentQuestion,
    generateQuestion,
    advanceOpponent,
  ]);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      playerPosition: 60,
      opponentPosition: 40,
      isGameOver: false,
      winner: null,
      gameScreen: 'difficulty',
      currentQuestion: null,
    }));
  }, []);

  return {
    gameState,
    setGameState,
    handleAnswer,
    resetGame,
    generateQuestion,
    playQuestionAudio,
    toggleSound,
  };
};

// Main Game Component
const MathRacingGame = () => {
  const {
    gameState,
    setGameState,
    handleAnswer,
    resetGame,
    playQuestionAudio,
    toggleSound,
  } = useMathRacing();

  const renderMenuScreen = () => (
    <div className=" relative flex flex-col items-center  h-screen bg-gray-100">
      <h1 className="absolute text-5xl top-1/3 font-bold mb-10 text-black">
        Formula 1 + 1
      </h1>
      <button
        onClick={() =>
          setGameState((prev) => ({ ...prev, gameScreen: 'difficulty' }))
        }
        className="absolute top-1/2 bg-green-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-600"
      >
        Start Game
      </button>
      <div>
        <img src="/formula1/racetrack.png" />
      </div>
    </div>
  );

  const renderDifficultyScreen = () => (
    <div className="relative flex flex-col items-center h-screen bg-gray-100">
      <h2 className=" absolute top-1/3 text-3xl mb-6 text-black">
        Select Difficulty
      </h2>
      <div className="top-1/2 absolute flex space-x-4">
        {['Easy', 'Medium', 'Hard'].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() =>
              setGameState((prev) => ({
                ...prev,
                difficulty:
                  difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3,
                gameScreen: 'operation',
              }))
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            {difficulty}
          </button>
        ))}
      </div>
      <div>
        <img src="/formula1/racetrack.png" />
      </div>
    </div>
  );

  const renderOperationScreen = () => (
    <div className="realtive flex flex-col items-center h-screen bg-gray-100">
      <h2 className="absolute top-1/3 text-3xl mb-6 text-black">
        Select Operation
      </h2>
      <div className="top-1/2 absolute flex space-x-4">
        {['Addition', 'Subtraction', 'Both'].map((operation) => (
          <button
            key={operation}
            onClick={() =>
              setGameState((prev) => ({
                ...prev,
                operationType: operation.toLowerCase(),
                gameScreen: 'digits',
              }))
            }
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
          >
            {operation}
          </button>
        ))}
      </div>
      <div>
        <img src="/formula1/racetrack.png" />
      </div>
    </div>
  );

  const renderDigitsScreen = () => (
    <div className="relative flex flex-col items-center h-screen bg-gray-100">
      <h2 className="top-1/3 absolute text-3xl mb-6 text-black">
        Select Number Range
      </h2>
      <div className=" top-1/2 absolute flex space-x-4">
        {['1-10', '1-100'].map((digits) => (
          <button
            key={digits}
            onClick={() =>
              setGameState((prev) => ({
                ...prev,
                digitType: digits,
                gameScreen: 'game',
              }))
            }
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
          >
            {digits}
          </button>
        ))}
      </div>
      <div>
        <img src="/formula1/racetrack.png" />
      </div>
    </div>
  );

  const renderGameScreen = () => {
    const {
      playerPosition,
      opponentPosition,
      currentQuestion,
      isGameOver,
      winner,
      soundOn,
      incorrectFeedback,
    } = gameState;

    return (
      <div className="relative h-screen bg-gray-200">
        {/* Sound Control */}
        <button
          onClick={toggleSound}
          className=" absolute top-4 z-10 right-4 p-2 rounded-full bg-white shadow-md"
        >
          {soundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        {/* Race Track */}
        <div className="absolute w-full h-40 bg-gray-300">
          <img className="h-dvh w-full" src="/formula1/racetrack.png" />
        </div>

        {/* Cars */}
        <motion.div
          id="player"
          className="absolute left-4 bottom-0 z-10 text-red-500"
          animate={{ x: playerPosition }}
        >
          {/* <Car size={64} /> */}
          <img src="/formula1/red_car.png" />
        </motion.div>
        <motion.div
          className="absolute left-4 bottom-12 text-blue-500"
          animate={{ x: opponentPosition }}
          // style={{ transform: `translateX(${opponentPosition}px)` }}
        >
          {/* <Car size={64} /> */}
          <img src="/formula1/blue_car.png" />
        </motion.div>

        {/* Question Area */}
        {currentQuestion && !isGameOver && (
          <div className="absolute top-10 left-0 right-0 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-2xl text-black">
                  {currentQuestion.question}
                </h3>
                <button
                  onClick={playQuestionAudio}
                  className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-700"
                  disabled={!soundOn}
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Incorrect Feedback */}
              {incorrectFeedback && (
                <div className="text-red-500 text-center mb-2">
                  {incorrectFeedback}
                </div>
              )}

              <div className="flex space-x-4 mt-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-white mb-6">
              {winner === 'player' ? 'You Win!' : 'Opponent Wins!'}
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
              >
                Play Again
              </button>
              <button
                onClick={() =>
                  setGameState((prev) => ({ ...prev, gameScreen: 'menu' }))
                }
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCurrentScreen = () => {
    switch (gameState.gameScreen) {
      case 'menu':
        return renderMenuScreen();
      case 'difficulty':
        return renderDifficultyScreen();
      case 'operation':
        return renderOperationScreen();
      case 'digits':
        return renderDigitsScreen();
      case 'game':
        return renderGameScreen();
      default:
        return renderMenuScreen();
    }
  };

  return <div className="h-screen">{renderCurrentScreen()}</div>;
};

export default MathRacingGame;
