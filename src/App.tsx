import { Board } from './Board';
import './App.css';

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

function App() {
  return (
    <div className="sudoku-board">
      <h2>Sudoku</h2>
      <div className="game">
        <Board initialBoard={INITIAL_BOARD}/>
      </div>
    </div>
  );
}

export default App;
