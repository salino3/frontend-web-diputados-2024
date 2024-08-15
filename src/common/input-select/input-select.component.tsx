import React, { useState } from "react";
import { ValuesFilter } from "@/core";
import "./input-select.styles.scss";

interface Props {
  lbl: string;
  handleChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    | undefined;
  inputValue?: any;
  name: string;
  valuesFilter?: ValuesFilter[] | [];
  errorMsg?: string;
  rq?: string;
  multiple?: boolean;
}

export const CustomInputSelect: React.FC<Props> = ({
  lbl,
  inputValue,
  handleChange,
  name,
  valuesFilter,
  errorMsg,
  rq,
  multiple = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`rootCustomInputText  ${multiple ? "multiple" : ""}`}>
      <div className="containerInput">
        <label
          htmlFor={name}
          className={`${
            inputValue?.length > 0 || isFocused ? "bottomTitleInputSelect" : ""
          }`}
          style={{
            position: multiple ? "absolute" : "initial",
            bottom: inputValue?.length > 0 || isFocused ? "" : "100%",
            fontSize: "0.8rem",
          }}
        >
          {lbl}
        </label>
        <select
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={name}
          className={`inputSelect ${multiple && isFocused ? "focus" : ""}
            
            ${
              inputValue.length > 0 && multiple && !isFocused
                ? "openInputMultiselect"
                : ""
            }
            `}
          name={name}
          multiple={(isFocused && multiple) || (inputValue && multiple)}
        >
          {valuesFilter &&
            valuesFilter.length &&
            valuesFilter.map((item: ValuesFilter) => (
              <option key={item?.value} value={item?.value}>
                {(isFocused && multiple) ||
                (multiple && inputValue.length > 0) ||
                !multiple
                  ? item?.text
                  : ""}
              </option>
            ))}
        </select>

        {rq && <small>({rq})</small>}
      </div>
      <span className="errorMsg">{errorMsg}</span>
    </div>
  );
};
