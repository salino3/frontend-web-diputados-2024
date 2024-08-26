import React, { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  arrayDiputados_autores,
  arrayGrupo_Parlamentario,
  FormData,
  GlobalContext,
  MyState,
} from "@/core";
import {
  filterArrayProvincencies,
  newArrayComunidades_tags_01,
  newArrayMunicipios_tags_01,
  newArrayMunicipios_tags_02,
  newArrayProvincias_tags_02,
} from "@/core/data";
import { Button, CustomInputSelect, CustomInputText } from "@/common";
import "./search-page.styles.scss";

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchPage: React.FC<Props> = (props) => {
  const { setSelectedTab, setRefreshTable } = props;
  const [t] = useTranslation("global");

  const { fetchApi, state } = useContext<MyState>(GlobalContext);

  const [formData, setFormData] = useState<FormData>({
    Expediente: "",
    Contenido: "",
    Presentadas: "",
    diputados_autores: [],
    Grupo_Parlamentario: [],
    comunidades_tags: [],
    provincia_tags: [],
    municipios_tags: [],
  });

  const handleChange =
    (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormData({ ...formData, [key]: value });
    };

  const handleChangeMultiple =
    (key: keyof FormData) => (event: ChangeEvent<HTMLSelectElement>) => {
      const { options } = event.target;
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      // Actualizamos el estado con los valores seleccionados, agregando nuevos valores y eliminando los desmarcados
      setFormData((prevFormData) => {
        const currentValues = prevFormData[key] as string[]; // Obtiene el array actual del estado

        if (selectedValues.includes("")) {
          return {
            ...prevFormData,
            [key]: [],
          };
        }

        const updatedValues = selectedValues.reduce(
          (acc: string[], value: string) => {
            // Si el valor ya está en el array, lo quitamos; si no está, lo agregamos
            if (acc.includes(value)) {
              return acc.filter((item) => item !== value);
            } else {
              return [...acc, value];
            }
          },
          currentValues
        );

        return {
          ...prevFormData,
          [key]: updatedValues,
        };
      });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("submit", formData);
    const exactFilters = [""];
    const rangeFilters = [""];
    const body = {
      Expediente: formData?.Expediente,
      Contenido: formData?.Contenido,
      Presentadas: formData?.Presentadas,
      diputados_autores:
        formData?.diputados_autores?.length > 0
          ? formData?.diputados_autores
          : "",
      Grupo_Parlamentario:
        formData?.Grupo_Parlamentario?.length > 0
          ? formData?.Grupo_Parlamentario
          : "",
      comunidades_tags: formData?.comunidades_tags,
      provincia_tags: formData?.provincia_tags,
      municipios_tags: formData?.municipios_tags,
    };

    fetchApi(1, 10, body, exactFilters, rangeFilters).then(() => {
      setSelectedTab("table");
      setRefreshTable(false);
    });
  };

  // console.log(
  //   "Filtering fn",
  //   filterArrayProvincencies(["Andalucía", "Galicia"])
  // );

  console.log("CCAA", formData?.comunidades_tags);

  return (
    <div id={state?.theme} className="rootSearchPage">
      <h3>{t("search.search_title")}</h3>
      <form id="formTableSearch" onSubmit={handleSubmit} action="/filter ">
        <CustomInputText
          lbl={t("general.expedient")}
          name="Expediente"
          inputValue={formData?.Expediente}
          handleChange={handleChange("Expediente")}
        />
        <CustomInputText
          lbl={t("general.content")}
          name="Contenido"
          textarea
          inputValue={formData?.Contenido}
          handleChange={handleChange("Contenido")}
        />

        <div className="containerInputs3">
          <CustomInputText
            lbl={t("general.presented")}
            name="Presentadas"
            inputValue={formData?.Presentadas}
            handleChange={handleChange("Presentadas")}
          />
          <CustomInputSelect
            lbl={t("general.parliamentary_group")}
            name="Grupo_Parlamentario"
            inputValue={formData?.Grupo_Parlamentario}
            handleChange={handleChangeMultiple("Grupo_Parlamentario")}
            valuesFilter={[
              {
                text: t("general.cancel_all"),
                value: "",
              },
              ...arrayGrupo_Parlamentario?.sort((a, b) =>
                a?.text.localeCompare(b.text)
              ),
            ]}
            multiple
          />
          <CustomInputSelect
            lbl={t("general.author_deputies")}
            name="diputados_autores"
            inputValue={formData?.diputados_autores}
            handleChange={handleChangeMultiple("diputados_autores")}
            valuesFilter={[
              {
                text: t("general.cancel_all"),
                value: "",
              },
              ...arrayDiputados_autores?.sort((a, b) =>
                a?.text.localeCompare(b.text)
              ),
            ]}
            multiple
          />
        </div>
        <div className="containerInputs4">
          <CustomInputSelect
            multiple
            lbl={t("general.communities_tags")}
            name="comunidades_tags"
            inputValue={formData?.comunidades_tags}
            handleChange={handleChangeMultiple("comunidades_tags")}
            valuesFilter={[
              {
                text: t("general.cancel_all"),
                value: "",
              },
              ...newArrayComunidades_tags_01,
            ]}
          />
          <CustomInputSelect
            lbl={t("general.provinces_tags")}
            name="provincia_tags"
            inputValue={formData?.provincia_tags}
            handleChange={handleChangeMultiple("provincia_tags")}
            valuesFilter={[
              {
                text: t(
                  formData?.comunidades_tags?.length > 0
                    ? "general.cancel_all"
                    : "search.choose_region"
                ),
                value: "",
              },
              ...filterArrayProvincencies(formData?.comunidades_tags),
              // ...newArrayProvincias_tags_02,
            ]}
            multiple
          />
          <CustomInputSelect
            lbl={t("general.municipalities_tags")}
            name="municipios_tags"
            inputValue={formData?.municipios_tags}
            handleChange={handleChangeMultiple("municipios_tags")}
            valuesFilter={[
              {
                text: t("general.cancel_all"),
                value: "",
              },
              ...newArrayMunicipios_tags_01,
              ...newArrayMunicipios_tags_02,
            ]}
            multiple
          />
        </div>
        <div className="boxBtnsSearchForm">
          <Button
            // customStyles={`primaryBtn ${
            //   !valuesAreValids(formData) && "btnRequiredValues"
            // }`}
            type="submit"
            txt={t("search.search")}
          />
          <Button
            click={() =>
              setFormData({
                Expediente: "",
                Contenido: "",
                Presentadas: "",
                diputados_autores: [],
                Grupo_Parlamentario: [],
                comunidades_tags: [],
                provincia_tags: [],
                municipios_tags: [],
              })
            }
            type="reset"
            txt={t("general.cancel")}
          />
        </div>
      </form>
    </div>
  );
};
