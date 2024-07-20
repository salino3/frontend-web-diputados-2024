import React from "react";
import { HomePage } from "@/pods";
import "./home.styles.scss";

export const HomeLayout: React.FC = () => {
  return (
    <main className="rootHomeLayout">
      <HomePage />
    </main>
  );
};
