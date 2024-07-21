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

//
interface UPDATE_THEME {
  type: "UPDATE_THEME";
  payload: string;
}

export type All_Actions = UPDATE_THEME;

//
export interface State {
  theme: string;
}

export interface MyState {
  state: State;
  dispatch: React.Dispatch<All_Actions>;
  toggleTheme: () => void;
}

export const initialState: State = {
  theme: "light",
};
