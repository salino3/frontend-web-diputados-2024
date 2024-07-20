import React, { useEffect } from "react";
import "./home-page.styles.scss";
import { ServicesApp } from "@/core";

export const HomePage: React.FC = () => {
  const { fetchPaginatedData } = ServicesApp();
  useEffect(() => {
    fetchPaginatedData(1, 5, {})
      .then((res) => {
        console.log("Filters:", res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="rootHomePage">
      <h1 className="titleHomePage">Home</h1>
    </div>
  );
};
