import React from "react";
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
  return (
    <div className="rootCustomInputText">
      <div className="containerInput">
        <label
          htmlFor={name}
          style={{
            fontSize: "0.8rem",
          }}
        >
          {lbl}
        </label>
        <select
          value={inputValue}
          onChange={handleChange}
          id={name}
          className="inputSelect"
          name={name}
          multiple={multiple}
        >
          {valuesFilter &&
            valuesFilter?.length &&
            valuesFilter.map((item: ValuesFilter) => (
              <option key={item?.value} value={item?.value}>
                {item?.text}
              </option>
            ))}
        </select>

        {rq && <small>({rq})</small>}
      </div>
      <span className="errorMsg">{errorMsg}</span>
    </div>
  );
};
