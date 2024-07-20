import { Routes, Route } from "react-router-dom";
import { HomeLayout } from "@/layout";
import { appRoute } from ".";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={appRoute?.root} element={<HomeLayout />} />
    </Routes>
  );
};
