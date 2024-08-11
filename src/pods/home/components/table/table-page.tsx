import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CongresoPreguntas,
  GlobalContext,
  MyState,
  ValuesFilter,
} from "@/core";
import { TableComponet, typesFilter } from "@/common/table";
import { Button } from "@/common";
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
  const [filterDiputadosAutores, setFilterDiputadosAutores] =
    useState<string>("");
  const [filterGrupoParlamentario, setFilterGrupoParlamentario] =
    useState<string>("");
  const [filterComunidadesTags, setFilterComunidadesTags] =
    useState<string>("");
  const [filterProvinciasTags, setFilterProvinciasTags] = useState<string>("");
  const [filterMunicipiosTags, setFilterMunicipiosTags] = useState<string>("");

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
    {
      key: "diputados_autores",
      title: "Diputados autores",
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.text,
      setFilter: setFilterDiputadosAutores,
      filter: filterDiputadosAutores,
      render: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "Grupo_Parlamentario",
      title: "Grupo Parlamentario",
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.select,
      setFilter: setFilterGrupoParlamentario,
      filter: filterGrupoParlamentario,
      valuesFilter: [
        { text: "", value: "" },
        { text: "G.P. Republicano", value: "G.P. Republicano" },
        {
          text: "G.P. Popular en el Congreso",
          value: "G.P. Popular en el Congreso",
        },
        {
          text: "G.P. Confederal de Unidas Podemos-En Comú Podem-Galicia en Común",
          value:
            "G.P. Confederal de Unidas Podemos-En Comú Podem-Galicia en Común",
        },
        { text: "G.P. VOX", value: "G.P. VOX" },
        { text: "G.P. Ciudadanos", value: "G.P. Ciudadanos" },
        { text: "G.P. EH Bildu", value: "G.P. EH Bildu" },
        { text: "G.P. Plural", value: "G.P. Plural" },
        { text: "G.P. Mixto", value: "G.P. Mixto" },
        { text: "G.P. Vasco (EAJ-PNV)", value: "G.P. Vasco (EAJ-PNV)" },
        { text: "G.P. Socialista", value: "G.P. Socialista" },
      ],
      render: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "comunidades_tags",
      title: "Comunidades (Tags)",
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.text,
      setFilter: setFilterComunidadesTags,
      filter: filterComunidadesTags,
      render: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "provincia_tags",
      title: "Provincias (Tags)",
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.text,
      setFilter: setFilterProvinciasTags,
      filter: filterProvinciasTags,
      render: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "municipios_tags",
      title: "Municipios (Tags)",
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.text,
      setFilter: setFilterMunicipiosTags,
      filter: filterMunicipiosTags,
      render: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "url",

      title: "Action",
      render: (_: any, row: CongresoPreguntas) => {
        return (
          <div className="boxBtnRow">
            <Link target="_blank" to={row?.url}>
              <Button txt="Enlace" type="button" />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    let parlamentGroupCorrected =
      filterGrupoParlamentario != ""
        ? "['" + filterGrupoParlamentario + "']"
        : filterGrupoParlamentario;
    //
    let deputiesAuthorsCorrected =
      filterDiputadosAutores != ""
        ? "['" + filterDiputadosAutores + "']"
        : filterDiputadosAutores;
    //
    let deputiesComunidadesCorrected =
      filterComunidadesTags != ""
        ? "['" + filterComunidadesTags + "']"
        : filterComunidadesTags;
    //
    let filterProvinciasCorrected =
      filterProvinciasTags != ""
        ? "['" + filterProvinciasTags + "']"
        : filterProvinciasTags;
    //
    let filterMuniciosCorrected =
      filterMunicipiosTags != ""
        ? "['" + filterMunicipiosTags + "']"
        : filterMunicipiosTags;

    const body = {
      Expediente: filterExpediente,
      Contenido: filterContenido,
      Presentada: filterPresentada,
      diputados_autores: deputiesAuthorsCorrected,
      Grupo_Parlamentario: parlamentGroupCorrected,
      comunidades_tags: deputiesComunidadesCorrected,
      provincia_tags: filterProvinciasCorrected,
      municipios_tags: filterMuniciosCorrected,
      // city: filterCity,
      // email: filterEmail,
      // age: filterAge,
      // birthDate: filterBirthDate,
      // gender: filterGender,
      // employee: filterEmployee,
    };
    console.log("Body:", body);
    const exactFilters = ["Grupo_Parlamentario"];
    const rangeFilters = [""];
    fetchApi(page, pageSize, body, exactFilters, rangeFilters);
  }, [page, pageSize, flag]);

  return (
    <div id={state?.theme} className="rootTablePage">
      <h3 className="titleTable_89">{t("table.table_title")}</h3>
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
