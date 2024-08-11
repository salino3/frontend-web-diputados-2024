import React, { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  arrayComunidades_tags,
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
}

export const SearchPage: React.FC<Props> = (props) => {
  const { setSelectedTab } = props;
  const [t] = useTranslation("global");

  const { fetchApi, state } = useContext<MyState>(GlobalContext);

  const [formData, setFormData] = useState<FormData>({
    Expediente: "",
    Contenido: "",
    Presentadas: "",
    diputados_autores: "",
    Grupo_Parlamentario: "",
    comunidades_tags: "",
    provincia_tags: "",
    municipios_tags: "",
  });
  const [errorForm, setErrorForm] = useState<FormData>({
    Expediente: "",
    Contenido: "",
    Presentadas: "",
    diputados_autores: "",
    Grupo_Parlamentario: "",
    comunidades_tags: "",
    provincia_tags: "",
    municipios_tags: "",
  });

  // function valuesAreValids(formData: FormData) {
  //   return Object.keys(formData).every(
  //     (key) =>
  //       formData[key as keyof FormData].trim() !== "" || key === "Contenido"
  //   );
  // }

  const handleChange =
    (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormData({ ...formData, [key]: value });
      setErrorForm({ ...errorForm, [key]: "" });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("submit", formData);
    const exactFilters = [""];
    const rangeFilters = [""];
    fetchApi(1, 10, formData, exactFilters, rangeFilters).then(() => {
      setSelectedTab("table");
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
          errorMsg={errorForm?.Expediente}
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
                diputados_autores: "",
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
