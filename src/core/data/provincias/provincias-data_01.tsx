import { FilteringValuesFilter, ValuesFilter } from "@/core/interfaces";

// 1)
export const arrayAndaluciaProvincias_tags: ValuesFilter[] = [
  { text: "Almería", value: "Almería" },
  { text: "Cádiz", value: "Cádiz" },
  { text: "Córdoba", value: "Córdoba" },
  { text: "Granada", value: "Granada" },
  { text: "Huelva", value: "Huelva" },
  { text: "Jaén", value: "Jaén" },
  { text: "Málaga", value: "Málaga" },
  { text: "Sevilla", value: "Sevilla" },
];

// 2)
export const arrayAragonProvincias_tags: ValuesFilter[] = [
  { text: "Huesca", value: "Huesca" },
  { text: "Teruel", value: "Teruel" },
  { text: "Zaragoza", value: "Zaragoza" },
];

// 3)
export const arrayAsturiasProvincias_tags: ValuesFilter[] = [
  { text: "Asturias", value: "Asturias" },
];

// 4)
export const arrayBalearesProvincias_tags: ValuesFilter[] = [
  { text: "Palma de Mallorca", value: "Mallorca" },
  { text: "Ibiza/Eivissa", value: "Eivissa" },
  { text: "Menorca", value: "Menorca" },
];

// 5)
export const arrayCanariasProvincias_tags: ValuesFilter[] = [
  { text: "Las Palmas de Gran Canarias", value: "Las Palmas" },
  { text: "Santa Cruz de Tenerife", value: "Santa Cruz de Tenerife" },
];

// 6)
export const arrayCantabriaProvincias_tags: ValuesFilter[] = [
  { text: "Cantabria", value: "Cantabria" },
];

// 7)
export const arrayCastillayLeonProvincias_tags: ValuesFilter[] = [
  { text: "Ávila", value: "Ávila" },
  { text: "Burgos", value: "Burgos" },
  { text: "León", value: "León" },
  { text: "Palencia", value: "Palencia" },
  { text: "Salamanca", value: "Salamanca" },
  { text: "Segovia", value: "Segovia" },
  { text: "Soria", value: "Soria" },
  { text: "Valladolid", value: "Valladolid" },
  { text: "Zamora", value: "Zamora" },
];

// 8)
export const arrayCastillaLaManchaProvincias_tags: ValuesFilter[] = [
  { text: "Albacete", value: "Albacete" },
  { text: "Ciudad Real", value: "Ciudad Real" },
  { text: "Cuenca", value: "Cuenca" },
  { text: "Toledo", value: "Toledo" },
  { text: "Guadalajara", value: "Guadalajara" },
];

// 9)
export const arrayCataluñaProvincias_tags: ValuesFilter[] = [
  { text: "Barcelona", value: "Barcelona" },
  { text: "Gerona/Girona", value: "Girona" },
  { text: "Lérida/Lledida", value: "Lleida" },
  { text: "Tarragona", value: "Tarragona" },
];

// 10)
export const arrayCeutaProvincias_tags: ValuesFilter[] = [
  { text: "Ceuta", value: "Ceuta" },
];

// 11)
export const arrayComunidadValencianaProvincias_tags: ValuesFilter[] = [
  { text: "Alicante/Alacant", value: "Alicante" },
  { text: "Castellón/Castelló", value: "Castellón" },
  { text: "Valencia/València", value: "Valencia" },
];

// 12)
export const arrayExtremaduraProvincias_tags: ValuesFilter[] = [
  { text: "Badajoz", value: "Badajoz" },
  { text: "Cáceres", value: "Cáceres" },
];

// 13)
export const arrayEuskadiProvincias_tags: ValuesFilter[] = [
  { text: "Álava/Araba", value: "Álava" },
  { text: "Guipúzcoa/Gipuzkoa", value: "Gipuzkoa" },
  { text: "Vizcaya/Bizkaia", value: "Bizkaia" },
];

// 14)
export const arrayGaliciaProvincias_tags: ValuesFilter[] = [
  { text: "La Coruña/A Coruña", value: "Coruña" },
  { text: "Lugo", value: "Lugo" },
  { text: "Orense/Ourense", value: "Ourense" },
  { text: "Pontevedra", value: "Pontevedra" },
];

// 15)
export const arrayLaRiojaProvincias_tags: ValuesFilter[] = [
  { text: "La Rioja", value: "La Rioja" },
];

// 16)
export const arrayMadridProvincias_tags: ValuesFilter[] = [
  { text: "Madrid", value: "Madrid" },
];

// 17)
export const arrayMelillaProvincias_tags: ValuesFilter[] = [
  { text: "Melilla", value: "Melilla" },
];

// 18)
export const arrayMurciaProvincias_tags: ValuesFilter[] = [
  { text: "Murcia", value: "Murcia" },
];

// 19)
export const arrayNavarraProvincias_tags: ValuesFilter[] = [
  { text: "Navarra/Nafarroa", value: "Navarra" },
];

export const newArrayProvincias_tags_01: ValuesFilter[] = [
  ...arrayAndaluciaProvincias_tags,
  ...arrayAragonProvincias_tags,
  ...arrayAsturiasProvincias_tags,
  ...arrayBalearesProvincias_tags,
  ...arrayCanariasProvincias_tags,
  ...arrayCantabriaProvincias_tags,
  ...arrayCastillayLeonProvincias_tags,
  ...arrayCastillaLaManchaProvincias_tags,
  ...arrayCataluñaProvincias_tags,
  ...arrayCeutaProvincias_tags,
  ...arrayComunidadValencianaProvincias_tags,
  ...arrayExtremaduraProvincias_tags,
  ...arrayEuskadiProvincias_tags,
  ...arrayGaliciaProvincias_tags,
  ...arrayLaRiojaProvincias_tags,
  ...arrayMadridProvincias_tags,
  ...arrayMelillaProvincias_tags,
  ...arrayMurciaProvincias_tags,
  ...arrayNavarraProvincias_tags,
];

//
export const provinciasMap: FilteringValuesFilter = {
  "Andalucía": arrayAndaluciaProvincias_tags,
  "Aragón": arrayAragonProvincias_tags,
  "Asturias": arrayAsturiasProvincias_tags,
  "Baleares": arrayBalearesProvincias_tags,
  "Canarias": arrayCanariasProvincias_tags,
  "Cantabria": arrayCantabriaProvincias_tags,
  "Castilla y León": arrayCastillayLeonProvincias_tags,
  "Castilla-La Mancha": arrayCastillaLaManchaProvincias_tags,
  "Cataluña": arrayCataluñaProvincias_tags,
  "Ceuta": arrayCeutaProvincias_tags,
  "Comunitat Valenciana": arrayComunidadValencianaProvincias_tags,
  "Extremadura": arrayExtremaduraProvincias_tags,
  "Euskadi": arrayEuskadiProvincias_tags,
  "Galicia": arrayGaliciaProvincias_tags,
  "La Rioja": arrayLaRiojaProvincias_tags,
  "Madrid": arrayMadridProvincias_tags,
  "Melilla": arrayMelillaProvincias_tags,
  "Murcia": arrayMurciaProvincias_tags,
  "Navarra": arrayNavarraProvincias_tags,
};

export function filterArrayProvincencies(items: string[]): ValuesFilter[] | [] {
  if (items.length == 0) {
    return [];
  }

  return items.reduce((acc, item) => {
    const provincias = provinciasMap[item];
    if (provincias) {
      acc.push(...provincias);
    }
    return acc;
  }, [] as ValuesFilter[]);
}
