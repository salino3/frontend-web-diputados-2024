import React from "react";
import { GlobalContext, MyState } from "@/core";
import { HeaderHome } from "@/common-app";
import { HomePage } from "@/pods";
import "./home.styles.scss";

export const HomeLayout: React.FC = () => {
  const { fetchApi } = React.useContext<MyState>(GlobalContext);

  React.useEffect(() => {
    fetchApi(1, 10);
  }, []);

  return (
    <main className="rootHomeLayout">
      <HeaderHome />
      <HomePage />
    </main>
  );
};
