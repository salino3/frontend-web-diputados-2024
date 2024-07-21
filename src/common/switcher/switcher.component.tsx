import React from "react";
import ReactSwitch from "react-switch";
import { GlobalContext, MyState } from "@/core";
import "./switcher.styles.scss";

export const Switcher: React.FC = () => {
  //   const [theme, setTheme] = useState<string>("light");
  const { state, toggleTheme } = React.useContext<MyState>(GlobalContext);
  const { theme } = state;
  return (
    <section className="switch">
      <label htmlFor="switcher">
        {theme === "light" ? "Light Mode" : "Dark mode"}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
    </section>
  );
};
