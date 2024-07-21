import React from "react";
import { useTranslation } from "react-i18next";
import "./home-page.styles.scss";

export const HomePage: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <div className="rootHomePage">
      <h1 className="titleHomePage">{t("home.title")}</h1>
    </div>
  );
};
