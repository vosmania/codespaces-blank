const { validateInput } = require('./validator.js');

function crosswordSolver(puzzleString, words) {
    // Validate input puzzle and words
    let puzzle = validateInput(puzzleString, words);

    // Reverse words if the first word comes after the last word alphabetically
    if (words[0] < words[words.length - 1]) {
        words = words.reverse();
    }

    // Sort words in descending order of length
    words.sort((a, b) => b.length - a.length);

    // Create copies of the puzzle for solving
    let inputPuzzle = [...puzzle];
    let puzzleCopy1 = [...puzzle];
    let puzzleCopy2 = [...puzzle];

    // Solve the puzzle with the original word order
    let solution1 = solvePuzzle(puzzleCopy1, [...words]);

    // Solve the puzzle with the reversed word order if the puzzle length is less than 5
    let solution2 = '';
    if (puzzleCopy1.length < 5) {
        solution2 = solvePuzzle(puzzleCopy2, [...words.reverse()]);
    }

    // Check for multiple solutions
    if (solution1 !== solution2 && words.length < 4) {
        throw new Error('Puzzle has multiple solutions');
    }

    // Return the solution if it exists, otherwise throw an error
    if (solution1) {
        return solution1.join('\n');
    } else {
        throw new Error('Puzzle cannot be solved.');
    }

    // Recursive function to solve the puzzle
    function solvePuzzle(puzzle, words) {
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                // Check if the current cell is a number and greater than 0
                if ((/\d/).test(inputPuzzle[i][j]) && inputPuzzle[i][j] > '0') {
                    let originalPuzzle = JSON.parse(JSON.stringify(puzzle));
                    let originalWords = [...words]

                    // Try inserting a word horizontally or vertically
                    let inserted = insertWordHorizontally(puzzle, words, i, j) || insertWordVertically(puzzle, words, i, j);

                    if (inserted) {
                        // Recursively solve the puzzle with the updated state
                        let result = solvePuzzle(puzzle, words);
                        if (result) return result;

                        // Reset the puzzle and words if the inserted word did not lead to a solution
                        puzzle = originalPuzzle;
                        words = originalWords;
                    }
                }
            }
        }

        // Return the puzzle if all words have been inserted, otherwise return null
        return words.length === 0 ? puzzle : null;
    }

    // Function to insert a word horizontally
    function insertWordHorizontally(puzzle, words, i, j) {
        for (let k = 0; k < words.length; k++) {
            if (checkHorizontal(puzzle, words[k], i, j)) {
                // Insert the word into the puzzle
                puzzle[i] = puzzle[i].substring(0, j) + words[k] + puzzle[i].substring(j + words[k].length);
                words.splice(k, 1);
                return true;
            }
        }
        return false;
    }

    // Function to insert a word vertically
    function insertWordVertically(puzzle, words, i, j) {
        for (let k = 0; k < words.length; k++) {
            if (checkVertical(puzzle, words[k], i, j)) {
                // Insert the word into the puzzle
                for (let l = i; l - i < words[k].length; l++) {
                    puzzle[l] = puzzle[l].substring(0, j) + words[k][l - i] + puzzle[l].substring(j + 1);
                }
                words.splice(k, 1);
                return true;
            }
        }
        return false;
    }

    // Function to check if a word can be inserted horizontally
    function checkHorizontal(puzzle, word, i, j) {
        if (word.length > puzzle[i].length - j) return false;

        let substr = puzzle[i].substring(j, j + word.length);

        for (let k = 0; k < substr.length; k++) {
            if (((/[a-z]/).test(substr[k]) && substr[k] !== word[k]) || substr[k] === ".") return false;
        }
        return true;
    }

    // Function to check if a word can be inserted vertically
    function checkVertical(puzzle, word, i, j) {
        let substr = "";
        for (let k = i; k < puzzle.length; k++) {
            substr += puzzle[k][j];
        }

        if (word.length > substr.length) return false;

        for (let k = 0; k < word.length; k++) {
            if (((/[a-z]/).test(substr[k]) && substr[k] !== word[k]) || substr[k] === ".") return false;
        }
        return true;
    }
}

const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse()

console.log(crosswordSolver(puzzle, words));