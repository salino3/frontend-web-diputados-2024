import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormData, GlobalContext, MyState, ValuesFilter } from "@/core";
import {
  arrayGruposParlamentarios_tags,
  deputiesMap,
  filterArrayDeputies,
  filterArrayMunicipios_01,
  filterArrayMunicipios_02,
  filterArrayProvincencies,
  municipiosMap_01,
  municipiosMap_02,
  newArrayComunidades_tags_01,
  provinciasMap,
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
        .filter((option) => option?.selected)
        .map((option) => option?.value);

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

    let newDeputies: string[] = formData?.diputados_autores;
    formData?.Grupo_Parlamentario.forEach((parlamentary) => {
      if (deputiesMap[parlamentary]) {
        const deputiesValues = deputiesMap[parlamentary].map(
          (item: ValuesFilter) => item?.value
        );
        const hasSelectedDeputies = deputiesValues.some((deputy) =>
          formData.diputados_autores.includes(deputy)
        );

        if (!hasSelectedDeputies) {
          newDeputies.push(...deputiesValues);
        }
      }
    });

    //
    let newProvinces: string[] = formData?.provincia_tags;
    formData.comunidades_tags.forEach((comunidad) => {
      if (provinciasMap[comunidad]) {
        const provinciasValues = provinciasMap[comunidad].map(
          (item: ValuesFilter) => item?.value
        );
        const hasSelectedProvinces = provinciasValues.some((provincia) =>
          formData.provincia_tags.includes(provincia)
        );

        if (!hasSelectedProvinces) {
          newProvinces.push(...provinciasValues);
        }
      }
    });

    //
    let newMunicipios: string[] = formData?.municipios_tags;
    formData.provincia_tags.forEach((province) => {
      let municipiosValues: string[] = [];
      if (municipiosMap_01[province]) {
        municipiosValues = municipiosMap_01[province].map(
          (item: ValuesFilter) => item?.value
        );
      } else if (municipiosMap_02[province]) {
        municipiosValues = municipiosMap_02[province].map(
          (item: ValuesFilter) => item?.value
        );
      }
      const hasSelectedMunicipios = municipiosValues.some((municipio) =>
        formData.municipios_tags.includes(municipio)
      );

      if (!hasSelectedMunicipios) {
        newMunicipios.push(...municipiosValues);
      }
    });

    console.log("submit", formData);
    const exactFilters = [""];
    const rangeFilters = [""];
    const body = {
      Expediente: formData?.Expediente,
      Contenido: formData?.Contenido,
      Presentadas: formData?.Presentadas,
      diputados_autores: newDeputies,
      // formData?.diputados_autores?.length > 0
      //   ? formData?.diputados_autores
      //   : "",
      Grupo_Parlamentario:
        formData?.Grupo_Parlamentario?.length > 0
          ? formData?.Grupo_Parlamentario
          : "",
      comunidades_tags: formData?.comunidades_tags,
      provincia_tags: newProvinces, // formData?.provincia_tags,
      municipios_tags: newMunicipios, // formData?.municipios_tags,
    };

    fetchApi(1, 10, body, exactFilters, rangeFilters).then(() => {
      setSelectedTab("table");
      setRefreshTable(false);
    });
  };

  //
  useEffect(() => {
    if (formData?.Grupo_Parlamentario?.length == 0) {
      setFormData((prev) => ({ ...prev, diputados_autores: [] }));
    }
  }, [formData?.Grupo_Parlamentario]);

  //
  useEffect(() => {
    if (formData?.provincia_tags?.length == 0) {
      setFormData((prev) => ({ ...prev, municipios_tags: [] }));
    }
  }, [formData?.provincia_tags]);

  //
  useEffect(() => {
    if (formData?.comunidades_tags?.length == 0) {
      setFormData((prev) => ({ ...prev, provincia_tags: [] }));
    }
  }, [formData?.comunidades_tags]);

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
              ...arrayGruposParlamentarios_tags?.sort((a, b) =>
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
                text: t(
                  formData?.Grupo_Parlamentario?.length > 0
                    ? "general.cancel_all"
                    : "search.choose_deputies"
                ),
                value: "",
              },
              ...filterArrayDeputies(formData?.Grupo_Parlamentario)?.sort(
                (a, b) => a?.text.localeCompare(b.text)
              ),
            ]}
            multiple
          />
        </div>
        <div className="containerInputs4">
          <CustomInputSelect
            lbl={t("general.communities_tags")}
            name="comunidades_tags"
            inputValue={formData?.comunidades_tags}
            handleChange={handleChangeMultiple("comunidades_tags")}
            valuesFilter={[
              {
                text: t("general.cancel_all"),
                value: "",
              },
              ...newArrayComunidades_tags_01?.sort((a, b) =>
                a?.text.localeCompare(b.text)
              ),
            ]}
            multiple
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
              ...filterArrayProvincencies(formData?.comunidades_tags)?.sort(
                (a, b) => a?.text.localeCompare(b.text)
              ),
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
                text: t(
                  formData?.provincia_tags?.length > 0
                    ? "general.cancel_all"
                    : "search.choose_province"
                ),
                value: "",
              },
              ...filterArrayMunicipios_01(formData?.provincia_tags)?.sort(
                (a, b) => a?.text.localeCompare(b.text)
              ),
              ...filterArrayMunicipios_02(formData?.provincia_tags)?.sort(
                (a, b) => a?.text.localeCompare(b.text)
              ),
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
