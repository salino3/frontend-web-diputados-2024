import axios from "axios";
import { apisApp } from "./apis";

export const ServicesApp = () => {
  const fetchPaginatedData = (
    page = 0,
    pageSize = 10,
    body = {},
    exactFilters = [],
    rangeFilters = []
  ) => {
    return axios.post(`${apisApp.baseBackend}/filter`, {
      page,
      pageSize,
      body,
      exactFilters,
      rangeFilters,
    });
  };

  return {
    fetchPaginatedData,
  };
};
