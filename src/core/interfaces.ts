export interface CongresoPreguntas {
  Expediente: string;
  Presentada: string;
  Contenido: string;
  url: string;
  diputados_autores: string;
  Grupo_Parlamentario: string;
  comunidades_tags: string;
  provincia_tags: string;
  municipios_tags: string;
}

export interface Data {
  totalProducts: number;
  products: CongresoPreguntas[];
}

//
interface LOAD_DATA {
  type: "LOAD_DATA";
  payload: Data;
}

interface UPDATE_THEME {
  type: "UPDATE_THEME";
  payload: string;
}

export type All_Actions = UPDATE_THEME | LOAD_DATA;

//
export interface State {
  theme: string;
  data: Data;
}

export interface MyState {
  state: State;
  dispatch: React.Dispatch<All_Actions>;
  toggleTheme: () => void;
  fetchApi: (
    page?: number,
    pageSize?: number,
    body?: any,
    exactFilters?: string[] | any,
    rangeFilters?: string[] | any
  ) => void;
}

export const initialState: State = {
  theme: "light",
  data: {
    totalProducts: 0,
    products: [],
  },
};
