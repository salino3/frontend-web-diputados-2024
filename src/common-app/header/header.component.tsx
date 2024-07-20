import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./header.styles.scss";

export const HeaderHome: React.FC = () => {
  const [t] = useTranslation("global");

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
    sessionStorage.setItem("selectedLanguage", language);
  };

  return (
    <header className="rootHeaderHome">
      <h2 className="titleHeaderHome">{t("header.title")}</h2>
      <nav className="boxLanguages">
        <h3>{t("header.languages")}</h3>
        <ul className="listLanguages">
          <li>
            <button onClick={() => changeLanguage("es")}>ES</button>
          </li>
          <li>
            <button onClick={() => changeLanguage("en")}>EN</button>
          </li>
          <li>
            <button onClick={() => changeLanguage("it")}>IT</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
