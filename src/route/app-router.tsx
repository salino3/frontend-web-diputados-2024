import { Routes, Route } from "react-router-dom";
import { appRoute } from ".";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={appRoute?.root} element={<></>} />
    </Routes>
  );
};
