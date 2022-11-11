import { useEffect, useState } from 'react';
import './Button.css';

enum ThemeEnum {
    Dark = "dark",
    Light = "light",
}

export const ThemePicker = () => {
    const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Light);
    const rootElement: HTMLElement = document.querySelector("html") || new HTMLElement();

    const setDarkMode = () => {
        setCurrentTheme(ThemeEnum.Dark);
        rootElement.style.setProperty("--main-background-color", "var(--main-background-dark)");
        rootElement.style.setProperty("--main-text-color", "var(--main-text-color-dark)");
        rootElement.style.setProperty("--cell-solved-color", "var(--cell-solved-color-dark)");
        rootElement.style.setProperty("--border-color", "var(--border-color-dark)");
        rootElement.style.setProperty("--active-cell-same-number-color", "var(--active-cell-same-number-color-dark)");
        rootElement.style.setProperty("--disabled-cell-same-number-color", "var(--disabled-cell-same-number-color-dark)");
        rootElement.style.setProperty("--active-cell-peer-color", "var(--active-cell-peer-color-dark)");
        rootElement.style.setProperty("--disabled-cell-peer-color", "var(--disabled-cell-peer-color-dark)");
        rootElement.style.setProperty("--active-cell-duplicate-color", "var(--active-cell-duplicate-color-dark)");
        rootElement.style.setProperty("--disabled-cell-duplicate-color", "var(--disabled-cell-duplicate-color-dark)");
        rootElement.style.setProperty("--disabled-cell-background-color", "var(--disabled-cell-background-color-dark)");
        rootElement.style.setProperty("--button-background", "var(--button-background-dark)");
        rootElement.style.setProperty("--button-text-color", "var(--button-text-color-dark)");
        rootElement.style.setProperty("--button-active-border-color", "var(--button-active-border-color-dark)");
    }

    const setLightMode = () => {
        setCurrentTheme(ThemeEnum.Light);
        rootElement.style.setProperty("--main-background-color", "var(--main-background-light)");
        rootElement.style.setProperty("--main-text-color", "var(--main-text-color-light)");
        rootElement.style.setProperty("--cell-solved-color", "var(--cell-solved-color-light)");
        rootElement.style.setProperty("--border-color", "var(--border-color-light)");
        rootElement.style.setProperty("--active-cell-same-number-color", "var(--active-cell-same-number-color-light)");
        rootElement.style.setProperty("--disabled-cell-same-number-color", "var(--disabled-cell-same-number-color-light)");
        rootElement.style.setProperty("--active-cell-peer-color", "var(--active-cell-peer-color-light)");
        rootElement.style.setProperty("--disabled-cell-peer-color", "var(--disabled-cell-peer-color-light)");
        rootElement.style.setProperty("--active-cell-duplicate-color", "var(--active-cell-duplicate-color-light)");
        rootElement.style.setProperty("--disabled-cell-duplicate-color", "var(--disabled-cell-duplicate-color-light)");
        rootElement.style.setProperty("--disabled-cell-background-color", "var(--disabled-cell-background-color-light)");
        rootElement.style.setProperty("--button-background", "var(--button-background-light)");
        rootElement.style.setProperty("--button-text-color", "var(--button-text-color-light)");
        rootElement.style.setProperty("--button-active-border-color", "var(--button-active-border-color-light)");
    }

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            var newColorScheme = event.matches ? ThemeEnum.Dark : ThemeEnum.Light;
            if (newColorScheme === ThemeEnum.Dark) {
                setDarkMode();
            } else {
                setLightMode();
            }
        })
    });

    return (
        <>
            {currentTheme === ThemeEnum.Light && <button type="button" id="darkModeBtn" onClick={setDarkMode}>Dark Mode</button>}
            {currentTheme === ThemeEnum.Dark && <button type="button" id="lightModeBtn" onClick={setLightMode}>Light Mode</button>}
        </>
    );
}