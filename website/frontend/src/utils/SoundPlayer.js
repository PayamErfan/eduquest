let backgroundAudio = null;

const sounds = {
    backgroundMusic: '/assets/sounds/background audio.mp3',
    endingMusic: '/assets/sounds/end of game.mp3',
    restartLevel: '/assets/sounds/restart_level.mp3',
    newLevel: '/assets/sounds/new level sound.mp3',
    
    fisrtAnswer: '/assets/sounds/first_ans.mp3',
    secondAnswer: '/assets/sounds/second_ans.mp3',
    thirdAnswer: '/assets/sounds/third_ans.mp3',
    finalAnswer: '/assets/sounds/final_ans.mp3',
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

export const playEnding = (options = {volume: 0.5}) => {
    endingAudio = new Audio(sounds.endingMusic);
    endingAudio.volume = options.volume;
    endingAudio.play();
};

export const playNewLevel = (options = {volume: 0.5}) => {
    newLevelAudio = new Audio(sounds.newLevel);
    newLevelAudio.volume = options.volume;
    newLevelAudio.play();
};

