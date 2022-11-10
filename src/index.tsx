import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { Board } from './Board';

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div className="sudoku-board">
    <h2>Sudoku</h2>
    <Board initialBoard={INITIAL_BOARD}/>
  </div>
);