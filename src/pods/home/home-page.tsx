import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "@/core";
import "./home-page.styles.scss";

export const HomePage: React.FC = () => {
  const { fetchPaginatedData } = ServicesApp();
  const [t, i18n] = useTranslation("global");

  //
  useEffect(() => {
    fetchPaginatedData(1, 5, {})
      .then((res) => {
        console.log("Filters:", res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="rootHomePage">
      <h1 className="titleHomePage">{t("home.title")}</h1>
    </div>
  );
};
