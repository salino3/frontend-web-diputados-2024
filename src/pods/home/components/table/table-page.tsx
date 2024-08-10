import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CongresoPreguntas,
  GlobalContext,
  MyState,
  ValuesFilter,
} from "@/core";
import { TableComponet, typesFilter } from "@/common/table";
import "./table-page.styles.scss";

interface Row {
  key?: string;
  title: string;
  tooltip?: (item: any, row: CongresoPreguntas) => any | string | undefined;
  render?: (item: any, row: CongresoPreguntas) => any | string | undefined;
  typeFilter?: any;
  valuesFilter?: ValuesFilter[] | [];
  filter?: any;
  setFilter?: any;
  minDate?: string | number | undefined;
  maxDate?: string | number | undefined;
}

export const TablePage: React.FC = () => {
  const [t] = useTranslation("global");

  const { state, fetchApi } = useContext<MyState>(GlobalContext);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [flag, setFlag] = useState<boolean>(false);

  // Filters
  const [filterExpediente, setFilterExpediente] = useState<string>("");
  const [filterContenido, setFilterContenido] = useState<string>("");
  const [filterPresentada, setFilterPresentada] = useState<string>("");

  const array: Row[] = [
    {
      key: "Expediente",
      title: "Expediente",
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterExpediente,
      filter: filterExpediente,
    },
    {
      key: "Presentada",
      title: "Presentada",
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterPresentada,
      filter: filterPresentada,
    },
    {
      key: "Contenido",
      title: "Contenido",
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterContenido,
      filter: filterContenido,
    },
  ];

  useEffect(() => {
    const body = {
      Expediente: filterExpediente,
      Contenido: filterContenido,
      Presentada: filterPresentada,
      // name: filterName,
      // city: filterCity,
      // email: filterEmail,
      // age: filterAge,
      // birthDate: filterBirthDate,
      // gender: filterGender,
      // employee: filterEmployee,
    };
    console.log("here4", body);
    const exactFilters = [""];
    const rangeFilters = [""];
    fetchApi(page, pageSize, body, exactFilters, rangeFilters);
  }, [page, pageSize, flag]);

  console.log("State", state);
  return (
    <div id={state?.theme} className="rootTablePage">
      <h3>{t("table.table_title")}</h3>
      <div className="containerTablePage">
        <TableComponet
          uniqueKey="Expediente"
          row={array || []}
          setPage={setPage}
          setPageSize={setPageSize}
          page={page}
          pageSize={pageSize}
          setFlag={setFlag}
          rowPerPages={[5, 10, 25]}
          totalData={state?.data?.totalProducts || 0}
          columns={state?.data?.products || []}
        />
      </div>
    </div>
  );
};
