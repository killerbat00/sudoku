# Sudoku

A simple sudoku game written using React functional components in TypeScript.

**Objective**
Complete the grid so that each row, column, and 3x3 block contains the digits from 1 to 9; no duplicates are allowed.

**Features:**
- Arrow key-based navigation.
- Highlighting of selected cell's row, column, and 3x3 block.
- Highlighting of duplicates in the same row, column, and 3x3 block.
- Highlighting of cell's outside of the selected cell's peer groups when their value is equal.
- Notes: Enter multiple digits into a cell to store a list of candidate values for that cell. When a cell has multiple values, the text size is decreased.

**Planned Features:**
- Deterministic sudoku board generator (as a separate package).
- Support for dark mode and themeing.
- Support for saving game state (query param & localstorage).
- Animating wins.

**Unplanned Features:**
- Automatic removal of digits in notes when their location has been found (requires changing solving logic to check against solved state).

**Immediate TODOs:**
- Fix styling on Safari on iOS.
- Make fully responsive (with reasonable minimum width).
- ~~Use colors with higher contrast & clear semantic meaning.~~ \[Done\]

## Live Version
A playable version is available here [https://bhm.sh/sudoku](https://bhm.sh/sudoku).

## Available Scripts

Once you've checked out the code, in the project directory, you can run:

### `npm start`

To run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.