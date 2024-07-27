import React, { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext, MyState } from "@/core";
import { Button, CustomInputText } from "@/common";
import "./search-page.styles.scss";

interface FormData {
  Expediente: string;
  Contenido: string;
  Presentadas: string;
  diputados_autores: string;
  Grupo_Parlamentario: string;
  comunidades_tags: string;
  provincias_tags: string;
  municipios_tags: string;
}

export const SearchPage: React.FC = () => {
  const [t] = useTranslation("global");

  const { fetchApi, state } = useContext<MyState>(GlobalContext);

  const [formData, setFormData] = useState<FormData>({
    Expediente: "",
    Contenido: "",
    Presentadas: "",
    diputados_autores: "",
    Grupo_Parlamentario: "",
    comunidades_tags: "",
    provincias_tags: "",
    municipios_tags: "",
  });
  const [errorForm, setErrorForm] = useState<FormData>({
    Expediente: "",
    Contenido: "",
    Presentadas: "",
    diputados_autores: "",
    Grupo_Parlamentario: "",
    comunidades_tags: "",
    provincias_tags: "",
    municipios_tags: "",
  });

  const handleChange =
    (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormData({ ...formData, [key]: value });
      setErrorForm({ ...errorForm, [key]: "" });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid: boolean = Object.keys(formData).every(
      (key) =>
        formData[key as keyof FormData].trim() !== "" || key === "Contenido"
    );

    // const isValid = true;

    if (isValid) {
      console.log("submit", formData);
      const exactFilters = [""];
      const rangeFilters = [""];
      fetchApi(1, 10, formData, exactFilters, rangeFilters);
    } else {
      const updatedErrors: Partial<FormData> = {};

      Object.keys(formData).forEach((key) => {
        if (
          formData[key as keyof FormData].trim() === "" &&
          key !== "Contenido"
        ) {
          updatedErrors[key as keyof FormData] = t("search.requiered_field");
        }
      });

      setErrorForm({ ...errorForm, ...updatedErrors });
    }
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
          errorMsg={errorForm?.Expediente}
        />
        <CustomInputText
          lbl={t("search.content")}
          name="Contenido"
          inputValue={formData?.Contenido}
          handleChange={handleChange("Contenido")}
        />
        <CustomInputText
          lbl={t("search.parliamentary_group")}
          name="Grupo_Parlamentario"
          inputValue={formData?.Grupo_Parlamentario}
          handleChange={handleChange("Grupo_Parlamentario")}
          errorMsg={errorForm?.Grupo_Parlamentario}
        />
        <CustomInputText
          lbl={t("search.parliamentary_group")}
          name="Presentadas"
          inputValue={formData?.Presentadas}
          handleChange={handleChange("Presentadas")}
          errorMsg={errorForm?.Presentadas}
        />
        <CustomInputText
          lbl={t("search.author_deputies")}
          name="diputados_autores"
          inputValue={formData?.diputados_autores}
          handleChange={handleChange("diputados_autores")}
          errorMsg={errorForm?.diputados_autores}
        />
        <CustomInputText
          lbl={t("search.communities_tags")}
          name="comunidades_tags"
          inputValue={formData?.comunidades_tags}
          handleChange={handleChange("comunidades_tags")}
          errorMsg={errorForm?.comunidades_tags}
        />
        <CustomInputText
          lbl={t("search.provinces_tags")}
          name="provincias_tags"
          inputValue={formData?.provincias_tags}
          handleChange={handleChange("provincias_tags")}
          errorMsg={errorForm?.provincias_tags}
        />{" "}
        <CustomInputText
          lbl={t("search.municipalities_tags")}
          name="municipios_tags"
          inputValue={formData?.municipios_tags}
          handleChange={handleChange("municipios_tags")}
          errorMsg={errorForm?.municipios_tags}
        />{" "}
        <div className="boxBtnsSearchForm">
          <Button
            customStyles="primaryBtn"
            type="submit"
            txt={t("search.search")}
          />
          <Button
            customStyles="secundaryBtn"
            type="reset"
            txt={t("search.clear")}
          />
        </div>
      </form>
    </div>
  );
};
