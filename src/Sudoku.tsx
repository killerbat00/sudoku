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
        setCurrentTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme.toString());
        document.body.setAttribute("data-theme", newTheme.toString());
    }

    useEffect(() => {
        const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme) {
            let theme = storedTheme as keyof typeof ThemeEnum;
            setTheme(ThemeEnum[theme]);
        } else {
            setTheme(defaultDark ? ThemeEnum.Dark : ThemeEnum.Light);
        }
        
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            const newTheme = event.matches ? ThemeEnum.Dark : ThemeEnum.Light;
            setTheme(newTheme);
        });
    }, []);

    return (
        <>
            <h1>Sudoku</h1>
            {currentTheme === ThemeEnum.Light && <button type="button" id="darkModeBtn" onClick={() => setTheme(ThemeEnum.Dark)}>Dark Mode</button>}
            {currentTheme === ThemeEnum.Dark && <button type="button" id="lightModeBtn" onClick={() => setTheme(ThemeEnum.Light)}>Light Mode</button>}
            <Board
                initialBoard={INITIAL_BOARD}
                debugMode={DEBUG_MODE}/>
            <p>Source available at <a href="https://github.com/killerbat00/sudoku">github.com/killerbat00/sudoku</a></p>
        </>
    )
}