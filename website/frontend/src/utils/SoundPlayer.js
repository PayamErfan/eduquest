let backgroundAudio = null;

const sounds = {
    backgroundMusic: '/assets/sounds/background audio.mp3',
    endingMusic: '/assets/sounds/end of game.mp3',
    restartLevel: '/assets/sounds/restart_level.mp3',
    newLevel: '/assets/sounds/new level sound.mp3',
    
    fisrtAnswer: '/assets/sounds/answer audios/first_ans.mp3',
    secondAnswer: '/assets/sounds/answer audios/second_ans.mp3',
    thirdAnswer: '/assets/sounds/answer audios/third_ans.mp3',
    finalAnswer: '/assets/sounds/answer audios/final_ans.mp3',
};

export const playBGM = (options = {loop: true, volume: 0.5}) => {
    // if (backgroundAudio) {
    //     stopBackgroundMusic();
    // }
    backgroundAudio = new Audio(sounds.backgroundMusic);
    backgroundAudio.loop = options.loop;
    backgroundAudio.volume = options.volume;
    backgroundAudio.play();
};

export const pauseBGM = () => {
    backgroundAudio.pause();
}

export const playEnding = (options = {loop: false, volume: 0.5}) => {
    let endingAudio = new Audio(sounds.endingMusic);
    endingAudio.loop = options.loop;
    endingAudio.volume = options.volume;
    endingAudio.play();
};

export const playNewLevel = (options = {volume: 1}) => {
    let newLevelAudio = new Audio(sounds.newLevel);
    newLevelAudio.volume = options.volume;
    newLevelAudio.play();
};

export const playRestart = (options = {volume: 1}) => {
    let restartAudio = new Audio(sounds.restartLevel);
    restartAudio.volume = options.volume;
    restartAudio.play();
};

export const playFirst = (options = {volume: 1}) => {
    let firstAudio = new Audio(sounds.fisrtAnswer);
    firstAudio.volume = options.volume;
    firstAudio.play();
};

export const playSecond = (options = {volume: 1}) => {
    let secondAudio = new Audio(sounds.secondAnswer);
    secondAudio.volume = options.volume;
    secondAudio.play();
};

export const playThird = (options = {volume: 1}) => {
    let thirdAudio = new Audio(sounds.thirdAnswer);
    thirdAudio.volume = options.volume;
    thirdAudio.play();
};

export const playFinal = (options = {volume: 1}) => {
    let finalAudio = new Audio(sounds.finalAnswer);
    finalAudio.volume = options.volume;
    finalAudio.play();
};


// export const playRestart = (options = {volume: 0.5}) => {
//     let restartAudio = new Audio(sounds.restartLevel);
//     restartAudio.volume = options.volume;
//     restartAudio.play();
// };

// export const generateSentenceAudio = async (sentenceText) => {
//     try {
//         console.log('Attempting to generate audio for:', sentenceText);
        
//         const apiKey = process.env.REACT_APP_LMNT_API_KEY;
//         if (!apiKey) {
//             throw new Error("REACT_APP_LMNT_API_KEY not found. Please set it in your .env file.");
//         }

//         const response = await fetch('https://api.lmnt.com/synthesize', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify({
//                 text: sentenceText,
//                 voice: 'lily'
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to generate audio');
//         }

//         const { audio } = await response.json();
//         const audioBlob = new Blob([audio], { type: 'audio/wav' });
//         return audioBlob;
//     } catch (error) {
//         console.error('Error generating audio:', error);
//         return null;
//     }
// };

  

