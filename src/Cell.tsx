import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

/* 
Possible Cell States
- Active / Enabled
- - With Value
    - Duplicate (same row, column, square)
    - Same Number (but not row, column, or square)
- - Without Value
    - Peer (same row, column, square)
- Inactive (always has a value) / Disabled
- - With Value
    - Duplicate (same row, column, square)
    - Same Number (but not row, column, or square)
*/

type CellProps = {
    cellIndex: number;
    handleCellChange: (e: ChangeEvent<HTMLInputElement>, cellIndex: number) => void;
    handleCellFocus: (e: FocusEvent<HTMLInputElement>, cellIndex: number) => void;
    handleCellKeyDown: (e: KeyboardEvent<HTMLInputElement>, cellIndex: number) => void;
    selectedCell: number;
    board: string[];
    initialBoard: string[];
    setCellRef: (e: HTMLInputElement | null, cellIndex: number) => void;
    isDuplicate: boolean;
    solved: boolean;
}

type CellCoordinates = {
    row: number;
    peerRow: number;
    col: number;
    peerCol: number;
}

export const getCellCoordinates = (cellIndex: number): CellCoordinates => {
    const row = Math.floor(cellIndex / 9);
    const peerRow = Math.floor(row / 3) * 3;
    const col = cellIndex % 9;
    const peerCol = Math.floor(col / 3) * 3;
    return { row, peerRow, col, peerCol }
}

export const Cell = (props: CellProps): JSX.Element => {
    const { cellIndex, handleCellChange, handleCellFocus, handleCellKeyDown, selectedCell, board, initialBoard, setCellRef, isDuplicate = false, solved = false} = props;
    const classes = ["cell"];
    const val = board[cellIndex];
    let disabled = initialBoard[cellIndex] !== "";

    const cellCoords = getCellCoordinates(cellIndex);

    if (solved) {
        disabled = true;
        classes.push("isSolved");
    } else {
        if (val.length > 1) {
            classes.push("hasNotes");
        }

        if (selectedCell >= 0 && selectedCell !== cellIndex && !isDuplicate) {
            const sCell = getCellCoordinates(selectedCell);

            // In the same row, column, or square
            if ((sCell.row === cellCoords.row || sCell.col === cellCoords.col) || 
                    (sCell.peerRow === cellCoords.peerRow && sCell.peerCol === cellCoords.peerCol)) {
                if (val && val === board[selectedCell]) {
                    classes.push("isDuplicate");
                } else {
                    classes.push("isPeer");
                }
            } else {
                // Another row, column, or square, but has the same value.
                if (val && val === board[selectedCell]) {
                    classes.push("isSameNumber");
                }
            }
        } 
        else if (isDuplicate) {
            classes.push("isDuplicate");
        }
    }

    return (
        <input key={cellIndex} 
            ref={el => setCellRef(el, cellIndex)}
            type="text"
            className={classes.join(" ")}
            onChange={e => handleCellChange(e, cellIndex)} 
            onFocus={e => handleCellFocus(e, cellIndex)}
            onKeyDown={e => handleCellKeyDown(e, cellIndex)}
            value={val}
            disabled={disabled}
            aria-label={`Row ${cellCoords.row+1}, Column ${cellCoords.col+1}`}
            aria-disabled={disabled}
        />
    );
};