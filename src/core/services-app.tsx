import axios from "axios";
import { apisApp } from "./apis";

export const ServicesApp = () => {
  //
  const getWordPrefix = (str: string, word: string = "@") => {
    if (str && typeof str === "string") {
      const atIndex = str.indexOf(word);
      if (atIndex === -1) return str;
      return str.substring(0, atIndex) + `${word}...`;
    } else {
      return "";
    }
  };

  //
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
    getWordPrefix,
    fetchPaginatedData,
  };
};
