import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import "./table-page.styles.scss";

export const TablePage: React.FC = () => {
  const [t] = useTranslation("global");

  const { state } = useContext<MyState>(GlobalContext);

  return (
    <div id={state?.theme} className="rootTablePage">
      <h3>{t("table.table_title")}</h3>
    </div>
  );
};
