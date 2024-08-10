import React from "react";
import "./input-text.styles.scss";

interface Props {
  lbl: string;
  name: string;
  type?: "text" | "email" | "number" | "password" | "textarea";
  inputValue: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  errorMsg?: string;
  rq?: string;
}

export const CustomInputText: React.FC<Props> = (props) => {
  const {
    lbl,
    name,
    type = "text",
    inputValue,
    handleChange,
    errorMsg,
    rq = "",
  } = props;

  return (
    <div className="rootCustomInputText">
      <div className="containerInput">
        <input
          type={type}
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
          {lbl} {rq && <small>({rq})</small>}
        </label>
      </div>
      <span className="errorMsg">{errorMsg}</span>
    </div>
  );
};
