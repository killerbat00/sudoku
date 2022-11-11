import ReactDOM from 'react-dom/client';
import './App.css';
import { Board } from './Board';
import { ThemePicker } from './ThemePicker';

const INITIAL_BOARD = [
    "3", "", "1", "4", "7", "", "", "6", "",
    "", "4", "", "6", "", "", "3", "", "8",
    "8", "", "", "", "9", "", "", "", "",
    "", "", "", "", "8", "", "7", "", "",
    "", "", "", "", "", "", "", "", "4",
    "5", "7", "2", "", "", "6", "", "", "",
    "6", "", "3", "", "", "", "", "2", "7",
    "2", "", "", "9", "5", "7", "", "", "",
    "", "", "8", "", "6", "3", "", "", "1",
]

const DEBUG_MODE = false;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <h1>Sudoku</h1>
    <ThemePicker/>
    <Board
      initialBoard={INITIAL_BOARD}
      debugMode={DEBUG_MODE}/>
  </>
);