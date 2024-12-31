import { Routes, Route } from "react-router-dom";
import { Error404Layout, HomeLayout } from "@/layout";
import { appRoute } from ".";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={appRoute?.root} element={<HomeLayout />} />
      <Route path={appRoute?.error_404} element={<Error404Layout />} />
    </Routes>
  );
};
