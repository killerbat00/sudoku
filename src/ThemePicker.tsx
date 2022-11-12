import { useCallback, useEffect, useState } from 'react';
import './Button.css';

enum ThemeEnum {
    Dark = "Dark",
    Light = "Light",
}

const THEME_KEY: string = "theme";

export const ThemePicker = () => {
    const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Light);
    const rootElement: HTMLElement = document.querySelector("html") || new HTMLElement();

    const setTheme = (newTheme: ThemeEnum) => {
        setCurrentTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme.toString());
    }

    const setDarkMode = useCallback(() => {
        setTheme(ThemeEnum.Dark);
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
        rootElement.style.setProperty("--visited-link-color", "var(--visited-link-color-dark)");
    }, [rootElement.style]);

    const setLightMode = useCallback(() => {
        setTheme(ThemeEnum.Light);
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
        rootElement.style.setProperty("--visited-link-color", "var(--visited-link-color-light)");
    }, [rootElement.style]);

    useEffect(() => {
        const currentThemeVal = localStorage.getItem(THEME_KEY);
        if (currentThemeVal) {
            let storedTheme = currentThemeVal as keyof typeof ThemeEnum;
            if (storedTheme === ThemeEnum.Dark) {
                setDarkMode();
            } else {
                setLightMode();
            }
        }

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            const newColorScheme = event.matches ? ThemeEnum.Dark : ThemeEnum.Light;
            if (newColorScheme === ThemeEnum.Dark) {
                setDarkMode();
            } else {
                setLightMode();
            }
        })
    }, [setDarkMode, setLightMode]);

    return (
        <>
            {currentTheme === ThemeEnum.Light && <button type="button" id="darkModeBtn" onClick={setDarkMode}>Dark Mode</button>}
            {currentTheme === ThemeEnum.Dark && <button type="button" id="lightModeBtn" onClick={setLightMode}>Light Mode</button>}
        </>
    );
}