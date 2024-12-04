export const randomWordGenerator = (wordDictArray) => {

    let i = 0;
    const wordsList = [];
    
    while (i < 20) {
        const randomIndex = Math.floor(Math.random() * wordDictArray.length);
        const currPair = wordDictArray[randomIndex];
        
        if (!wordsList.includes(currPair.word)) {
            wordsList.push(currPair.word);
            i++;
        }
    }
    
    const wordSentDict = wordsList.map((word) => {
        return wordDictArray.find(item => item.word === word);
    });
    
    return wordSentDict;
}