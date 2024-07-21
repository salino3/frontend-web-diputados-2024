import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import "./home-page.styles.scss";
import { GlobalContext } from "@/core";
import { Link } from "react-router-dom";

interface Tabs {
  id: string;
  title: string;
  component: JSX.Element;
}

export const HomePage: React.FC = () => {
  const [t] = useTranslation("global");

  const { state } = useContext(GlobalContext);

  const tabs: Tabs[] = [
    {
      id: "search",
      title: t("home.search"),
      component: <>Search</>,
    },
    {
      id: "table",
      title: t("home.table"),
      component: <>Table</>,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<string>("search");

  const link: string =
    "https://datosabiertos.malaga.eu/recursos/ambiente/contenedores/da_medioAmbiente_contenedoresRopa-25830.csv";

  return (
    <div className="rootHomePage">
      <div className="topContainerHome">
        <div className="contentTopContentHome">
          <h1 className="titleHomePage">{t("home.title")}</h1>
          <h2 className="subTitleHomePage">
            URL: <Link to={link}>{link}</Link>
          </h2>
          <p>
            {t("home.title")}. {t("previsualization")}{" "}
            <Link to={"#"}>Geoportal</Link>
          </p>
        </div>

        <div className="boxTabs">
          {tabs &&
            tabs.map((tab) => (
              <div>
                <span
                  id={state.theme}
                  key={tab.id}
                  className={`tab tab_${tab?.id} ${
                    tab?.id === selectedTab ? "selectedTab" : ""
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.title}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="boxContent">
        {tabs && tabs.find((tab) => tab?.id == selectedTab)?.component}
      </div>
    </div>
  );
};
