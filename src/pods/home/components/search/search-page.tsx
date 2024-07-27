import React, { ChangeEvent, useState } from "react";
import "./search-page.styles.scss";
import { Button, CustomInputText } from "@/common";

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

    const isValid = Object.keys(formData).every(
      (key) =>
        formData[key as keyof FormData].trim() !== "" || key === "Contenido"
    );
    console.log("isValid", isValid);

    if (isValid) {
      console.log("submit", formData);
    } else {
      const updatedErrors: Partial<FormData> = {};

      Object.keys(formData).forEach((key) => {
        if (
          formData[key as keyof FormData].trim() === "" &&
          key !== "Contenido"
        ) {
          updatedErrors[key as keyof FormData] = "Campo requerido";
        }
      });

      setErrorForm({ ...errorForm, ...updatedErrors });
    }
  };

  return (
    <div className="rootSearchPage">
      <h3>Search Page</h3>
      {/* action /filter */}
      <form id="formTableSearch" onSubmit={handleSubmit} action="">
        <CustomInputText
          lbl="Expediente"
          name="Expediente"
          inputValue={formData?.Expediente}
          handleChange={handleChange("Expediente")}
          errorMsg={errorForm?.Expediente}
        />
        <CustomInputText
          lbl="Contenido"
          name="Contenido"
          inputValue={formData?.Contenido}
          handleChange={handleChange("Contenido")}
        />
        <CustomInputText
          lbl="Grupo Parlamentario"
          name="Grupo_Parlamentario"
          inputValue={formData?.Grupo_Parlamentario}
          handleChange={handleChange("Grupo_Parlamentario")}
          errorMsg={errorForm?.Grupo_Parlamentario}
        />
        <CustomInputText
          lbl="Presentadas"
          name="Presentadas"
          inputValue={formData?.Presentadas}
          handleChange={handleChange("Presentadas")}
          errorMsg={errorForm?.Presentadas}
        />
        <CustomInputText
          lbl="Diputados tags"
          name="diputados_autores"
          inputValue={formData?.diputados_autores}
          handleChange={handleChange("diputados_autores")}
          errorMsg={errorForm?.diputados_autores}
        />
        <CustomInputText
          lbl="Comunidades tags"
          name="comunidades_tags"
          inputValue={formData?.comunidades_tags}
          handleChange={handleChange("comunidades_tags")}
          errorMsg={errorForm?.comunidades_tags}
        />
        <CustomInputText
          lbl="Municipios tags"
          name="municipios_tags"
          inputValue={formData?.municipios_tags}
          handleChange={handleChange("municipios_tags")}
          errorMsg={errorForm?.municipios_tags}
        />{" "}
        <CustomInputText
          lbl="Provincia tags"
          name="provincias_tags"
          inputValue={formData?.provincias_tags}
          handleChange={handleChange("provincias_tags")}
          errorMsg={errorForm?.provincias_tags}
        />{" "}
        <div className="boxBtnsSearchForm">
          <Button customStyles="primaryBtn" type="submit" txt="Buscar" />
          <Button customStyles="secundaryBtn" type="reset" txt="Cancelar" />
        </div>
      </form>
    </div>
  );
};
