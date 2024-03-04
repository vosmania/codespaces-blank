# Crossword Solver

This project contains a function named [`crosswordSolver`](command:_github.copilot.openSymbolInFile?%5B%22crosswordSolver.js%22%2C%22crosswordSolver%22%5D "crosswordSolver.js") that is able to solve an empty crossword puzzle. The function is located in the file named [`crosswordSolver.js`](command:_github.copilot.openSymbolInFile?%5B%22crosswordSolver.js%22%2C%22crosswordSolver.js%22%5D "crosswordSolver.js").

## Function Description

The [`crosswordSolver`](command:_github.copilot.openSymbolInFile?%5B%22crosswordSolver.js%22%2C%22crosswordSolver%22%5D "crosswordSolver.js") function takes two arguments:

1. An empty puzzle, passed as a string.
2. A list of words to fill in the puzzle (no double words allowed).

The function returns a string representing the puzzle filled with the input words.

### Puzzle Rules

The empty puzzle is a string with the following rules:

- Each character will be either a number, a [`.`](command:_github.copilot.openRelativePath?%5B%22.%22%5D ".") or a `\n`.
- A number represents the number of words starting from the specific position.
- A [`.`](command:_github.copilot.openRelativePath?%5B%22.%22%5D ".") represents a space that does not need to be filled.

### Error Handling

If the puzzle or list of words provided as inputs does not guarantee a unique solution, or any other conditions stated above are not met, the function throws an error.

## Example

Here is an example of how to use the [`crosswordSolver`](command:_github.copilot.openSymbolInFile?%5B%22crosswordSolver.js%22%2C%22crosswordSolver%22%5D "crosswordSolver.js") function:

```javascript
const emptyPuzzle = `2001
0..0
1000
0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];

console.log(crosswordSolver(emptyPuzzle, words));
```

Output:

```
casa
i..l
anta
o..n
```

## Validation

The function [`validateInput`](command:_github.copilot.openSymbolInFile?%5B%22validator.js%22%2C%22validateInput%22%5D "validator.js") from the file [`validator.js`](command:_github.copilot.openSymbolInFile?%5B%22validator.js%22%2C%22validator.js%22%5D "validator.js") is used to validate the input puzzle and words. It checks for conditions such as:

- Puzzle and words types.
- Puzzle and words cannot be empty.
- Puzzle size must be able to contain all words.
- Maximum of 2 words can start from a single tile.
- Expected word count must match input words.
- No duplicate words in input.
- Puzzle rows must be of equal length.
- Puzzle can only contain 0, 1, 2 or a period.

If any of these conditions are not met, the function throws an error.

## How It Works

The [`crosswordSolver`](command:_github.copilot.openSymbolInFile?%5B%22crosswordSolver.js%22%2C%22crosswordSolver%22%5D "crosswordSolver.js") function works by:

1. Validating the input puzzle and words.
2. Sorting the words in descending order of length.
3. Creating copies of the puzzle for solving.
4. Solving the puzzle with the original word order.
5. If the puzzle length is less than 5, solving the puzzle with the reversed word order.
6. Checking for multiple solutions.
7. Returning the solution if it exists, otherwise throwing an error.

The solving process involves recursively trying to insert words horizontally or vertically into the puzzle, and backtracking if the inserted word does not lead to a solution.