import { ChangeEvent } from "react";

declare var window: any;

type ColorPickerProps = {
    label: string,
    defaultValue: string | undefined,
    onChangeColor: (value: string) => void,
}

export const ColorPicker = ({ label, defaultValue, onChangeColor }: ColorPickerProps): JSX.Element => {
    const convertedColor = window.w3color(defaultValue).toHexString();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChangeColor(value);
    }

    return (
        <div>
            <input type="color" id={label + "-input"} name={label} value={convertedColor} onChange={handleOnChange}></input>
            <label htmlFor={label + "-input"}>{label}</label>
        </div>
    );
}