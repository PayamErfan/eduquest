import React, { useState, useEffect, useCallback } from 'react';
//import {Text, StyleSheet} from 'react-native';
//import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MainMenu from './MainMenu';
import '../style/SpellingGame.css';
import { easyWords, mediumWords, hardWords, finalWords } from './DummieWords';
import {
  blockWord,
  numLetters,
  showOneLetter,
  showTwoLetter,
} from '../utils/Sentence';
import * as sp from '../utils/SoundPlayer';
import ShowCharacter from './Character';
//import {WordAudio} from '../utils/LmntGenerator';
// import Speech from 'lmnt-node';
import * as BufferPolyfill from 'buffer';
//import synthesizeSpeech from '../utils/LmntTestR';
import { importCSV } from '../utils/CsvImporter';
import { randomWordGenerator } from '../utils/WordsGenerator';

import FinishLevel from './FinishLevel';

window.Buffer = BufferPolyfill.Buffer;

const wordListMock = mediumWords;

const initialState = {
  //character position
  //viewpoint position
  characterPos: [50, 2],
  lives: 3,
  currentSentence: 'import corresponding sentence from level 1',
  modifiedSentence: blockWord(wordListMock[0]),
  text: '',
  correctAnswer: wordListMock[0].word,
  inputAnswer: '',
  points: 0,
  correctNumAnswer: 0,
  audioNumber: 0,
  pointsOnLevel: 0,
  level: MainMenu.level,
  currentWordIndex: 0,
  currWordObj: wordListMock[0],
  currentStep: 0,
  currentWordLs: wordListMock,
  Totalpoints: 0,
};

