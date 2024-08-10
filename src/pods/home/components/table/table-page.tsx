import React, { useContext, useState } from "react";
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

  const { state } = useContext<MyState>(GlobalContext);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [flag, setFlag] = useState<boolean>(false);

  // Filters
  const [filterExpediente, setFilterExpediente] = useState<string>("");

  const array: Row[] = [
    {
      key: "Expediente",
      title: "Expediente",
      typeFilter: typesFilter?.text,
      setFilter: setFilterExpediente,
      filter: filterExpediente,
    },
  ];
  console.log("Statte", state);
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
