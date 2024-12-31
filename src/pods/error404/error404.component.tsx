import React from "react";
import { Link } from "react-router-dom";
import { appRoute } from "@/route";
import "./error404.styles.scss";

export const Error404: React.FC = () => {
  return (
    <div className="containerError404">
      <h1 className="titleError404">Error 404: Page Not Found</h1>
      <Link className="routeError404" to={appRoute?.root}>
        <img src="assets/icons/arrow-back.svg" alt="Arrow go back" />
        <span>Go back</span>
      </Link>
      <div className="boxImageError">
        <img src="assets/images/img_error_404.webp" alt="Image Error 404" />
      </div>
    </div>
  );
};