const SpellingGame = ({ level, levelwordList, onRestart, onFinishLevel }) => {
  const [userState, setUserState] = useState(initialState);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });

  const [input, setInputAnswer] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [wordList, setWordList] = React.useState(levelwordList);
  const [currentWord, setWordCurrent] = React.useState(levelwordList[0]);
  //const [wordList, setWordList] = React.useState(wordListMock);
  //const [currentWord, setWordCurrent] = React.useState(wordListMock[0]);
  const [audioPlayer, setAudioPlayer] = useState(true);

  const [isLevelFinished, setIsLevelFinished] = useState(false);

  const levelMap = {
    Easy: 'Medium',
    Medium: 'Hard',
    Hard: 'Final',
    Final: null, // No next level after the Final level
  };

  const startNextLevel = async () => {
    const nextLevel = levelMap[userState.level];
    if (!nextLevel) {
      alert('Congratulations! You’ve completed all levels!');
      handleRestart();
      return;
    }

    // Fetch the new word list for the next level
    const wordFile = `/assets/words/OP EduQuest Spelling Game Word Bank - 850${nextLevel}.csv`;
    const importedWords = await importCSV(wordFile); // Import words from the CSV
    const randomWordList = randomWordGenerator(importedWords); // Generate a random word list

    // Set the new word list and update the state
    setWordList(randomWordList);
    setWordCurrent(randomWordList[0]);

    // Update user state for the next level
    setUserState({
      ...initialState,
      level: nextLevel,
      currentWordLs: randomWordList,
      currentSentence: randomWordList[0].sentence,
      modifiedSentence: blockWord(randomWordList[0]),
      correctAnswer: randomWordList[0].word,
      currWordObj: randomWordList[0],
    });

    // Change the background based on the next level
    changeBackground(nextLevel);

    // Play the background music for the new level
    sp.playBGM();
  };

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

  // const wordListSelect = (level) => {
  //     let selectedWords;

  //     if (level == 'Easy') {
  //         selectedWords = easyWords;
  //     } else if (level  == 'Medium') {
  //         selectedWords = mediumWords;
  //     } else if (level == 'Hard'){
  //         selectedWords = hardWords;
  //     } else {
  //         selectedWords = finalWords;
  //     }
  //     setWordList(selectedWords);
  //     setWordCurrent(selectedWords[0])
  //     return selectedWords;

  // }

  // const getWordListByLevel = (level) => {
  //     switch (level) {
  //         case 'Easy': return easyWords;
  //         case 'Medium': return mediumWords;
  //         case 'Hard': return hardWords;
  //         default: return finalWords;
  //     }
  // };

  const levelInitial = (level) => {
    const newWordList = levelwordList;
    //const newWordList = wordListSelect(level);
    setUserState((prevState) => ({
      ...prevState,
      // points: totalpoints + 0,
      currentSentence: newWordList[0].sentence,
      modifiedSentence: blockWord(newWordList[0]),
      correctAnswer: newWordList[0].word,
      level: level,
      currWordObj: newWordList[0],
      currentWordLs: newWordList,
    }));
  };

  useEffect(() => {
    const initialWordList = levelwordList;
    //const initialWordList = getWordListByLevel(level); // Fetch words based on the initial level
    setWordList(initialWordList); // Update state
    setUserState((prevState) => ({
      ...prevState,
      currWordObj: initialWordList[0], // First word in the list
      currentSentence: initialWordList[0].sentence,
      modifiedSentence: blockWord(initialWordList[0]),
      correctAnswer: initialWordList[0].word,
      currentWordLs: initialWordList,
    }));
  }, [level]);

  //userState.modifiedSentence = blockWord(currentWord);
  //userState.currWordObj = currentWord;

  useEffect(() => {
    //levelInitial(level);
    //setWordCurrent()
    const updatedSentence = blockWord(currentWord);
    //playSequentialNewWordAudio();
    setUserState((prevState) => ({
      ...prevState,
      modifiedSentence: updatedSentence,
    }));
  }, [currentWord]);

  const generateWordsAudio = async (word) => {
    try {
      const audioBlob = fetch('http://127.0.0.1:8000/wordQuest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      }).then((rawData) => {
        return rawData.blob();
      });
      return audioBlob;
      // return synthesis.audio;
    } catch (error) {
      console.error('Error generating audio:', error);
      return null;
    }
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

  const playSequentialRestartAudio = async () => {
    await sp.playRestart(); // Wait for the restart sound to finish
    await playWordAudio(userState.currWordObj.word); // Then play the word audio
  };

  const playSequentialNewWordAudio = async (wordObj) => {
    await playWordAudio(wordObj.word);
    await playWordAudio(wordObj.sentence); // Then play the word audio
  };

  const handleFinishLevel = () => {
    onFinishLevel(true);
  };

  const handleRestart = () => {
    sp.pauseBGM();
    setUserState(initialState);
    levelInitial(level);
    setInputAnswer('');
    if (onRestart) {
      onRestart(); // Notify parent to go back to the main menu
    }
  };

  const restartLevel = () => {
    setUserState(initialState);
    levelInitial(level);
    setInputAnswer('');
    restartBackgroundPosition();
    sp.playBGM();
  };

  const handlePlayWord = () => {
    const word = userState.currWordObj.word;
    //alert(`played ${word} audio!`)
    //handleAudioForWord("word");
    playWordAudio(word);
  };

  const handlePlaySentence = () => {
    const sentence = userState.currWordObj.sentence; // Assuming each word object has a `sentence` property
    //alert( `played ${sentence} audio!`)
    //handleAudioForWord("sentence");
    playWordAudio(sentence);
  };

  // const handleCurrentWord = () => {
  //     setWordCurrent = wordList.next.word;
  // }

  const wrongAnswer = (attempts) => {
    if (attempts === 0) {
      setUserState((prevState) => ({
        ...prevState,
        modifiedSentence: numLetters(userState.currWordObj),
        text: `Hint: ${userState.currWordObj.word.length} letters`,
        lives: prevState.lives - 1,
      }));
    } else if (attempts === 1) {
      setUserState((prevState) => ({
        ...prevState,
        modifiedSentence: showOneLetter(userState.currWordObj),
        text: 'Try Again!',
        lives: prevState.lives - 1,
      }));
    } else if (attempts === 2) {
      // sp.playRestart();
      // playWordAudio(userState.currWordObj.word)
      playSequentialRestartAudio();
      setUserState((prevState) => ({
        ...prevState,
        modifiedSentence: showTwoLetter(userState.currWordObj),
        text: 'Correct Word: ' + userState.correctAnswer,
        lives: prevState.lives - 1,
        //use lmnt read the word or sentence again.
      }));
    } else {
      sp.pauseBGM();
      restartLevel();
      //nextWord();
    }
  };

  function updateBackgroundPosition(currentStep) {
    const totalSteps = 16;
    const stepsPerCheckpoint = 4;

    const checkpoints = Math.ceil(currentStep / stepsPerCheckpoint);
    const stepIndexWithinCheckpoint = (currentStep - 1) % stepsPerCheckpoint;
    const oneCheckPoint = [11, 1.7];
    const verticalPosition =
      100 - 5 * currentStep - (checkpoints - 1) * oneCheckPoint[1] + 0.3;
    const horizontalPostion =
      3.5 * currentStep + (checkpoints - 1) * oneCheckPoint[0] + 5;
    document.getElementById(
      'game-container'
    ).style.backgroundPosition = `${horizontalPostion}% ${verticalPosition}%`;

    currentStep++;
    if (currentStep > totalSteps) currentStep = 1; // Reset after reaching the last step
  }

  function restartBackgroundPosition() {
    document.getElementById(
      'game-container'
    ).style.backgroundPosition = `left bottom`;
  }

  const updateCharacterPosition = (currentStep) => {
    // Compute the new x and y positions based on the currentStep
    const newX = 5 * currentStep; // Adjust the multiplier as needed
    const newY = 3 * currentStep; // Adjust the multiplier as needed

    setCharacterPosition({ x: newX, y: newY });
  };

  const nextWord = () => {
    const nextIndex = userState.currentWordIndex + 1;

    setUserState((prevState) => ({
      ...prevState,
      currentWordIndex: nextIndex,
      currWordObj: wordList[nextIndex],
      modifiedSentence: blockWord(wordList[nextIndex]),
      points: prevState.points + userState.lives,
      correctAnswer: wordList[nextIndex].word,
      currentSentence: wordList[nextIndex].sentence,
      text: '',
      lives: 3,
      currentStep: prevState.currentStep + 1,
    }));

    setInputAnswer('');
    const nextWordObj = wordList[nextIndex];
    setWordCurrent(wordList[nextIndex]);

    playSequentialNewWordAudio(nextWordObj);

    const newStep = userState.currentStep + 1;
    if (newStep % 4 === 0) {
      updateBackgroundPosition(newStep);
    }
    updateBackgroundPosition(newStep);
    updateCharacterPosition(newStep);
  };

  // function updateCharacterPos(currentStep) {
  //     setUserState((prevState) => ({
  //         // const newX = prevState.characterPos[0] + 5 * (prevState.currentStep + 1);
  //         // const newY = prevState.characterPos[1] + 3 * (prevState.currentStep + 1);

  //         // Update the character's position in the state
  //         ...prevState,
  //         characterPos: [prevState.characterPos[0] + 5 * (prevState.currentStep + 1), prevState.characterPos[1] + 3 * (prevState.currentStep + 1)],
  //         currentStep: prevState.currentStep + 1

  //     }));

  //     // Update the DOM element's position after the state update
  //     const newX = userState.characterPos[0] + 5 * (userState.currentStep + 1);
  //     const newY = userState.characterPos[1] + 3 * (userState.currentStep + 1);
  //     document.getElementById('Moski').style.position = `${newX}rem ${newY}rem`;
  // }

  // const nextWord = () => {
  //     const nextIndex = userState.currentWordIndex + 1;
  //     setUserState((prevState) => ({
  //             ...prevState,
  //             currentWordIndex: nextIndex,
  //             currWordObj: wordList[nextIndex],
  //             modifiedSentence: blockWord(wordList[nextIndex]),
  //             points: prevState.points + userState.lives, // Increment points
  //             correctAnswer: wordList[nextIndex].word,
  //             currentSentence: wordList[nextIndex].sentence,
  //             text: "",
  //             lives: 3,
  //             currentStep: prevState.currentStep + 1,
  //         }));

  //     setInputAnswer('');
  //     const nextWordObj = wordList[nextIndex];
  //     setWordCurrent(wordList[nextIndex]);

  //     // playWordAudio(nextWordObj.sentence)
  //     // playWordAudio(nextWordObj.word);
  //     playSequentialNewWordAudio(nextWordObj);
  //     if ((userState.currentStep + 1) % 4 === 0) {
  //         updateBackgroundPosition(userState.currentStep + 1);
  //     }
  //     updateBackgroundPosition(userState.currentStep + 1);
  //     //updateCharacterPos(userState.currentStep + 1);

  // }

  const lastWord = () => {
    const nextIndex = userState.currentWordIndex + 1;
    setUserState((prevState) => ({
      ...prevState,
      currentWordIndex: nextIndex,
      currWordObj: '',
      modifiedSentence: '',
      points: prevState.points + userState.lives, // Increment points
      correctAnswer: wordList[nextIndex].word,
      currentSentence: wordList[nextIndex].sentence,
      text: 'Finish Level!',
      lives: 3,
      currentStep: prevState.currentStep + 1,
    }));

    setInputAnswer('');
    const nextWordObj = wordList[nextIndex];
    setWordCurrent(wordList[nextIndex]);

    // playWordAudio(nextWordObj.sentence)
    // playWordAudio(nextWordObj.word);
    playSequentialNewWordAudio(nextWordObj);
    if ((userState.currentStep + 1) % 4 === 0) {
      updateBackgroundPosition(userState.currentStep + 1);
    }
    updateBackgroundPosition(userState.currentStep + 1);
    //updateCharacterPos(userState.currentStep + 1);
  };

  const rightAnswerAudio = (correctNumAns) => {
    if (correctNumAns == 0) {
      sp.playFirst();
    } else if (correctNumAns == 1) {
      sp.playSecond();
    } else if (correctNumAns == 2) {
      sp.playThird();
    } else {
      sp.playFinal();
      setUserState((prevState) => ({
        ...prevState,
        correctNumAnswer: 0,
      }));
    }
  };

  // const handleNextWord = () => {
  //     const isCorrectAnswer = userState.currWordObj.word === input; // Compare current input to the correct answer

  //     if (userState.currentWordIndex < 15) {
  //         if (isCorrectAnswer) {
  //             // Move to the next word
  //             rightAnswerAudio(userState.correctNumAnswer);
  //             setUserState((prevState) => ({
  //                 ...prevState,
  //                 correctNumAnswer: prevState.correctNumAnswer + 1,
  //             }));
  //             nextWord();

  //             setInputAnswer(''); // Clear input
  //         } else {
  //             // Incorrect answer logic
  //             wrongAnswer(3 - userState.lives);
  //             setInputAnswer(''); // Clear input
  //         }
  //     } else if (userState.currentWordIndex == 15) {
  //         lastWord();
  //         //FinishLevel(level, wordList, onRestart, onStartGame, onLevelChange);
  //     } else {
  //         alert("You've completed the game!");
  //         handleRestart();
  //     }
  // };
  // const handleNextWord = () => {
  //     const isCorrectAnswer = userState.currWordObj.word === input; // Compare current input to the correct answer

  //     if (isCorrectAnswer) {
  //         // Move to the next word if not the last one
  //         if (userState.currentWordIndex < 15) {
  //             rightAnswerAudio(userState.correctNumAnswer);
  //             setUserState((prevState) => ({
  //                 ...prevState,
  //                 correctNumAnswer: prevState.correctNumAnswer + 1,
  //             }));
  //             nextWord();
  //         } else if (userState.currentWordIndex === 15) {
  //             // User answers the 15th word (index 14)
  //             sp.playFinal(); // Play final sound or celebration
  //             setUserState((prevState) => ({
  //                 ...prevState,
  //                 currentWordIndex: prevState.currentWordIndex + 1, // Move to the 16th step
  //                 modifiedSentence: "", // No sentence to display
  //                 currentSentence: "", // Clear the sentence
  //                 currWordObj: {word: "Finished level", sentence: ""}, // No current word object
  //                 text: "Finish Level!", // Display final step message
  //                 lives: prevState.lives, // Retain lives
  //                 currentStep: prevState.currentStep + 1, // Move to the final stair
  //             }));
  //             const newStep = userState.currentStep + 1;
  //             updateBackgroundPosition(newStep); // Move character background
  //             updateCharacterPosition(newStep);  // Move character position
  //         }
  //         // } else {
  //         //     // User has answered the 16th word correctly
  //         //     sp.playNewLevel();
  //         //     lastWord();
  //         //     const newStep = userState.currentStep + 1;
  //         //     updateBackgroundPosition(newStep);
  //         //     updateCharacterPosition(newStep);
  //             //alert("Level Complete!"); // Optional feedback
  //             //handleFinishLevel(); // Notify parent component to switch screens

  //         setInputAnswer(''); // Clear input
  //     } else {
  //         // Incorrect answer logic
  //         wrongAnswer(3 - userState.lives);
  //         setInputAnswer(''); // Clear input
  //     }
  // };

  const handleNextWord = () => {
    const isCorrectAnswer = userState.currWordObj.word === input; // Compare input to correct answer

    if (isCorrectAnswer) {
      if (userState.currentWordIndex < 15) {
        rightAnswerAudio(userState.correctNumAnswer);
        setUserState((prevState) => ({
          ...prevState,
          correctNumAnswer: prevState.correctNumAnswer + 1,
        }));
        nextWord();
      } else if (userState.currentWordIndex === 15) {
        // Finish the level
        sp.playFinal();
        setIsLevelFinished(true); // Trigger finish screen
      }
      setInputAnswer(''); // Clear input
    } else {
      // Incorrect answer logic
      wrongAnswer(3 - userState.lives);
      setInputAnswer(''); // Clear input
    }
  };

  const handleNextLevel = () => {
    const nextLevel = levelMap[level];
    if (!nextLevel) {
      alert('Congratulations! You’ve completed all levels!');
      handleRestart();
      return;
    }

    // Prepare the next level
    const newWordList =
      nextLevel === 'Medium'
        ? mediumWords
        : nextLevel === 'Hard'
        ? hardWords
        : finalWords;

    setWordList(newWordList);
    setWordCurrent(newWordList[0]);
    setUserState({
      ...initialState,
      level: nextLevel,
      currentWordLs: newWordList,
      currentSentence: newWordList[0].sentence,
      modifiedSentence: blockWord(newWordList[0]),
      correctAnswer: newWordList[0].word,
      currWordObj: newWordList[0],
    });
    setIsLevelFinished(false); // Return to game screen
    sp.playBGM();
  };

  const handleMainMenu = () => {
    setIsLevelFinished(false); // Reset state
    handleRestart(); // Return to main menu
  };

  useEffect(() => {
    setWordCurrent(wordList[userState.currentWordIndex]);
  }, [userState.currentWordIndex, wordList]);

  console.log('Word List:', wordList);
  console.log('Current Word Index:', userState.currentWordIndex);
  console.log('Current Word:', currentWord);

  return isLevelFinished ? (
    <FinishLevel
      points={userState.points}
      currentLevel={level}
      onNextLevel={handleNextLevel}
      onMainMenu={handleMainMenu}
    />
  ) : (
    // return (
    //maybe adjust text to different color based on the background color
    <div className={`SpellingBee ${level}`}>
      <div id="game-container" className={level}>
        <ShowCharacter xPos={60} yPos={15} />

        {/* <img 
    id="Moski" 
    src={`${process.env.PUBLIC_URL}/assets/images/oski.png`} 
    alt="Moski" 
    style={{
        bottom: `${userState.characterPos[1]}rem`,
        left: `${userState.characterPos[0]}rem`
    }}  */}

        {/* character */}

        <button className="next-word" onClick={handleNextWord}>
          Next Word
        </button>

        {userState.currentWordIndex > 15 && (
          <>
            {/* <button className="next-level" onClick={startNextLevel}>Next Level</button> */}
            <button className="finish-main" onClick={handleRestart}>
              Main Menu
            </button>
          </>
        )}
      </div>

      <div className={`Plain-text ${level}`}>
        <h2 className="lives">Lives left: {userState.lives} </h2>
        <h2 className="points">Points: {userState.points} </h2>
        <h2 className="level">Level: {level}</h2>
        <h2 className="sentence">{userState.modifiedSentence}</h2>

        <h2 className="text">{userState.text}</h2>
      </div>

      <input
        rows="1"
        maxLength={20}
        //onChangeText={onChangeText}
        placeholder="Type answer here!"
        value={input}
        onChange={(e) => setInputAnswer(e.target.value)}
      />

      <button className="restart" onClick={handleRestart}>
        Restart Game
      </button>

      <button className="word" onClick={handlePlayWord}>
        Play Word
      </button>

      <button className="sentence" onClick={handlePlaySentence}>
        Play Sentence
      </button>
    </div>
  );
};

export default SpellingGame;
