import { ChangeEvent, useState } from "react";

declare var window: any;

type ColorInputProps = {
    label: string,
    defaultValue: string | undefined,
    onChangeColor: (value: string) => void,
}

const ColorInput = ({ label, defaultValue, onChangeColor }: ColorInputProps): JSX.Element => {
    const convertedColor = window.w3color(defaultValue).toHexString();
    const [colorValue, setColorValue] = useState(convertedColor);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChangeColor(value);
        setColorValue(value);
    }

    return (
        <div>
            <input
                type="color"
                id={label + "-input"}
                name={label}
                value={colorValue}
                onChange={handleOnChange}/>
            <label htmlFor={label + "-input"}>{`${label} ${colorValue}`}</label>
        </div>
    );
}

export const ColorPicker = () => {
    const [variables, setVariables] = useState(new Map());
    let rootElement: HTMLElement | null = document.querySelector("html");
    if (!rootElement) return <></>;

    // normalize a --css-variable-name to a human readable Css Variable Name.
    const normalize = (prefixedVar: string): string => {
        if (prefixedVar === "" || prefixedVar.length === 0 || !prefixedVar.startsWith("--")) { return ""; }
        const withoutDashes = prefixedVar.slice(2);
        const splitUp = withoutDashes.split("-");
        return splitUp.map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ");
    }

    // denormalize a human readable Css Variable Name into a --css-variable-name.
    const denormalize = (normalizedStr: string): string => {
        if (normalizedStr === "" || normalizedStr.length === 0) { return ""; }
        const smallAndSplit = normalizedStr.split(" ").map(w => w[0].toLowerCase() + w.substring(1));
        smallAndSplit.unshift("-"); // join will add the additional `-`
        return smallAndSplit.join("-");
    }

    // populate variable map on 'first' render
    if (variables.size === 0) {
        const newVariables = new Map(variables);
        let rootStyle: CSSStyleDeclaration = getComputedStyle(rootElement);
        let numVars = rootStyle.length;

        for (let i = 0; i < numVars; i++) {
            let varName = rootStyle.item(i);
            if (!varName) continue;
            if (!varName.startsWith("--")) continue;

            let varValue = rootStyle.getPropertyValue(varName);
            if (!varValue) continue;

            newVariables.set(normalize(varName), varValue);
        }
        setVariables(newVariables);
    }

    const setVariable = (variableName: string, value: string) => {
        rootElement?.style.setProperty(denormalize(variableName), value);
        const newVariables = new Map(variables);
        newVariables.set(variableName, value);
        setVariables(newVariables);
    }

    return (
        <div className="colors">
            {Array.from(variables.keys()).map((value, index) => {
                return <ColorInput
                            key={index}
                            label={value}
                            defaultValue={variables.get(value)}
                            onChangeColor={(x) => setVariable(value, x)} />
            })}
        </div>
    );
}