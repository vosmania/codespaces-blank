function validateInput(puzzle, words) {
    if (typeof puzzle !== 'string') throw new Error('Puzzle must be a string.');
    if (!Array.isArray(words)) throw new Error('Words must be an array.');
    if (puzzle === '') throw new Error('Puzzle cannot be empty.');
    if (words.length === 0) throw new Error('Words array cannot be empty.');

    const filteredPuzzle = puzzle.replace(/[\n.0]/g, '');
    const puzzleSize = puzzle.replace(/\n/g, '').length;
    const characterCount = words.reduce((total, word) => total + word.length, 0);

    if (characterCount > puzzleSize) throw new Error('Puzzle cannot contain all words.');

    const amountOfWords = words.length;
    const expectedAmountOfWords = Array.from(filteredPuzzle).reduce((total, char) => {
        const parsedChar = parseInt(char);
        if (parsedChar > 2) throw new Error('Maximum of 2 words can start from a single tile.');
        return total + parsedChar;
    }, 0);

    if (amountOfWords !== expectedAmountOfWords) throw new Error('Mismatch between expected word count and input words.');

    if (new Set(words).size !== words.length) throw new Error('Duplicate words in input.');

    const puzzleRows = puzzle.split('\n');
    const length = puzzleRows[0].length;
    const validCharacters = ['0', '1', '2', '.'];

    puzzleRows.forEach(row => {
        if (row.length !== length) throw new Error('Puzzle rows are not of equal length.');
        if (Array.from(row).some(char => !validCharacters.includes(char))) throw new Error('Puzzle can only contain 0, 1, 2 or a period.');
    });

    return puzzleRows;
}

module.exports = { validateInput };