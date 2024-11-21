import axios from "axios";
import { apisApp } from "./apis";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// Config Apollo client
export let apolloClient: ApolloClient<any> | null = null;

const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      uri: `${apisApp.baseBackendGraphQL}/graphql`,
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
};

export const ServicesApp = () => {
  const FETCH_PAGINATED_DATA = gql`
    query GetQuestions(
      $page: Int!
      $pageSize: Int!
      $body: CongresoInputType!
      $exactFilters: [String!]
      $rangeFilters: [String!]
    ) {
      questions(
        page: $page
        pageSize: $pageSize
        body: $body
        exactFilters: $exactFilters
        rangeFilters: $rangeFilters
      ) {
        totalProducts
        products {
          Expediente
          Presentada
          Contenido
          diputados_autores
          Grupo_Parlamentario
          comunidades_tags
          provincia_tags
          municipios_tags
          url
        }
      }
    }
  `;

  const fetchPaginatedData = async (
    page = 0,
    pageSize = 10,
    body = {},
    exactFilters = [],
    rangeFilters = []
  ) => {
    if (import.meta.env.VITE_API_TYPE === "GRAPHQL") {
      const { data } = await getApolloClient().query({
        query: FETCH_PAGINATED_DATA,
        variables: { page, pageSize, body, exactFilters, rangeFilters },
      });
      return data?.questions;
    } else if (import.meta.env.VITE_API_TYPE === "REST") {
      const { data } = await axios.post(
        `${apisApp.baseBackend}/filter-by-cache`,
        {
          page,
          pageSize,
          body,
          exactFilters,
          rangeFilters,
        }
      );
      return data;
    } else {
      throw new Error("Invalid API type");
    }
  };

  return {
    fetchPaginatedData,
  };
};
