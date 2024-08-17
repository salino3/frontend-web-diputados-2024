import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import global_es from "./i18next/es/global.json";
import global_en from "./i18next/en/global.json";
import global_it from "./i18next/it/global.json";
import i18next from "i18next";
import { ProviderApp } from "./core/provider-app.tsx";
import "./index.scss";

const storedLanguage = sessionStorage.getItem("selectedLanguage") || "es";

i18next.init({
  interpolation: { escapeValue: false },
  lng: storedLanguage,
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
    it: {
      global: global_it,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <ProviderApp>
          <App />
        </ProviderApp>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
