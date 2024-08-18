import axios from "axios";
import { apisApp } from "./apis";
import { ValuesFilter } from "./interfaces";

export const ServicesApp = () => {
  const fetchPaginatedData = (
    page = 0,
    pageSize = 10,
    body = {},
    exactFilters = [],
    rangeFilters = []
  ) => {
    // filter - filter-by-cache
    return axios.post(`${apisApp.baseBackend}/filter-by-cache`, {
      page,
      pageSize,
      body,
      exactFilters,
      rangeFilters,
    });
  };

  return {
    fetchPaginatedData,
  };
};

// Grupo_Parlamentario:
export const arrayGrupo_Parlamentario: ValuesFilter[] = [
  { text: "G.P. Republicano", value: "G.P. Republicano" },
  {
    text: "G.P. Popular en el Congreso",
    value: "G.P. Popular en el Congreso",
  },
  {
    text: "G.P. Confederal de Unidas Podemos-En Comú Podem-Galicia en Común",
    value: "G.P. Confederal de Unidas Podemos-En Comú Podem-Galicia en Común",
  },
  { text: "G.P. VOX", value: "G.P. VOX" },
  { text: "G.P. Ciudadanos", value: "G.P. Ciudadanos" },
  { text: "G.P. EH Bildu", value: "G.P. EH Bildu" },
  { text: "G.P. Plural", value: "G.P. Plural" },
  { text: "G.P. Mixto", value: "G.P. Mixto" },
  { text: "G.P. Vasco (EAJ-PNV)", value: "G.P. Vasco (EAJ-PNV)" },
  { text: "G.P. Socialista", value: "G.P. Socialista" },
];

