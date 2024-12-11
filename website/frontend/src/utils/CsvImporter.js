export const importCSV = async (csvPath) => {
    const response = await fetch(csvPath);
    const csvText = await response.text();
    const rows = csvText.split('\n');
    const columnName = rows[0].split(",")
    const wordsDictionary = rows.slice(1).map(row => {
        const pair = row.split(",");
        return {
            word: pair[0],
            sentence: pair[1],
        };
    });
    return wordsDictionary;

};