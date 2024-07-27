import React, { useCallback, useEffect } from "react";
import { ReducerApp, ServicesApp, initialState, GlobalContext } from ".";

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

  const fetchApi = useCallback(
    (
      page: number = 1,
      pageSize: number = 5,
      body: any = {},
      exactFilters: string[] | any = [],
      rangeFilters: string[] | any = []
    ) => {
      fetchPaginatedData(page, pageSize, body, exactFilters, rangeFilters)
        .then((res) => {
          console.log("Filters:", res?.data);
          dispatch({
            type: "LOAD_DATA",
            payload: res?.data,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    []
  );

  useEffect(() => {
    fetchApi(1, 10);
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch, toggleTheme, fetchApi }}>
      <div id={state.theme}>{children}</div>
    </GlobalContext.Provider>
  );
};
