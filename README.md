# Sudoku

A simple sudoku game written using React functional components in TypeScript.

**Objective**
Complete the grid so that each row, column, and 3x3 block contains the digits from 1 to 9; no duplicates are allowed.

**Features**
- Arrow key-based navigation.
- Highlighting of selected cell's row, column, and 3x3 block.
- Highlighting of duplicates in the same row, column, and 3x3 block.
- Highlighting of cell's outside of the selected cell's peer groups when their value is equal.

**Planned Features**
- Deterministic sudoku board generator (as a separate package).
- Support for dark mode and themeing.
- Support for saving game state (query param & localstorage).
- Animating wins.

**Unplanned Features**
- Automatic removal of digits in notes when their location has been found (requires changing solving logic to check against solved state).


## Available Scripts

Once you've checked out the code, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.