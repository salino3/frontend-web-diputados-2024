import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CongresoPreguntas,
  FormData,
  GlobalContext,
  MyState,
  ValuesFilter,
} from "@/core";
import {
  newArrayComunidades_tags_01,
  filterArrayDeputies,
  arrayGruposParlamentarios_tags,
  filterArrayProvincencies,
  filterArrayMunicipios_01,
  filterArrayMunicipios_02,
} from "@/core/data";
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

interface Props {
  refreshTable: boolean;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const TablePage: React.FC<Props> = (props) => {
  const { refreshTable, setRefreshTable, formData, setFormData } = props;

  const [t] = useTranslation("global");

  const { state, fetchApi, initialFilters } =
    useContext<MyState>(GlobalContext);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  // Generic setter
  const handleFilterChange = (key: keyof FormData, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  let today = new Date();
  let toISODate = today.toISOString().substr(0, 10);

  // const parseDateString = (dateString: string): Date => {
  //   const parts = dateString.split("/");

  //   if (parts.length !== 3) {
  //     return new Date(NaN);
  //   }
  //   const [day, month, year] = dateString.split("/").map(Number);
  //   return new Date(year, month - 1, day);
  // };

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
      tooltip: (item: string) => (item ? item : t("general.invalid_date")),
      render: (dateString: string) =>
        dateString ? dateString : t("general.invalid_date"),
      // render: (dateString: string) => {
      //   const dateObject = parseDateString(dateString || "");

      //   if (isNaN(dateObject.getTime())) {
      //     return t("general.invalid_date");
      //   }

      //   const formattedDate = dateObject.toLocaleDateString(i18next?.language, {
      //     year: "numeric",
      //     month: "2-digit",
      //     day: "2-digit",
      //   });

      //   return formattedDate;
      // },
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
      setFilter: (value: string) =>
        handleFilterChange("Grupo_Parlamentario", value),
      filter:
        formData?.Grupo_Parlamentario &&
        formData?.Grupo_Parlamentario?.length > 0
          ? formData?.Grupo_Parlamentario
          : "",
      valuesFilter: [
        {
          text: t("general.cancel_all"),
          value: "",
        },
        ...arrayGruposParlamentarios_tags?.sort((a, b) =>
          a?.text.localeCompare(b.text)
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
          text: t(
            formData?.Grupo_Parlamentario?.length > 0
              ? "general.cancel_all"
              : "search.choose_deputies"
          ),
          value: "",
        },
        ...filterArrayDeputies(formData?.Grupo_Parlamentario)?.sort((a, b) =>
          a?.text.localeCompare(b.text)
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
      setFilter: (value: string) =>
        handleFilterChange("comunidades_tags", value),
      filter:
        formData?.comunidades_tags && formData?.comunidades_tags?.length > 0
          ? formData?.comunidades_tags
          : "",
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
          text: t(
            formData?.comunidades_tags?.length > 0
              ? "general.cancel_all"
              : "search.choose_region"
          ),
          value: "",
        },
        ...filterArrayProvincencies(formData?.comunidades_tags)?.sort((a, b) =>
          a?.text.localeCompare(b.text)
        ),
      ],
      setFilter: (value: string) => handleFilterChange("provincia_tags", value),
      filter:
        formData?.provincia_tags && formData?.provincia_tags?.length > 0
          ? formData?.provincia_tags
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
          text: t(
            formData?.provincia_tags?.length > 0
              ? "general.cancel_all"
              : "search.choose_province"
          ),
          value: "",
        },
        ...filterArrayMunicipios_01(formData?.provincia_tags)?.sort((a, b) =>
          a?.text.localeCompare(b.text)
        ),
        ...filterArrayMunicipios_02(formData?.provincia_tags)?.sort((a, b) =>
          a?.text.localeCompare(b.text)
        ),
      ],
      setFilter: (value: string) =>
        handleFilterChange("municipios_tags", value),
      filter:
        formData?.municipios_tags && formData?.municipios_tags?.length > 0
          ? formData?.municipios_tags
          : "",
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
  console.log("STATE", state);
  useEffect(() => {
    if (refreshTable) {
      const body = {
        Expediente: formData?.Expediente,
        Contenido: formData?.Contenido,
        Presentada: formData?.Presentada || {
          min: "",
          max: "",
        },
        diputados_autores:
          formData?.diputados_autores && formData?.diputados_autores?.length > 0
            ? formData?.diputados_autores
            : "",
        Grupo_Parlamentario:
          formData?.Grupo_Parlamentario &&
          formData?.Grupo_Parlamentario?.length > 0
            ? formData?.Grupo_Parlamentario
            : "",

        comunidades_tags:
          formData?.comunidades_tags && formData?.comunidades_tags?.length > 0
            ? formData?.comunidades_tags
            : "",
        provincia_tags:
          formData?.provincia_tags && formData?.provincia_tags?.length > 0
            ? formData?.provincia_tags
            : "",
        municipios_tags:
          formData?.municipios_tags && formData?.municipios_tags?.length > 0
            ? formData?.municipios_tags
            : "",
      };
      console.log("Body:", body);
      const exactFilters = [""];
      const rangeFilters = ["Presentada"];

      fetchApi(page, pageSize, body, exactFilters, rangeFilters);
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
          initialFilters={initialFilters}
        />
      </div>
    </div>
  );
};