// diputados_autores:
export const arrayDiputados_autores: ValuesFilter[] = [
  {
    text: "Isidro ManuelMartínez Oblanca",
    value: "Isidro ManuelMartínez Oblanca",
  },
  { text: "Norma Pujol i Farré", value: "Norma Pujol i Farré" },
  { text: "Jordi Salvador i Duch", value: "Jordi Salvador i Duch" },
  { text: "Néstor Rego Candamil", value: "Néstor Rego Candamil" },
  { text: "Marta González Vázquez", value: "Marta González Vázquez" },
  { text: "Teodoro García Egea", value: "Teodoro García Egea" },
  { text: "Margarita Prohens Rigo", value: "Margarita Prohens Rigo" },
  { text: "Celso Luis Delgado Arce", value: "Celso Luis Delgado Arce" },
  {
    text: "José Antonio Bermúdez de Castro Fernández",
    value: "José Antonio Bermúdez de Castro Fernández",
  },
  { text: "María Jesús Moro Almaraz", value: "María Jesús Moro Almaraz" },
  { text: "Carmen Riolobos Regadera", value: "Carmen Riolobos Regadera" },
  {
    text: "Fernando Adolfo Gutiérrez Díaz de Otazu",
    value: "Fernando Adolfo Gutiérrez Díaz de Otazu",
  },
  { text: "Juan José Matarí Sáez", value: "Juan José Matarí Sáez" },
  { text: "Alicia García Rodríguez", value: "Alicia García Rodríguez" },
  {
    text: "Macarena Montesinos de Miguel",
    value: "Macarena Montesinos de Miguel",
  },
  { text: "César Sánchez Pérez", value: "César Sánchez Pérez" },
  { text: "Agustín Almodóbar Barceló", value: "Agustín Almodóbar Barceló" },
  { text: "Gabriel Rufián Romero", value: "Gabriel Rufián Romero" },
  {
    text: "Francesc Xavier Eritja Ciuró",
    value: "Francesc Xavier Eritja Ciuró",
  },
  { text: "Joan Capdevila i Esteve", value: "Joan Capdevila i Esteve" },
  { text: "Joan Margall Sastre", value: "Joan Margall Sastre" },
  { text: "Rosa María Romero Sánchez", value: "Rosa María Romero Sánchez" },
  { text: "Juan Antonio Callejas Cano", value: "Juan Antonio Callejas Cano" },
  { text: "Paloma Gázquez Collado", value: "Paloma Gázquez Collado" },
  { text: "Víctor Valentín Píriz Maya", value: "Víctor Valentín Píriz Maya" },
  { text: "Óscar Clavell López", value: "Óscar Clavell López" },
  {
    text: "María Soledad Cruz-Guzmán García",
    value: "María Soledad Cruz-Guzmán García",
  },
  {
    text: "María Teresa Jiménez-Becerril Barrio",
    value: "María Teresa Jiménez-Becerril Barrio",
  },
  { text: "Isabel García Tejerina", value: "Isabel García Tejerina" },
  { text: "Mario Garcés Sanagustín", value: "Mario Garcés Sanagustín" },
  { text: "Roser Maestro Moliner", value: "Roser Maestro Moliner" },
  { text: "Yolanda Díaz Pérez", value: "Yolanda Díaz Pérez" },
  { text: "Antonio Gómez-Reino Varela", value: "Antonio Gómez-Reino Varela" },
  { text: "Isabel María Borrego Cortés", value: "Isabel María Borrego Cortés" },
  { text: "Carlos Rojas García", value: "Carlos Rojas García" },
  { text: "Ana Belén Vázquez Blanco", value: "Ana Belén Vázquez Blanco" },
  { text: "Juan Luis Pedreño Molina", value: "Juan Luis Pedreño Molina" },
  { text: "Antonia Jover Díaz", value: "Antonia Jover Díaz" },
  { text: "Ferran Bel Accensi", value: "Ferran Bel Accensi" },
  {
    text: "Juan Antonio López de Uralde Garmendia",
    value: "Juan Antonio López de Uralde Garmendia",
  },
  { text: "Txema Guijarro García", value: "Txema Guijarro García" },
  { text: "Isabel Franco Carmona", value: "Isabel Franco Carmona" },
  { text: "Alberto Garzón Espinosa", value: "Alberto Garzón Espinosa" },
  { text: "Jaime Eduardo de Olano Vela", value: "Jaime Eduardo de Olano Vela" },
  { text: "Ana María Zurita Expósito", value: "Ana María Zurita Expósito" },
  {
    text: "Víctor Manuel Sánchez del Real",
    value: "Víctor Manuel Sánchez del Real",
  },
  {
    text: "María Magdalena Nevado del Campo",
    value: "María Magdalena Nevado del Campo",
  },
  { text: "Patricia Rueda Perelló", value: "Patricia Rueda Perelló" },
  { text: "Rubén Silvano Manso Olivar", value: "Rubén Silvano Manso Olivar" },
  { text: "Eduardo Luis Ruiz Navarro", value: "Eduardo Luis Ruiz Navarro" },
  { text: "Sergi Miquel i Valentí", value: "Sergi Miquel i Valentí" },
  { text: "Marta Martín Llaguno", value: "Marta Martín Llaguno" },
  { text: "José Alberto Herrero Bono", value: "José Alberto Herrero Bono" },
  { text: "Marisa Saavedra Muñoz", value: "Marisa Saavedra Muñoz" },
  { text: "Héctor Illueca Ballester", value: "Héctor Illueca Ballester" },
  { text: "Javier Sánchez Serna", value: "Javier Sánchez Serna" },
  { text: "Carolina España Reina", value: "Carolina España Reina" },
  { text: "Pablo Montesinos Aguayo", value: "Pablo Montesinos Aguayo" },
  { text: "Mario Cortés Carballo", value: "Mario Cortés Carballo" },
  { text: "Andrés Lorite Lorite", value: "Andrés Lorite Lorite" },
  {
    text: "María de la O Redondo Calvillo",
    value: "María de la O Redondo Calvillo",
  },
  { text: "María Teresa Angulo Romero", value: "María Teresa Angulo Romero" },
  { text: "Laura Borràs Castanyer", value: "Laura Borràs Castanyer" },
  {
    text: "Pablo Hispán Iglesias de Ussel",
    value: "Pablo Hispán Iglesias de Ussel",
  },
  {
    text: "Tristana María Moraleja Gómez",
    value: "Tristana María Moraleja Gómez",
  },
  {
    text: "María Valentina Martínez Ferro",
    value: "María Valentina Martínez Ferro",
  },
  { text: "Beatriz Álvarez Fanjul", value: "Beatriz Álvarez Fanjul" },
  { text: "Carmen Navarro Lacoba", value: "Carmen Navarro Lacoba" },
  {
    text: "Miguel Ángel Castellón Rubio",
    value: "Miguel Ángel Castellón Rubio",
  },
  {
    text: "Cayetana Álvarez de Toledo Peralta-Ramos",
    value: "Cayetana Álvarez de Toledo Peralta-Ramos",
  },
  { text: "Llanos De Luna Tobarra", value: "Llanos De Luna Tobarra" },
  { text: "María Sandra Moneo Díez", value: "María Sandra Moneo Díez" },
  { text: "Jaime Miguel Mateu Istúriz", value: "Jaime Miguel Mateu Istúriz" },
  { text: "Alberto Casero Ávila", value: "Alberto Casero Ávila" },
  {
    text: "María José García-Pelayo Jurado",
    value: "María José García-Pelayo Jurado",
  },
  { text: "José Ortiz Galván", value: "José Ortiz Galván" },
  { text: "Diego Movellán Lombardero", value: "Diego Movellán Lombardero" },
  { text: "Joaquín Pérez Vitoria", value: "Joaquín Pérez Vitoria" },
  { text: "Alejandro Fernández Sánchez", value: "Alejandro Fernández Sánchez" },
  { text: "Juanjo Zacarías", value: "Juanjo Zacarías" },
  { text: "José Antonio Ríos García", value: "José Antonio Ríos García" },
  { text: "Eduardo Luque Martín", value: "Eduardo Luque Martín" },
  { text: "Raquel Sánchez Silva", value: "Raquel Sánchez Silva" },
  { text: "Antonio González Terol", value: "Antonio González Terol" },
  { text: "Cristina Gómez Benítez", value: "Cristina Gómez Benítez" },
  { text: "José Manuel Marín López", value: "José Manuel Marín López" },
  { text: "Sergio del Campo Tercero", value: "Sergio del Campo Tercero" },
  { text: "Pilar Cortés Sánchez", value: "Pilar Cortés Sánchez" },
  { text: "Rocío de Meer Salas", value: "Rocío de Meer Salas" },
  { text: "María Dolores Sánchez Ruiz", value: "María Dolores Sánchez Ruiz" },
  {
    text: "José Luis Fernández Martínez",
    value: "José Luis Fernández Martínez",
  },
  { text: "José Francisco Ramos García", value: "José Francisco Ramos García" },
  { text: "Joaquín Castellano Pérez", value: "Joaquín Castellano Pérez" },
  { text: "José Luis Cabezas Hernández", value: "José Luis Cabezas Hernández" },
  { text: "Cristina González Martínez", value: "Cristina González Martínez" },
  { text: "Ana Belén Gascón Vázquez", value: "Ana Belén Gascón Vázquez" },
  {
    text: "Rosa María González Rodríguez",
    value: "Rosa María González Rodríguez",
  },
  { text: "José Ángel Álvarez Bueno", value: "José Ángel Álvarez Bueno" },
  { text: "Víctor Ruiz González", value: "Víctor Ruiz González" },
  { text: "José Luis Martínez Seijo", value: "José Luis Martínez Seijo" },
  {
    text: "Carlos Alberto López Sánchez",
    value: "Carlos Alberto López Sánchez",
  },
  { text: "Ana González González", value: "Ana González González" },
  { text: "Ana María Giménez Sánchez", value: "Ana María Giménez Sánchez" },
  { text: "Antonio Díaz Romero", value: "Antonio Díaz Romero" },
  { text: "Alejandro García de la Peña", value: "Alejandro García de la Peña" },
  {
    text: "María Pilar González Sánchez",
    value: "María Pilar González Sánchez",
  },
  { text: "Nuria Díaz Sánchez", value: "Nuria Díaz Sánchez" },
  { text: "Juan Luis Gil Martínez", value: "Juan Luis Gil Martínez" },
  { text: "Ana Isabel Gómez Campos", value: "Ana Isabel Gómez Campos" },
  { text: "José María García López", value: "José María García López" },
  { text: "José Luis Martínez Amat", value: "José Luis Martínez Amat" },
  { text: "José Antonio Caballero", value: "José Antonio Caballero" },
  {
    text: "Francisco Javier López López",
    value: "Francisco Javier López López",
  },
  { text: "María Teresa García Sánchez", value: "María Teresa García Sánchez" },
  { text: "José Manuel Pérez y Pérez", value: "José Manuel Pérez y Pérez" },
  { text: "José Carlos Fernández Gómez", value: "José Carlos Fernández Gómez" },
  { text: "Carlos López de Oñate", value: "Carlos López de Oñate" },
  { text: "Ana María Romero González", value: "Ana María Romero González" },
  { text: "José María Álvarez", value: "José María Álvarez" },
  { text: "María José Fuentes García", value: "María José Fuentes García" },
  {
    text: "José Antonio Santos Martínez",
    value: "José Antonio Santos Martínez",
  },
  {
    text: "Antonio Manuel López Sánchez",
    value: "Antonio Manuel López Sánchez",
  },
  { text: "Carlos Ruiz Martínez", value: "Carlos Ruiz Martínez" },
  { text: "José Carlos López Sánchez", value: "José Carlos López Sánchez" },
  { text: "Fernando Serrano García", value: "Fernando Serrano García" },
  { text: "María Ángeles Peña Blanco", value: "María Ángeles Peña Blanco" },
  { text: "Cristina García Gutiérrez", value: "Cristina García Gutiérrez" },
  {
    text: "José María Fernández Álvarez",
    value: "José María Fernández Álvarez",
  },
  {
    text: "María Belén Moreno Rodríguez",
    value: "María Belén Moreno Rodríguez",
  },
  { text: "José Luis González Peña", value: "José Luis González Peña" },
  {
    text: "José Antonio Sánchez Fernández",
    value: "José Antonio Sánchez Fernández",
  },
  { text: "María Luisa Fernández López", value: "María Luisa Fernández López" },
  { text: "José María Peña Rodríguez", value: "José María Peña Rodríguez" },
  {
    text: "María José Fernández Martínez",
    value: "María José Fernández Martínez",
  },
  {
    text: "José Antonio Fernández Sánchez",
    value: "José Antonio Fernández Sánchez",
  },
  {
    text: "Francisco Javier Fernández González",
    value: "Francisco Javier Fernández González",
  },
  { text: "José Manuel Fernández Gómez", value: "José Manuel Fernández Gómez" },
  { text: "José Manuel Sánchez López", value: "José Manuel Sánchez López" },
  {
    text: "María Teresa Fernández Gómez",
    value: "María Teresa Fernández Gómez",
  },
  {
    text: "Francisco Javier Sánchez Rodríguez",
    value: "Francisco Javier Sánchez Rodríguez",
  },
  {
    text: "María Dolores Fernández González",
    value: "María Dolores Fernández González",
  },
  {
    text: "José María Fernández Rodríguez",
    value: "José María Fernández Rodríguez",
  },
  {
    text: "María Carmen Fernández Sánchez",
    value: "María Carmen Fernández Sánchez",
  },
  {
    text: "Francisco Javier Sánchez García",
    value: "Francisco Javier Sánchez García",
  },
  {
    text: "María Dolores Fernández Ruiz",
    value: "María Dolores Fernández Ruiz",
  },
  { text: "José María Sánchez Pérez", value: "José María Sánchez Pérez" },
  {
    text: "María Teresa Sánchez Fernández",
    value: "María Teresa Sánchez Fernández",
  },
];

