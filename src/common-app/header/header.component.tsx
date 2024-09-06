import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Switcher } from "@/common";
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
        <Switcher />
        <h4>{t("header.languages")}</h4>
        <ul className="listLanguages">
          <li>
            <button
              className={`${i18next.language == "es" && "selectedLanguage"}`}
              onClick={() => changeLanguage("es")}
            >
              es
            </button>
          </li>
          <li>
            <button
              className={`${i18next.language == "en" && "selectedLanguage"}`}
              onClick={() => changeLanguage("en")}
            >
              en
            </button>
          </li>
          {/* <li>
            <button  className={`${i18next.language == "it" && "selectedLanguage"}`} onClick={() => changeLanguage("it")}>it</button>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
