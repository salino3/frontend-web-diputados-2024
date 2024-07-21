import React, { useEffect } from "react";
import { GlobalContext } from "./global-context";
import { ReducerApp, ServicesApp, initialState } from ".";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ProviderApp: React.FC<Props> = ({ children }) => {
  const { fetchPaginatedData } = ServicesApp();
  const [state, dispatch] = React.useReducer(ReducerApp, initialState);

  const toggleTheme = () => {
    dispatch({
      type: "UPDATE_THEME",
      payload: state.theme === "light" ? "dark" : "light",
    });
  };

  useEffect(() => {
    fetchPaginatedData(1, 5, {})
      .then((res) => {
        console.log("Filters:", res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch, toggleTheme }}>
      <div id={state.theme}>{children}</div>
    </GlobalContext.Provider>
  );
};
