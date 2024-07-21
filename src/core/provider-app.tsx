import React from "react";
import { GlobalContext } from "./global-context";
import { ReducerApp, initialState } from ".";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ProviderApp: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(ReducerApp, initialState);

  const toggleTheme = () => {
    dispatch({
      type: "UPDATE_THEME",
      payload: state.theme === "light" ? "dark" : "light",
    });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch, toggleTheme }}>
      <div id={state.theme}>{children}</div>
    </GlobalContext.Provider>
  );
};
