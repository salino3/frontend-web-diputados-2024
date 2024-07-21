import React, { useState } from "react";
import ReactSwitch from "react-switch";
import "./switcher.styles.scss";

export const Switcher: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <section className="switch">
      <label htmlFor="switcher">
        {theme === "light" ? "Light Mode" : "Dark mode"}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={() =>
          setTheme((prev) => (prev == "light" ? "dark" : "light"))
        }
        checked={theme === "dark"}
      />
    </section>
  );
};
