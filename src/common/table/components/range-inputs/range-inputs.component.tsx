import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import "./range-input.styles.scss";

interface PropsInput {
  lbl: string;
  Styles?: string;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  inputValue?: { min: string; max: string };
  type: React.HTMLInputTypeAttribute | undefined;
  minDate?: any;
  maxDate?: any;
  name: string;
  autoFocus?: boolean;
}

export const InputRange: React.FC<PropsInput> = ({
  lbl,
  Styles,
  inputValue,
  handleChange,
  type,
  name,
  minDate,
  maxDate,
  autoFocus = true,
}) => {
  const [t] = useTranslation("global");

  const { state } = useContext<MyState>(GlobalContext);

  let inputs;

  switch (type) {
    case "range":
      inputs = (
        <div className="table_x02_boxInputsRange">
          <label
            htmlFor={name}
            className={`table_x02_inputLabel ${
              inputValue?.min ? "table_x02_shrink" : ""
            }`}
          >
            {lbl + " min"}
          </label>
          <input
            autoFocus
            type="number"
            id={`${name}-min`}
            className="table_x02_inputText"
            name={`${name}-min`}
            value={inputValue?.min || ""}
            onChange={(event) => handleChange && handleChange(event, 0)}
          />
          <label
            htmlFor={name}
            className={`table_x02_inputLabel_02 ${
              inputValue?.max ? "table_x02_shrink_02" : ""
            }`}
          >
            {lbl + " max"}
          </label>
          <input
            type="number"
            id={`${name}-max`}
            className="table_x02_inputText_02"
            name={`${name}-max`}
            value={inputValue?.max || ""}
            onChange={(event) => handleChange && handleChange(event, 1)}
          />
        </div>
      );
      break;

    case "date":
      inputs = (
        <div className="table_x02_boxInputsRange">
          <label
            htmlFor={name}
            style={{
              color:
                !autoFocus && state?.theme == "dark"
                  ? "var(--color-seven)"
                  : "var(--color-four)",
            }}
            className="table_x02_inputLabel table_x02_shrink"
          >
            {t("table_info.date_min")}
          </label>
          <input
            min={minDate || null}
            autoFocus={autoFocus}
            type="date"
            id={`${name}-min`}
            className="table_x02_inputText"
            name={`${name}-min`}
            value={inputValue?.min || ""}
            onChange={(event) => handleChange && handleChange(event, 0)}
          />

          <label
            htmlFor={name}
            style={{
              color:
                !autoFocus && state?.theme == "dark"
                  ? "var(--color-seven)"
                  : "var(--color-four)",
            }}
            className="table_x02_inputLabel_02 table_x02_shrink_02"
          >
            {t("table_info.date_max")}
          </label>
          <input
            max={maxDate || null}
            type={"date"}
            id={`${name}-max`}
            className="table_x02_inputText_02"
            name={`${name}-max`}
            value={inputValue?.max || ""}
            onChange={(event) => handleChange && handleChange(event, 1)}
          />
        </div>
      );
      break;

    default:
      inputs = <div>{t("table_info.error_type_input")}</div>;
      break;
  }

  return (
    <div className={`table_x02_rootCustomInputText ${Styles}`}>
      <div className="table_x02_containerInput">{inputs}</div>
    </div>
  );
};
