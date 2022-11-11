import { useState } from 'react';
import './Button.css';

export const ThemePicker = () => {
    const [currentTheme, setCurrentTheme] = useState("");
    let newTheme = currentTheme;

    if (currentTheme === "") {
        var fromStorage = localStorage.getItem("theme");
        if (fromStorage === null) {
            newTheme = "light";
        } else {
            newTheme = fromStorage;
        }
        setCurrentTheme(newTheme);
    }

    return (
        <>
            {newTheme === "light" && <button type="button" id="darkModeBtn">Dark Mode</button>}
            {newTheme === "dark" && <button type="button" id="lightModeBtn">Light Mode</button>}
        </>
    );
}