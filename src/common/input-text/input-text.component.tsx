import React from "react";
import "./input-text.styles.scss";

interface Props {
  lbl: string;
  name: string;
  inputValue: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  errorMsg?: string;
}

export const CustomInputText: React.FC<Props> = (props) => {
  const { lbl, name, inputValue, handleChange, errorMsg } = props;

  return (
    <div className="rootCustomInputText">
      <div className="containerInput">
        <input
          type="text"
          id={name}
          className="inputText"
          name={name}
          value={inputValue}
          onChange={handleChange}
        />
        <label
          htmlFor={name}
          className={`inputLabel ${inputValue ? "shrink" : ""}`}
        >
          {lbl}
        </label>
      </div>
      <span className="errorMsg">{errorMsg}</span>
    </div>
  );
};
