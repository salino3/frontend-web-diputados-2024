import React, { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  arrayComunidades_tags,
  arrayDiputados_autores,
  arrayGrupo_Parlamentario,
  arrayMunicipios_tags,
  arrayProvincia_tags,
  FormData,
  GlobalContext,
  MyState,
} from "@/core";
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
    Grupo_Parlamentario: "",
    comunidades_tags: "",
    provincia_tags: "",
    municipios_tags: "",
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
    const exactFilters = ["diputados_autores"];
    const rangeFilters = [""];
    const body = {
      Expediente: formData?.Expediente,
      Contenido: formData?.Contenido,
      Presentadas: formData?.Presentadas,
      diputados_autores:
        formData?.diputados_autores?.length > 0
          ? formData?.diputados_autores
          : "",
      Grupo_Parlamentario: formData?.Grupo_Parlamentario,
      comunidades_tags: formData?.comunidades_tags,
      provincia_tags: formData?.provincia_tags,
      municipios_tags: formData?.municipios_tags,
    };
    fetchApi(1, 10, body, exactFilters, rangeFilters).then(() => {
      setSelectedTab("table");
      setRefreshTable(false);
    });
  };

  return (
    <div id={state?.theme} className="rootSearchPage">
      <h3>{t("search.search_title")}</h3>
      <form id="formTableSearch" onSubmit={handleSubmit} action="/filter ">
        <CustomInputText
          lbl={t("search.expedient")}
          name="Expediente"
          inputValue={formData?.Expediente}
          handleChange={handleChange("Expediente")}
        />
        <CustomInputText
          lbl={t("search.content")}
          name="Contenido"
          textarea
          inputValue={formData?.Contenido}
          handleChange={handleChange("Contenido")}
        />

        <div className="containerInputs3">
          <CustomInputText
            lbl={t("search.presented")}
            name="Presentadas"
            inputValue={formData?.Presentadas}
            handleChange={handleChange("Presentadas")}
          />
          <CustomInputSelect
            lbl={t("search.parliamentary_group")}
            name="Grupo_Parlamentario"
            inputValue={formData?.Grupo_Parlamentario}
            handleChange={handleChange("Grupo_Parlamentario")}
            valuesFilter={arrayGrupo_Parlamentario}
          />
          <CustomInputSelect
            lbl={t("search.author_deputies")}
            name="diputados_autores"
            inputValue={formData?.diputados_autores}
            handleChange={handleChangeMultiple("diputados_autores")}
            valuesFilter={arrayDiputados_autores}
            multiple
          />
        </div>
        <div className="containerInputs4">
          <CustomInputSelect
            lbl={t("search.communities_tags")}
            name="comunidades_tags"
            inputValue={formData?.comunidades_tags}
            handleChange={handleChange("comunidades_tags")}
            valuesFilter={arrayComunidades_tags}
          />
          <CustomInputSelect
            lbl={t("search.provinces_tags")}
            name="provincia_tags"
            inputValue={formData?.provincia_tags}
            handleChange={handleChange("provincia_tags")}
            valuesFilter={arrayProvincia_tags}
          />{" "}
          <CustomInputSelect
            lbl={t("search.municipalities_tags")}
            name="municipios_tags"
            inputValue={formData?.municipios_tags}
            handleChange={handleChange("municipios_tags")}
            valuesFilter={arrayMunicipios_tags}
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
                Grupo_Parlamentario: "",
                comunidades_tags: "",
                provincia_tags: "",
                municipios_tags: "",
              })
            }
            customStyles="secundaryBtn"
            type="reset"
            txt={t("search.clear")}
          />
        </div>
      </form>
    </div>
  );
};
