export const blockWord = (wordObj) => {
    const regex = new RegExp(`\\b${wordObj.word}\\b`, 'i');
    return wordObj.sentence.replace(regex, "________");
};

export const numLetters = (wordObj) => {
    const regex = new RegExp(`\\b${wordObj.word}\\b`, 'i');
    const placeholder = "_ ".repeat(wordObj.word.length).trim();
    return wordObj.sentence.replace(regex, placeholder);
};

export const showOneLetter = (wordObj) => {
    const regex = new RegExp(`\\b${wordObj.word}\\b`, 'i');
    // const placeholder = "_ ".repeat(wordObj.word.length).trim();
    const placeholderOne = wordObj.word[0]+ "_ ".repeat(wordObj.word.length - 1).trim();
    return wordObj.sentence.replace(regex, placeholderOne);
};

export const showTwoLetter = (wordObj) => {
    const regex = new RegExp(`\\b${wordObj.word}\\b`, 'i');
    const placeholderTwo = wordObj.word[0]+ "_ ".repeat(wordObj.word.length - 2).trim() + wordObj.word[wordObj.word.length - 1];
    return wordObj.sentence.replace(regex, placeholderTwo);
};


