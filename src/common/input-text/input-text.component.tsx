import React from "react";
import "./input-text.styles.scss";

interface Props {
  lbl: string;
  name: string;
  type?: "text" | "email" | "number" | "password" | "textarea";
  textarea?: boolean;
  inputValue: string;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  errorMsg?: string;
  rq?: string;
}

export const CustomInputText: React.FC<Props> = (props) => {
  const {
    lbl,
    name,
    type = "text",
    textarea = false,
    inputValue,
    handleChange,
    errorMsg,
    rq = "",
  } = props;

  return (
    <div className="rootCustomInputText">
      <div className="containerInput">
        {textarea ? (
          <textarea
            id={name}
            className="inputText"
            name={name}
            value={inputValue}
            onChange={handleChange}
            cols={100}
            rows={4}
          ></textarea>
        ) : (
          <input
            type={type}
            id={name}
            className="inputText"
            name={name}
            value={inputValue}
            onChange={handleChange}
          />
        )}
        <label
          htmlFor={name}
          className={`${textarea ? "inputAreaLabel" : "inputLabel"} ${
            inputValue ? "shrink" : ""
          }`}
        >
          {lbl} {rq && <small>({rq})</small>}
        </label>
      </div>
      <span className="errorMsg">{errorMsg}</span>
    </div>
  );
};
