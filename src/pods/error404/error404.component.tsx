import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import { appRoute } from "@/route";
import "./error404.styles.scss";

export const Error404: React.FC = () => {
  const [t] = useTranslation("global");

  const { state } = React.useContext<MyState>(GlobalContext);
  return (
    <div className="containerError404">
      <h1 className="titleError404">{t("error404.title")}</h1>
      <Link className="routeError404" to={appRoute?.root}>
        <img
          src={`assets/icons/arrow-back-${state?.theme}.svg`}
          alt="Arrow go back"
        />
        <span>{t("error404.back_home")}</span>
      </Link>

      <div className="boxImageError">
        <img src="assets/images/img_error_404.webp" alt={t("error404.alt")} />
      </div>
    </div>
  );
};
