import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import { ProviderApp } from "./core/provider-app.tsx";
import global_es from "./i18next/es/global.json";
import global_en from "./i18next/en/global.json";
import global_it from "./i18next/it/global.json";
import "./index.scss";

// Config Apollo client
const client = new ApolloClient({
  uri: `${process.env.VITE_APP_BASE_BACK_GRAPHQL}/graphql`,
  cache: new InMemoryCache(),
});

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
        <ApolloProvider client={client}>
          <ProviderApp>
            <App />
          </ProviderApp>
        </ApolloProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
