import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { Cell, getCellCoordinates } from "./Cell";
import { ColorPicker } from "./ColorPicker";

type BoardProps = {
    initialBoard: string[];
    debugMode: boolean;
}

type BoardState = [string[], (newBoard: string[]) => void];
type SelectedCellState = [number, (newSelectedCell: number) => void];

enum ArrowKey {
    Left = "ArrowLeft",
    Right = "ArrowRight",
    Up = "ArrowUp",
    Down = "ArrowDown",
}

const cellRefs = Array(81).fill(null);
const setCellRef = (element: HTMLInputElement | null, cellIndex: number): void => {
    if (element) {
        cellRefs[cellIndex] = element;
    }
};

const focusCell = (cellIndex: number): void => {
    if (cellRefs[cellIndex]) {
        cellRefs[cellIndex].focus();
    }
};

const moveCellFocus = (direction: ArrowKey, currentCellIdx: number, initialBoard: string[]): void => {
    switch (direction) {
        case ArrowKey.Left:
            currentCellIdx -= 1;
            while (initialBoard[currentCellIdx] !== "") {
                currentCellIdx -= 1;
                if (currentCellIdx < 0) {
                    currentCellIdx = 80;
                }
            }
            focusCell(currentCellIdx);
            break;
        case ArrowKey.Right:
            currentCellIdx += 1;
            while (initialBoard[currentCellIdx] !== "") {
                currentCellIdx += 1;
                if (currentCellIdx > 80) {
                    currentCellIdx = 0;
                }
            }
            focusCell(currentCellIdx);
            break;
        case ArrowKey.Up:
            currentCellIdx -= 9;
            while (initialBoard[currentCellIdx] !== "") {
                currentCellIdx -= 9;
                if (currentCellIdx < 0) {
                    currentCellIdx += 90;
                }
            }
            focusCell(currentCellIdx);
            break;
        case ArrowKey.Down:
            currentCellIdx += 9;
            while (initialBoard[currentCellIdx] !== "") {
                currentCellIdx += 9;
                if (currentCellIdx > 80) {
                    currentCellIdx -= 90;
                }
            }
            focusCell(currentCellIdx);
            break;
    }
};

export const Board = ({ initialBoard, debugMode }: BoardProps) => {
    const [board, setBoard]: BoardState = useState(initialBoard);
    const [selectedCell, setSelectedCell]: SelectedCellState = useState(-1);
    const [duplicates, setDuplicates] = useState(new Set());
    const [solved, setSolved] = useState(false);

    const handleCellKeyDown = useCallback(
        (initialBoard: string[]) => (event: KeyboardEvent<HTMLInputElement>, cellIndex: number): void => {
            moveCellFocus(event.key as ArrowKey, cellIndex, initialBoard);
        },
        []
    );
    
    const handleCellInput = (event: ChangeEvent<HTMLInputElement>, cellIndex: number): void => {
        const value = event.target.value;
        if (value === board[cellIndex]) {
            return;
        }

        if (initialBoard[cellIndex] !== "") {
            return;
        }

        const newBoard = [...board];

        if (value === "") {
            newBoard[cellIndex] = value;
            setBoard(newBoard);
            return;
        }

        const parsed = Number.parseInt(value);
        if (Number.isNaN(parsed)) {
            return;
        }

        if (parsed < 1) {
            return;
        }

        if (parsed > 9) {
            if (parsed > 9999) {
                return;
            }
            newBoard[cellIndex] = parsed.toString();
            setBoard(newBoard);
        }

        const newDuplicates = new Set();
        newBoard[cellIndex] = parsed.toString();
        setBoard(newBoard);

        if (newBoard.filter((x) => x === "").length === 0) {
            // row by row
            for (let i = 0; i < newBoard.length; i += 9) {
                let counts = new Array(9).fill(0);
                for (let j = 0; j < 9; j++) {
                    const num = Number.parseInt(newBoard[i+j]);
                    counts[num] += 1;
                    if (counts[num] > 1 && initialBoard[i+j] === "") {
                        newDuplicates.add(i+j);
                    }
                }
            }

            // column by column
            for (let i = 0; i < 9; i++) {
                let counts = new Array(9).fill(0);
                for (let j = 0; j < newBoard.length; j+= 9) {
                    const num = Number.parseInt(newBoard[i+j]);
                    counts[num] += 1;
                    if (counts[num] > 1 && initialBoard[i+j] === "") {
                        newDuplicates.add(i+j);
                    }
                }
            }

            // peer square by peer square
            const cellCoords = getCellCoordinates(cellIndex);
            for (let i = 0; i < 3; i++) {
                let counts = new Array(9).fill(0);
                for (let j = 0; j < 3; j++) {
                    const idx = (cellCoords.peerRow+i)*9+(cellCoords.peerCol+j);
                    const num = Number.parseInt(newBoard[idx]);
                    counts[num] += 1;
                    if (counts[num] > 1 && initialBoard[idx] === "") {
                        newDuplicates.add(idx);
                    }
                }
            }

            setDuplicates(newDuplicates);
            if (Array.from(newDuplicates).length === 0) {
                setSolved(true);
            }
        }
    }

    return (
        <>
            <div className="game-board">
                {[0,1,2,3,4,5,6,7,8].map((i) => {
                    return (
                            <>
                            {[0,1,2,3,4,5,6,7,8].map((j) => {
                                const cellIndex = i*9+j;
                                return (
                                    <Cell
                                        setCellRef={setCellRef}
                                        key={cellIndex}
                                        cellIndex={cellIndex}
                                        handleCellChange={handleCellInput}
                                        handleCellKeyDown={handleCellKeyDown(initialBoard)}
                                        handleCellFocus={(_e, cellIndex) => setSelectedCell(cellIndex)}
                                        board={board}
                                        initialBoard={initialBoard}
                                        selectedCell={selectedCell}
                                        isDuplicate={duplicates.has(cellIndex)}
                                        solved={solved}
                                    />
                                )
                            })}
                            </>
                    );
                })}
            </div>
            {debugMode && <ColorPicker/>}
        </>
    )
};