// comunidades_tags:
export const arrayComunidades_tags: ValuesFilter[] = [
  { text: "Asturias", value: "Asturias" },
  { text: "Galicia", value: "Galicia" },
  { text: "Murcia", value: "Murcia" },
  { text: "Balears", value: "Balears" },
  { text: "Madrid", value: "Madrid" },
  { text: "Extremadura", value: "Extremadura" },
  { text: "Melilla", value: "Melilla" },
  { text: "Andalucía", value: "Andalucía" },
  { text: "Castilla y León", value: "Castilla y León" },
  { text: "Cataluña", value: "Cataluña" },
  { text: "Comunitat Valenciana", value: "Comunitat Valenciana" },
  { text: "Aragón", value: "Aragón" },
  { text: "Canarias", value: "Canarias" },
  { text: "Cantabria", value: "Cantabria" },
  { text: "Ceuta", value: "Ceuta" },
  { text: "La Rioja", value: "La Rioja" },
  { text: "Navarra", value: "Navarra" },
  { text: "País Vasco", value: "País Vasco" },
  { text: "Baleares", value: "Baleares" },
  { text: "Castilla-La Mancha", value: "Castilla-La Mancha" },
  { text: "Euskadi", value: "Euskadi" },
];

// provincia_tags:
export const arrayProvincia_tags: ValuesFilter[] = [
  { text: "Alta Verapaz", value: "Alta Verapaz" },
  { text: "Baja Verapaz", value: "Baja Verapaz" },
  { text: "Chimaltenango", value: "Chimaltenango" },
  { text: "Chiquimula", value: "Chiquimula" },
  { text: "Guatemala", value: "Guatemala" },
  { text: "El Progreso", value: "El Progreso" },
  { text: "Escuintla", value: "Escuintla" },
  { text: "Huehuetenango", value: "Huehuetenango" },
  { text: "Izabal", value: "Izabal" },
  { text: "Jalapa", value: "Jalapa" },
  { text: "Jutiapa", value: "Jutiapa" },
  { text: "Petén", value: "Petén" },
  { text: "Quetzaltenango", value: "Quetzaltenango" },
  { text: "Quiché", value: "Quiché" },
  { text: "Retalhuleu", value: "Retalhuleu" },
  { text: "Sacatepéquez", value: "Sacatepéquez" },
  { text: "San Marcos", value: "San Marcos" },
  { text: "Santa Rosa", value: "Santa Rosa" },
  { text: "Sololá", value: "Sololá" },
  { text: "Suchitepéquez", value: "Suchitepéquez" },
  { text: "Totonicapán", value: "Totonicapán" },
  { text: "Zacapa", value: "Zacapa" },
  { text: "Mixco", value: "Mixco" },
  { text: "Villa Nueva", value: "Villa Nueva" },
  { text: "Chinautla", value: "Chinautla" },
  { text: "Amatitlán", value: "Amatitlán" },
  { text: "Villa Canales", value: "Villa Canales" },
  { text: "San José Pinula", value: "San José Pinula" },
  { text: "Santa Catarina Pinula", value: "Santa Catarina Pinula" },
  { text: "Fraijanes", value: "Fraijanes" },
  { text: "Palencia", value: "Palencia" },
  { text: "San Juan Sacatepéquez", value: "San Juan Sacatepéquez" },
  { text: "San Pedro Ayampuc", value: "San Pedro Ayampuc" },
  { text: "San Raymundo", value: "San Raymundo" },
  { text: "Chuarrancho", value: "Chuarrancho" },
  { text: "Patzicía", value: "Patzicía" },
  { text: "Patzún", value: "Patzún" },
  { text: "Santa Apolonia", value: "Santa Apolonia" },
  { text: "Tecpán Guatemala", value: "Tecpán Guatemala" },
  { text: "San Andrés Itzapa", value: "San Andrés Itzapa" },
  { text: "Comalapa", value: "Comalapa" },
  { text: "San José Poaquil", value: "San José Poaquil" },
  { text: "San Juan Comalapa", value: "San Juan Comalapa" },
  { text: "Santa Cruz Balanyá", value: "Santa Cruz Balanyá" },
  { text: "San Martín Jilotepeque", value: "San Martín Jilotepeque" },
  { text: "San Miguel Chicaj", value: "San Miguel Chicaj" },
  { text: "Rabinal", value: "Rabinal" },
  { text: "Cubulco", value: "Cubulco" },
  { text: "Granados", value: "Granados" },
  { text: "Purulhá", value: "Purulhá" },
  { text: "Tactic", value: "Tactic" },
  { text: "Tamahú", value: "Tamahú" },
  { text: "Tucurú", value: "Tucurú" },
  { text: "Panzós", value: "Panzós" },
  { text: "Cahabón", value: "Cahabón" },
  { text: "Lanquín", value: "Lanquín" },
  { text: "Chisec", value: "Chisec" },
  { text: "Santa Cruz Verapaz", value: "Santa Cruz Verapaz" },
  { text: "Santa María Cahabón", value: "Santa María Cahabón" },
  { text: "Chahal", value: "Chahal" },
  { text: "Raxruhá", value: "Raxruhá" },
  { text: "San Pedro Carchá", value: "San Pedro Carchá" },
  { text: "Santa Catalina La Tinta", value: "Santa Catalina La Tinta" },
  { text: "San Juan Chamelco", value: "San Juan Chamelco" },
  { text: "San Cristóbal Verapaz", value: "San Cristóbal Verapaz" },
  { text: "Cobán", value: "Cobán" },
  { text: "Chiquimulilla", value: "Chiquimulilla" },
  { text: "Barberena", value: "Barberena" },
  { text: "Oratorio", value: "Oratorio" },
  { text: "Cuilapa", value: "Cuilapa" },
  { text: "Taxisco", value: "Taxisco" },
  { text: "Nueva Santa Rosa", value: "Nueva Santa Rosa" },
  { text: "Casillas", value: "Casillas" },
  { text: "Santa María Ixhuatán", value: "Santa María Ixhuatán" },
  { text: "San Rafael Las Flores", value: "San Rafael Las Flores" },
  { text: "Pueblo Nuevo Viñas", value: "Pueblo Nuevo Viñas" },
  { text: "San Juan Tecuaco", value: "San Juan Tecuaco" },
  { text: "Guazacapán", value: "Guazacapán" },
  { text: "Santa Cruz Naranjo", value: "Santa Cruz Naranjo" },
  { text: "San Cristóbal Cucho", value: "San Cristóbal Cucho" },
  { text: "San Pablo", value: "San Pablo" },
  { text: "San Pedro Sacatepéquez", value: "San Pedro Sacatepéquez" },
  { text: "San Rafael Pie de la Cuesta", value: "San Rafael Pie de la Cuesta" },
  { text: "Concepción Tutuapa", value: "Concepción Tutuapa" },
  { text: "Comitancillo", value: "Comitancillo" },
  { text: "El Quetzal", value: "El Quetzal" },
  { text: "El Tumbador", value: "El Tumbador" },
  { text: "Ixchiguán", value: "Ixchiguán" },
  { text: "La Blanca", value: "La Blanca" },
  { text: "La Reforma", value: "La Reforma" },
  { text: "Malacatán", value: "Malacatán" },
  { text: "Nuevo Progreso", value: "Nuevo Progreso" },
  { text: "Ocos", value: "Ocos" },
  { text: "Pajapita", value: "Pajapita" },
  { text: "Río Blanco", value: "Río Blanco" },
  { text: "San Antonio Sacatepéquez", value: "San Antonio Sacatepéquez" },
  { text: "San Cristóbal Acasaguastlán", value: "San Cristóbal Acasaguastlán" },
  { text: "San Jerónimo", value: "San Jerónimo" },
  { text: "San José La Arada", value: "San José La Arada" },
  { text: "San Sebastián", value: "San Sebastián" },
  { text: "Santa Catarina Mita", value: "Santa Catarina Mita" },
  { text: "Santa Lucía Cotzumalguapa", value: "Santa Lucía Cotzumalguapa" },
  { text: "Santa María Visitación", value: "Santa María Visitación" },
  { text: "Santiago Atitlán", value: "Santiago Atitlán" },
  { text: "Santo Domingo Xenacoj", value: "Santo Domingo Xenacoj" },
  { text: "Sibilia", value: "Sibilia" },
  { text: "Sipacapa", value: "Sipacapa" },
  { text: "Tacaná", value: "Tacaná" },
  { text: "Zunilito", value: "Zunilito" },
];

