import React from "react";
import "./button-app.styles.scss";

interface Button {
  txt: string;
  type: "submit" | "reset" | "button" | undefined;
  customStyles?: string;
  disabled?: boolean;
  click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button: React.FC<Button> = (props) => {
  const { txt, type, customStyles, disabled = false, click } = props;
  return (
    <div className={`containerButtonApp  ${customStyles}`}>
      <button
        onClick={click}
        disabled={disabled}
        className="buttonApp_01"
        type={type}
      >
        {txt}
      </button>
    </div>
  );
};
