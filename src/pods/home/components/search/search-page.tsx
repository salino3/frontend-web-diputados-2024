import React, { ChangeEvent, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormData, GlobalContext, MyState } from "@/core";
import {
  arrayGruposParlamentarios_tags,
  filterArrayDeputies,
  filterArrayMunicipios_01,
  filterArrayMunicipios_02,
  filterArrayProvincencies,
  newArrayComunidades_tags_01,
} from "@/core/data";
import { Button, CustomInputSelect, CustomInputText } from "@/common";
import { InputRange } from "@/common/table";
import "./search-page.styles.scss";

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const SearchPage: React.FC<Props> = (props) => {
  const { setSelectedTab, setRefreshTable, formData, setFormData } = props;
  const [t] = useTranslation("global");

  const { fetchApi, state, initialFilters } =
    useContext<MyState>(GlobalContext);

  const handleChange =
    (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormData({ ...formData, [key]: value });
    };

  const handleChangeDate =
    () => (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = event.target;
      setFormData((prev) => ({
        ...prev,
        Presentada: {
          ...prev.Presentada,
          [index === 0 ? "min" : "max"]: value, // Update min or max based for index
        },
      }));
    };

  const handleChangeMultiple =
    (key: keyof FormData) => (event: ChangeEvent<HTMLSelectElement>) => {
      const { options } = event.target;
      const selectedValues = Array.from(options)
        .filter((option) => option?.selected)
        .map((option) => option?.value);

      // We update the status with the selected values, adding new values ​​and removing the deleted ones
      setFormData((prevFormData) => {
        const currentValues = prevFormData[key] as string[]; // Get the current array of the state

        if (selectedValues.includes("")) {
          return {
            ...prevFormData,
            [key]: [],
          };
        }

        const updatedValues = selectedValues.reduce(
          (acc: string[], value: string) => {
            // If the value already is in the array, we remove it; if it is not there, we add it
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

    // #region - Logic searching every elements

    // let newDeputies: string[] = formData?.diputados_autores;
    // formData?.Grupo_Parlamentario &&
    //   formData?.Grupo_Parlamentario?.length > 0 &&
    //   formData?.Grupo_Parlamentario.forEach((parlamentary) => {
    //     if (deputiesMap[parlamentary]) {
    //       const deputiesValues = deputiesMap[parlamentary].map(
    //         (item: ValuesFilter) => item?.value
    //       );
    //       const hasSelectedDeputies = deputiesValues.some((deputy) =>
    //         formData.diputados_autores.includes(deputy)
    //       );

    //       if (!hasSelectedDeputies) {
    //         newDeputies.push(...deputiesValues);
    //       }
    //     }
    //   });

    //
    // let newProvinces: string[] = formData?.provincia_tags;
    // formData.comunidades_tags &&
    //   formData.comunidades_tags?.length > 0 &&
    //   formData.comunidades_tags.forEach((comunidad) => {
    //     if (provinciasMap[comunidad]) {
    //       const provinciasValues = provinciasMap[comunidad].map(
    //         (item: ValuesFilter) => item?.value
    //       );
    //       const hasSelectedProvinces = provinciasValues.some((provincia) =>
    //         formData.provincia_tags.includes(provincia)
    //       );

    //       if (!hasSelectedProvinces) {
    //         newProvinces.push(...provinciasValues);
    //       }
    //     }
    //   });

    //
    // let newMunicipios: string[] = formData?.municipios_tags;
    // formData.provincia_tags &&
    //   formData.provincia_tags?.length > 0 &&
    //   formData.provincia_tags.forEach((province) => {
    //     let municipiosValues: string[] = [];
    //     if (municipiosMap_01[province]) {
    //       municipiosValues = municipiosMap_01[province].map(
    //         (item: ValuesFilter) => item?.value
    //       );
    //     } else if (municipiosMap_02[province]) {
    //       municipiosValues = municipiosMap_02[province].map(
    //         (item: ValuesFilter) => item?.value
    //       );
    //     }
    //     const hasSelectedMunicipios = municipiosValues.some((municipio) =>
    //       formData.municipios_tags.includes(municipio)
    //     );

    //     if (!hasSelectedMunicipios) {
    //       newMunicipios.push(...municipiosValues);
    //     }
    //   });

    // #endregion

    console.log("submit", formData);
    const exactFilters = [""];
    const rangeFilters = ["Presentada"];
    const body = {
      Expediente: formData?.Expediente,
      Contenido: formData?.Contenido,
      Presentada: formData?.Presentada,
      Grupo_Parlamentario:
        formData?.Grupo_Parlamentario?.length > 0
          ? formData?.Grupo_Parlamentario
          : "",
      diputados_autores:
        //  newDeputies,
        formData?.diputados_autores?.length > 0
          ? formData?.diputados_autores
          : "",
      comunidades_tags: formData?.comunidades_tags,
      provincia_tags:
        //  newProvinces,
        formData?.provincia_tags,
      municipios_tags:
        // newMunicipios,
        formData?.municipios_tags,
    };

    fetchApi(1, 10, body, exactFilters, rangeFilters).then(() => {
      setSelectedTab("table");
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
    setRefreshTable(false);
  }, [formData?.comunidades_tags]);

  let today = new Date();
  let toISODate = today.toISOString().substr(0, 10);

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
          <InputRange
            Styles="boxInputDates_023"
            lbl={t("general.presented")}
            name="Presentada"
            inputValue={formData.Presentada}
            handleChange={handleChangeDate()}
            type="date"
            autoFocus={false}
            maxDate={toISODate}
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
            click={() => setFormData(initialFilters)}
            type="reset"
            txt={t("general.cancel")}
          />
        </div>
      </form>
    </div>
  );
};
