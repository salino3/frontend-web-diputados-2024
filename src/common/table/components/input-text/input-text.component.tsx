import React from "react";
import { ValuesFilter } from "@/pods";
import "./input-text.styles.scss";

interface PropsInput {
  lbl: string;
  Styles?: string;
  handleChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    | undefined;
  inputValue?: any;
  type: React.HTMLInputTypeAttribute | undefined;
  name: string;
  valuesFilter?: ValuesFilter[] | [];
}

export const CustomInputText: React.FC<PropsInput> = ({
  lbl,
  Styles,
  inputValue,
  handleChange,
  type,
  name,
  valuesFilter,
}) => {
  let input;

  switch (type) {
    case "select":
      input = (
        <select
          value={inputValue}
          autoFocus
          onChange={handleChange}
          id={name}
          className="table_x02_inputText"
          name={name}
        >
          {valuesFilter &&
            valuesFilter?.length &&
            valuesFilter.map((item: ValuesFilter) => (
              <option key={item?.value} value={item?.value}>
                {item?.text}
              </option>
            ))}
        </select>
      );
      break;
    case "multiselect":
      input = (
        <select
          multiple
          value={inputValue || []}
          autoFocus
          onChange={handleChange}
          id={name}
          className="table_x02_inputTextMultiselect"
          name={name}
        >
          {valuesFilter &&
            valuesFilter?.length &&
            valuesFilter.map((item: ValuesFilter) => (
              <option
                className="table_x02_option"
                key={item?.value}
                value={item?.value}
              >
                {item?.text}
              </option>
            ))}
        </select>
      );
      break;

    default:
      input = (
        <input
          autoFocus
          type={type}
          id={name}
          className="table_x02_inputText"
          name={name}
          value={inputValue}
          onChange={handleChange}
        />
      );
      break;
  }

  return (
    <div className={`table_x02_rootCustomInputText ${Styles}`}>
      <div className="table_x02_containerInput">
        {input}
        <label
          htmlFor={name}
          className={`table_x02_inputLabel ${
            inputValue || type == "multiselect" ? "table_x02_shrink" : ""
          }`}
        >
          {lbl}
        </label>
      </div>
    </div>
  );
};
