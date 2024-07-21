import React from "react";
import ReactSwitch from "react-switch";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import "./switcher.styles.scss";

export const Switcher: React.FC = () => {
  const [t] = useTranslation("global");

  const { state, toggleTheme } = React.useContext<MyState>(GlobalContext);
  const { theme } = state;
  return (
    <section className="switch">
      <label htmlFor="switcher">
        {theme === "light" ? t("header.light_mode") : t("header.dark_mode")}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
    </section>
  );
};
