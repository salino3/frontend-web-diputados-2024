import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  arrayDiputados_autores,
  arrayGrupo_Parlamentario,
  CongresoPreguntas,
  GlobalContext,
  MyState,
  ValuesFilter,
} from "@/core";
import { TableComponet, typesFilter } from "@/common/table";
import { Button } from "@/common";
import "./table-page.styles.scss";
import {
  newArrayComunidades_tags_01,
  newArrayProvincias_tags_01,
  newArrayMunicipios_tags_01,
  newArrayMunicipios_tags_02,
} from "@/core/data";

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

interface Props {
  refreshTable: boolean;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TablePage: React.FC<Props> = (props) => {
  const { refreshTable, setRefreshTable } = props;

  const [t] = useTranslation("global");

  const { state, fetchApi } = useContext<MyState>(GlobalContext);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
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
      title: t("general.expedient"),
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterExpediente,
      filter: filterExpediente,
    },
    {
      key: "Presentada",
      title: t("general.presented"),
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterPresentada,
      filter: filterPresentada,
    },
    {
      key: "Contenido",
      title: t("general.content"),
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: setFilterContenido,
      filter: filterContenido,
    },

    {
      key: "Grupo_Parlamentario",
      title: t("general.parliamentary_group"),
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.multiselect,
      setFilter: setFilterGrupoParlamentario,
      filter: filterGrupoParlamentario,
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...arrayGrupo_Parlamentario.sort((a, b) =>
          a?.text?.localeCompare(b?.text)
        ),
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
      key: "diputados_autores",
      title: t("general.author_deputies"),
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...arrayDiputados_autores?.sort((a, b) =>
          a?.text?.localeCompare(b?.text)
        ),
      ],
      typeFilter: typesFilter?.multiselect,
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
      key: "comunidades_tags",
      title: t("general.communities_tags"),
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },

      typeFilter: typesFilter?.multiselect,
      setFilter: setFilterComunidadesTags,
      filter: filterComunidadesTags,
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...newArrayComunidades_tags_01.sort((a, b) =>
          a?.text?.localeCompare(b?.text)
        ),
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
      key: "provincia_tags",
      title: t("general.provinces_tags"),
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.multiselect,
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...newArrayProvincias_tags_01.sort((a, b) =>
          a?.text?.localeCompare(b?.text)
        ),
      ],
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
      title: t("general.municipalities_tags"),
      tooltip: (item: string) => {
        if (item === undefined || item === null || item.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
      typeFilter: typesFilter?.multiselect,
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...[...newArrayMunicipios_tags_01, ...newArrayMunicipios_tags_02].sort(
          (a, b) => a?.text?.localeCompare(b?.text)
        ),
      ],
      setFilter: setFilterMunicipiosTags,
      filter: filterMunicipiosTags,
      render: (item: string) => {
        if (item === undefined || item === null || item?.trim() === "") {
          return "-";
        }
        const cleanedItem = item.replace(/['"]/g, "");
        return cleanedItem.substring(1, cleanedItem.length - 1) || "-";
      },
    },
    {
      key: "url",
      title: t("general.action"),
      render: (_: any, row: CongresoPreguntas) => {
        return (
          <div className="boxBtnRow">
            <Link target="_blank" to={row?.url}>
              <Button txt={t("general.link")} type="button" />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (refreshTable) {
      let parlamentGroupCorrected =
        filterGrupoParlamentario != "" ? filterGrupoParlamentario : "";
      //
      let deputiesAuthorsCorrected =
        filterDiputadosAutores != "" ? filterDiputadosAutores : "";

      // let deputiesComunidadesCorrected =
      //   filterComunidadesTags != ""
      //     ? "['" + filterComunidadesTags + "']"
      //     : filterComunidadesTags;
      let filterComunidadesCorrected =
        filterComunidadesTags != "" ? filterComunidadesTags : "";
      //
      let filterProvinciasCorrected =
        filterProvinciasTags != "" ? filterProvinciasTags : "";
      //
      let filterMuniciosCorrected =
        filterMunicipiosTags != "" ? filterMunicipiosTags : "";

      const body = {
        Expediente: filterExpediente,
        Contenido: filterContenido,
        Presentada: filterPresentada,
        diputados_autores:
          deputiesAuthorsCorrected && deputiesAuthorsCorrected?.length > 0
            ? deputiesAuthorsCorrected
            : "",
        Grupo_Parlamentario:
          parlamentGroupCorrected && parlamentGroupCorrected?.length > 0
            ? parlamentGroupCorrected
            : "",

        comunidades_tags:
          filterComunidadesCorrected && filterComunidadesCorrected?.length > 0
            ? filterComunidadesCorrected
            : "",
        provincia_tags:
          filterProvinciasCorrected && filterProvinciasCorrected?.length > 0
            ? filterProvinciasCorrected
            : "",
        municipios_tags:
          filterMuniciosCorrected && filterMuniciosCorrected?.length > 0
            ? filterMuniciosCorrected
            : "",
      };
      console.log("Body:", body);
      const exactFilters = [""];
      const rangeFilters = [""];

      fetchApi(page, pageSize, body, exactFilters, rangeFilters).then(() => {
        console.log("CALL", refreshTable);
      });
    }
    setRefreshTable(true);
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
