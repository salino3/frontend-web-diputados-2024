import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import { SearchPage, TablePage } from "./components";
import "./home-page.styles.scss";

interface Tabs {
  id: string;
  title: string;
  component: JSX.Element;
}

export const HomePage: React.FC = () => {
  const [t] = useTranslation("global");

  const { state } = useContext<MyState>(GlobalContext);

  const [selectedTab, setSelectedTab] = useState<string>("search");

  const tabs: Tabs[] = [
    {
      id: "search",
      title: "home.search",
      component: <SearchPage setSelectedTab={setSelectedTab} />,
    },
    {
      id: "table",
      title: "home.table",
      component: <TablePage />,
    },
  ];

  return (
    <div className="rootHomePage">
      <div className="topContainerHome">
        <div className="contentTopContentHome">
          <h1 className="titleHomePage">{t("home.title")}</h1>
        </div>

        <div className="boxTabs">
          {tabs &&
            tabs.map((tab) => (
              <div key={tab?.id}>
                <span
                  id={state?.theme}
                  key={tab.id}
                  className={`tab tab_${tab?.id} ${
                    tab?.id === selectedTab
                      ? `${
                          state?.theme == "dark"
                            ? "selectedTabDark"
                            : "selectedTabLight"
                        } `
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab?.id)}
                >
                  {t(tab?.title)}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="boxContent">
        {tabs && tabs.find((tab: Tabs) => tab?.id == selectedTab)?.component}
      </div>
    </div>
  );
};
