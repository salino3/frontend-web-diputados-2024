import React from "react";
import "./button-app.styles.scss";

interface Button {
  txt: string;
  type: "submit" | "reset" | "button" | undefined;
  customStyles?: string;
}

export const Button: React.FC<Button> = (props) => {
  const { txt, type, customStyles } = props;
  return (
    <div className={`containerButtonApp  ${customStyles}`}>
      <button className="buttonApp_01" type={type}>
        {txt}
      </button>
    </div>
  );
};
