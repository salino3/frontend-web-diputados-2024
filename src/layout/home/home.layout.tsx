import React from "react";
import { HeaderHome } from "@/common-app";
import { HomePage } from "@/pods";
import "./home.styles.scss";

export const HomeLayout: React.FC = () => {
  return (
    <main className="rootHomeLayout">
      <HeaderHome />
      <HomePage />
    </main>
  );
};
