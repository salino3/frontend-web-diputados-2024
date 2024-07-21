import { All_Actions, State } from ".";

export const ReducerApp = (state: State, action: All_Actions) => {
  switch (action.type) {
    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};