// municipios_tags:
export const arrayMunicipios_tags: ValuesFilter[] = [
  { text: "Gijón", value: "Gijón" },
  { text: "Oviedo", value: "Oviedo" },
  { text: "Tarragona", value: "Tarragona" },
  { text: "Amposta", value: "Amposta" },
  { text: "Ares", value: "Ares" },
  { text: "Plan", value: "Plan" },
  { text: "Orbita", value: "Orbita" },
  { text: "Santiago de Compostela", value: "Santiago de Compostela" },
  { text: "Murcia", value: "Murcia" },
  { text: "Palma", value: "Palma" },
  { text: "Real", value: "Real" },
  { text: "Eivissa", value: "Eivissa" },
  { text: "Formentera", value: "Formentera" },
  { text: "Ourense", value: "Ourense" },
  { text: "Madrid", value: "Madrid" },
  { text: "Béjar", value: "Béjar" },
  { text: "Salamanca", value: "Salamanca" },
  { text: "Ciudad Rodrigo", value: "Ciudad Rodrigo" },
  { text: "Chamartín", value: "Chamartín" },
  { text: "Fuentes", value: "Fuentes" },
  { text: "Fuentes de Oñoro", value: "Fuentes de Oñoro" },
  { text: "Sagra", value: "Sagra" },
  { text: "Carbajo", value: "Carbajo" },
  { text: "Ronda", value: "Ronda" },
  { text: "Reina", value: "Reina" },
  { text: "Talavera", value: "Talavera" },
  { text: "Talavera de la Reina", value: "Talavera de la Reina" },
  { text: "Toledo", value: "Toledo" },
  { text: "Ávila", value: "Ávila" },
  { text: "Cuenca", value: "Cuenca" },
  { text: "Valladolid", value: "Valladolid" },
  { text: "Gavilanes", value: "Gavilanes" },
  { text: "Pedro Bernardo", value: "Pedro Bernardo" },
  { text: "Prado", value: "Prado" },
  { text: "Grado", value: "Grado" },
  { text: "Adanero", value: "Adanero" },
  { text: "León", value: "León" },
  { text: "Segovia", value: "Segovia" },
  { text: "Segura", value: "Segura" },
  { text: "Vic", value: "Vic" },
  { text: "Pol", value: "Pol" },
  { text: "Parla", value: "Parla" },
  { text: "Fiscal", value: "Fiscal" },
  { text: "Torrella", value: "Torrella" },
  { text: "Benidorm", value: "Benidorm" },
  { text: "Benissa", value: "Benissa" },
  { text: "Finestrat", value: "Finestrat" },
  { text: "Torrevieja", value: "Torrevieja" },
  { text: "Calp", value: "Calp" },
  { text: "Orihuela", value: "Orihuela" },
  { text: "Ciudad Real", value: "Ciudad Real" },
  { text: "Alcázar de San Juan", value: "Alcázar de San Juan" },
  { text: "Mérida", value: "Mérida" },
  { text: "Almadén", value: "Almadén" },
  { text: "Puertollano", value: "Puertollano" },
  { text: "Bolaños de Calatrava", value: "Bolaños de Calatrava" },
  { text: "Fuente el Fresno", value: "Fuente el Fresno" },
  { text: "Langreo", value: "Langreo" },
  { text: "Avilés", value: "Avilés" },
  { text: "Badajoz", value: "Badajoz" },
  { text: "Almendral", value: "Almendral" },
  { text: "Almendralejo", value: "Almendralejo" },
  { text: "Don Benito", value: "Don Benito" },
  { text: "Jerez de los Caballeros", value: "Jerez de los Caballeros" },
  { text: "Villanueva de la Serena", value: "Villanueva de la Serena" },
  { text: "Zafra", value: "Zafra" },
  { text: "Almendra", value: "Almendra" },
  { text: "Alburquerque", value: "Alburquerque" },
  { text: "Guadiana", value: "Guadiana" },
  { text: "Herrera del Duque", value: "Herrera del Duque" },
  { text: "Cáceres", value: "Cáceres" },
  { text: "Llerena", value: "Llerena" },
  { text: "Fregenal de la Sierra", value: "Fregenal de la Sierra" },
  { text: "Castelló", value: "Castelló" },
  { text: "Granada", value: "Granada" },
  { text: "Sevilla", value: "Sevilla" },
  { text: "Mairena del Alcor", value: "Mairena del Alcor" },
  { text: "Arahal", value: "Arahal" },
  { text: "Antequera", value: "Antequera" },
  { text: "Venta de Baños", value: "Venta de Baños" },
  { text: "Simancas", value: "Simancas" },
  { text: "Tordesillas", value: "Tordesillas" },
  { text: "Campo", value: "Campo" },
  { text: "Palencia", value: "Palencia" },
  { text: "Medina del Campo", value: "Medina del Campo" },
  { text: "Siétamo", value: "Siétamo" },
  { text: "Lleida", value: "Lleida" },
  { text: "Almudévar", value: "Almudévar" },
  { text: "Zaragoza", value: "Zaragoza" },
  { text: "Huesca", value: "Huesca" },
  { text: "Canfranc", value: "Canfranc" },
  { text: "Nava", value: "Nava" },
  { text: "Lorca", value: "Lorca" },
  { text: "Cartagena", value: "Cartagena" },
  { text: "Barcelona", value: "Barcelona" },
  { text: "Lugo", value: "Lugo" },
  { text: "Monforte de Lemos", value: "Monforte de Lemos" },
  { text: "Vilamartín de Valdeorras", value: "Vilamartín de Valdeorras" },
  { text: "Portas", value: "Portas" },
  { text: "Amoeiro", value: "Amoeiro" },
  { text: "Pedralba", value: "Pedralba" },
  { text: "Girona", value: "Girona" },
  { text: "Selva", value: "Selva" },
  { text: "Pont de Molins", value: "Pont de Molins" },
  { text: "Figueres", value: "Figueres" },
  { text: "Bàscara", value: "Bàscara" },
  { text: "Garrigàs", value: "Garrigàs" },
  { text: "Vidreres", value: "Vidreres" },
  { text: "Besalú", value: "Besalú" },
  { text: "Cabanelles", value: "Cabanelles" },
  { text: "Ribes de Freser", value: "Ribes de Freser" },
  { text: "Vigo", value: "Vigo" },
  { text: "Teruel", value: "Teruel" },
  { text: "Bilbao", value: "Bilbao" },
  { text: "Hondarribia", value: "Hondarribia" },
  { text: "San Sebastián", value: "San Sebastián" },
  { text: "Vitoria", value: "Vitoria" },
  { text: "Zarautz", value: "Zarautz" },
  { text: "Gernika", value: "Gernika" },
];
