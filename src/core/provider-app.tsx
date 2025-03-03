import React, { useCallback } from "react";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix";
import {
  ReducerApp,
  ServicesApp,
  initialState,
  GlobalContext,
  FormData,
} from ".";

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
    async (
      page: number = 1,
      pageSize: number = 5,
      body: any = {},
      exactFilters: string[] | any = [],
      rangeFilters: string[] | any = []
    ) => {
      Loading.circle();
      return await fetchPaginatedData(
        page,
        pageSize,
        body,
        exactFilters,
        rangeFilters
      )
        .then((res) => {
          console.log("execute endpoint!!", res);
          dispatch({
            type: "LOAD_DATA",
            payload: res,
          });
        })
        .catch((err) => {
          console.error(err);
          Report.failure("Error", "Error loading data", "OK");
        })
        .finally(() => Loading.remove());
    },
    []
  );

  // Clear filters data
  const initialFilters: FormData = {
    Expediente: "",
    Contenido: "",
    Presentada: {
      min: "",
      max: "",
    },
    diputados_autores: [],
    Grupo_Parlamentario: [],
    comunidades_tags: [],
    provincia_tags: [],
    municipios_tags: [],
  };

  return (
    <GlobalContext.Provider
      value={{ state, dispatch, toggleTheme, fetchApi, initialFilters }}
    >
      <div id={state.theme}>{children}</div>
    </GlobalContext.Provider>
  );
};
