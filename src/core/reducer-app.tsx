import { All_Actions, State } from ".";

export const ReducerApp = (state: State, action: All_Actions) => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};
