import React from "react";
import { HeaderHome } from "@/common-app";
import { Error404 } from "@/pods";
import "./error404.styles.scss";

export const Error404Layout: React.FC = () => {
  return (
    <main className="rootError404Layout">
      <HeaderHome />
      <Error404 />
    </main>
  );
};
