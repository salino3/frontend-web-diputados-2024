import axios from "axios";
import { apisApp } from "./apis";

export const ServicesApp = () => {
  const fetchPaginatedData = async (
    page: number = 0,
    pageSize: number = 10,
    body: any = {},
    exactFilters: string[] = [],
    rangeFilters: string[] = []
  ) => {
    await axios
      .post(apisApp?.baseBackend + "/filters", {
        page,
        pageSize,
        body,
        exactFilters,
        rangeFilters,
      })
      .then((res) => {
        console.log("Filters: " + res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    fetchPaginatedData,
  };
};
