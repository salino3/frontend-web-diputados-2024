import React from "react";
import { MyState } from "./interfaces";

export const GlobalContext = React.createContext<MyState>({} as MyState);
