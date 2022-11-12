import './Board.css';
import { Board } from "./Board";
import { useEffect, useState } from 'react';

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

enum ThemeEnum {
    Dark = "Dark",
    Light = "Light",
}

const THEME_KEY: string = "theme";
const DEBUG_MODE = false;

export const Sudoku = () => {
    const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Light);

    const setTheme = (newTheme: ThemeEnum) => {
        localStorage.setItem(THEME_KEY, newTheme.toString());
        setCurrentTheme(newTheme);
    }

    const invertTheme = () => {
        let newTheme = currentTheme === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark;
        setTheme(newTheme);
    }

    useEffect(() => {
        const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = localStorage.getItem(THEME_KEY);
        let newTheme = storedTheme ? ThemeEnum[storedTheme as keyof typeof ThemeEnum] : undefined;
        if (newTheme) {
            setTheme(newTheme);
        } else {
            setTheme(defaultDark ? ThemeEnum.Dark : ThemeEnum.Light);
        }
        
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            let newTheme = event.matches ? ThemeEnum.Dark : ThemeEnum.Light;
            setTheme(newTheme);
        });
    }, []);

    return (
        <div className="sudokuBoard" data-theme={currentTheme}>
            <h1>Sudoku</h1>
            <button type="button" onClick={invertTheme}>{currentTheme === ThemeEnum.Dark ? 'Light Mode' : 'Dark Mode'}</button>
            <Board
                initialBoard={INITIAL_BOARD}
                debugMode={DEBUG_MODE}/>
            <p>Source available at <a href="https://github.com/killerbat00/sudoku">github.com/killerbat00/sudoku</a></p>
        </div>
    )
}