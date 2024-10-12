import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  arrayDiputados_autores,
  arrayGrupo_Parlamentario,
  CongresoPreguntas,
  FormData,
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
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const TablePage: React.FC<Props> = (props) => {
  const { refreshTable, setRefreshTable, formData, setFormData } = props;

  const [t] = useTranslation("global");

  const { state, fetchApi } = useContext<MyState>(GlobalContext);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  // Filters
  // const [filterExpediente, setFilterExpediente] = useState<string>(
  //   formData?.Expediente
  // );
  // const [filterContenido, setFilterContenido] = useState<string>(
  //   formData?.Contenido
  // );
  // const [filterPresentada, setFilterPresentada] = useState<string>(
  //   formData?.Presentada
  // );
  // const [filterDiputadosAutores, setFilterDiputadosAutores] = useState<
  //   string[] | string
  // >(formData?.diputados_autores?.length > 0 ? formData?.diputados_autores : "");
  const [filterGrupoParlamentario, setFilterGrupoParlamentario] = useState<
    string[] | string
  >(
    formData?.Grupo_Parlamentario?.length > 0
      ? formData?.Grupo_Parlamentario
      : ""
  );
  const [filterComunidadesTags, setFilterComunidadesTags] = useState<
    string[] | string
  >(formData?.comunidades_tags?.length > 0 ? formData?.comunidades_tags : "");
  const [filterProvinciasTags, setFilterProvinciasTags] = useState<
    string[] | string
  >(formData?.provincia_tags?.length > 0 ? formData?.provincia_tags : "");
  const [filterMunicipiosTags, setFilterMunicipiosTags] = useState<
    string[] | string
  >(formData?.municipios_tags?.length > 0 ? formData?.municipios_tags : "");

  // Generic setter
  const handleFilterChange = (key: keyof FormData, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  let today = new Date();
  let toISODate = today.toISOString().substr(0, 10);

  const array: Row[] = [
    {
      key: "Expediente",
      title: t("general.expedient"),
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: (value: string) => handleFilterChange("Expediente", value),
      filter: formData?.Expediente,
    },
    {
      key: "Presentada",
      title: t("general.presented"),
      tooltip: (item: string) => item,
      render: (dateString: string) => {
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return formattedDate;
      },
      typeFilter: typesFilter?.date,
      setFilter: (value: string) => handleFilterChange("Presentada", value),
      filter: formData?.Presentada,
      maxDate: toISODate,
    },
    {
      key: "Contenido",
      title: t("general.content"),
      tooltip: (item: string) => item,
      typeFilter: typesFilter?.text,
      setFilter: (value: string) => handleFilterChange("Contenido", value),
      filter: formData?.Contenido,
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
      setFilter: (value: string) =>
        handleFilterChange("diputados_autores", value),
      filter:
        formData?.diputados_autores && formData?.diputados_autores?.length > 0
          ? formData?.diputados_autores
          : "",
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
      title: t("general.link"),
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
        filterGrupoParlamentario?.length > 0 ? filterGrupoParlamentario : "";
      //
      // let deputiesAuthorsCorrected =
      //   filterDiputadosAutores?.length > 0 ? filterDiputadosAutores : "";

      // let deputiesComunidadesCorrected =
      //   filterComunidadesTags != ""
      //     ? "['" + filterComunidadesTags + "']"
      //     : filterComunidadesTags;
      let filterComunidadesCorrected =
        filterComunidadesTags?.length > 0 ? filterComunidadesTags : "";
      //
      let filterProvinciasCorrected =
        filterProvinciasTags?.length > 0 ? filterProvinciasTags : "";
      //
      let filterMuniciosCorrected =
        filterMunicipiosTags?.length > 0 ? filterMunicipiosTags : "";

      const body = {
        Expediente: formData?.Expediente,
        Contenido: formData?.Contenido,
        Presentada: formData?.Presentada,
        diputados_autores:
          formData?.diputados_autores && formData?.diputados_autores?.length > 0
            ? formData?.diputados_autores
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
      const rangeFilters = ["Presentada"];

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
