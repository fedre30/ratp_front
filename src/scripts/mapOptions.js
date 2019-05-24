// IMPORTS

import M1 from "images/lines/M_1.png";
import M2 from "images/lines/M_2.png";
import M3 from "images/lines/M_3.png";
import M3bis from "images/lines/M_3bis.png";
import M4 from "images/lines/M_4.png";
import M5 from "images/lines/M_5.png";
import M6 from "images/lines/M_6.png";
import M7 from "images/lines/M_7.png";
import M7bis from "images/lines/M_7bis.png";
import M8 from "images/lines/M_8.png";
import M9 from "images/lines/M_9.png";
import M10 from "images/lines/M_10.png";
import M11 from "images/lines/M_11.png";
import M12 from "images/lines/M_12.png";
import M13 from "images/lines/M_13.png";
import M14 from "images/lines/M_14.png";
import rerA from "images/lines/RER_A.png";
import rerB from "images/lines/RER_B.png";

import { colors } from "styles/const";

// <---------------------------------- STATIONS ------------------------------------->

export const underground = [
  {
    id: 1,
    src: M1,
    type: "metro",
    line: "1",
    active: false,
  },
  {
    id: 2,
    src: M2,
    type: "metro",
    line: "2",
    active: false,
  },
  {
    id: 3,
    src: M3,
    type: "metro",
    line: "3",
    active: false,
  },
  {
    id: 4,
    src: M3bis,
    type: "metro",
    line: "M3bis",
    active: false,
  },
  {
    id: 5,
    src: M4,
    type: "metro",
    line: "4",
    active: false,
  },
  {
    id: 6,
    src: M5,
    type: "metro",
    line: "5",
    active: false,
  },
  {
    id: 7,
    src: M6,
    type: "metro",
    line: "6",
    active: false,
  },
  {
    id: 8,
    src: M7,
    type: "metro",
    line: "7",
    active: false,
  },
  {
    id: 9,
    src: M7bis,
    type: "metro",
    line: "7b",
    active: false,
  },
  {
    id: 10,
    src: M8,
    type: "metro",
    line: "8",
    active: false,
  },
  {
    id: 11,
    src: M9,
    type: "metro",
    line: "9",
    active: false,
  },
  {
    id: 12,
    src: M10,
    type: "metro",
    line: "10",
    active: false,
  },
  {
    id: 13,
    src: M11,
    type: "metro",
    line: "11",
    active: false,
  },
  {
    id: 14,
    src: M12,
    type: "metro",
    line: "12",
    active: false,
  },
  {
    id: 15,
    src: M13,
    type: "metro",
    line: "13",
    active: false,
  },
  {
    id: 16,
    src: M14,
    type: "metro",
    line: "14",
    active: false,
  },
  {
    id: 17,
    src: rerA,
    type: "rer",
    line: "RER A",
    active: false,
  },
  {
    id: 18,
    src: rerB,
    type: "rer",
    line: "RER B",
    active: false,
  },
];

// <------------------------- CRITERIA --------------------------->

export const filters = [
  {
    id: 1,
    icon: "air",
    label: "Qualité de l'air",
    active: true,
  },
  {
    id: 2,
    icon: "trafic",
    label: "Trafic",
    active: false,
  },
  {
    id: 3,
    icon: "toilets",
    label: "Toilettes",
    active: false,
  },
  {
    id: 4,
    icon: "wheelchair",
    label: "Accessibilité",
    active: false,
  },
];

// <------------------------- POLLUTION BUTTONS -------------------------->

export const pollutionButtons = [
  {
    index: "pm10",
    text: "PM10",
    active: false,
    tooltip:
      "Les PM10 sont des particules en suspension dans l'air dont le diamètre est inférieur à 10 micromètres",
  },
  {
    index: "no2",
    text: "NO2",
    active: false,
    tooltip:
      "Le dioxyde d’azote (NO2) se forme dans l’atmosphère à partir du monoxyde d'azote (NO) qui se dégage essentiellement lors de la combustion de combustibles fossiles, dans la circulation routière, par exemple",
  },
  {
    index: "o3",
    text: "O3",
    active: false,
    tooltip:
      "Il s'agit d'une variété gazeuse allotropique de l'oxygène (O), plus lourde que l'air. On parle du ''bon'' c'est-à-dire ozone stratosphérique et du ''mauvais'' c'est-à-dire ozone à la surface de la terre, également appelé ozone troposphérique.",
  },
  {
    index: "",
    text: "Moyenne",
    active: false,
    tooltip: "Moyenne Description",
  },
];

// <------------------------- TRAFIC BUTTONS -------------------------->

export const traficButtons = [
  {
    index: "average",
    text: "Trafic Moyen",
    active: false,
  },
  {
    index: "max",
    text: "Trafic Maximal",
    active: false,
  },
];

// <------------------------- TOILETS BUTTONS -------------------------->

export const toiletsButtons = [
  {
    index: "gratuit",
    text: "Gratuit",
    active: false,
  },
  {
    index: "payant",
    text: "Payant",
    active: false,
  },
  {
    index: "accesBoutonpoussoir",
    text: "Accès Bouton Poussoir",
    active: false,
  },
  {
    index: "",
    text: "Reset",
    active: false,
  },
];

// <------------------------- ACCESSIBILITY BUTTONS -------------------------->

export const accessibilityButtons = [
  {
    index: "ufr",
    text: "UFR",
    active: false,
  },
  {
    index: "annonceSonoreProchainPassage",
    text: "Signal sonore",
    active: false,
  },
  {
    index: "annonceVisuelleProchainPassage",
    text: "Signal visuel",
    active: false,
  },
  {
    index: "",
    text: "Reset",
    active: false,
  },
];

// <---------------------------------- ZOOM BUTTONS --------------------------------------->

export const zoomButtons = [
  {
    id: "plus",
    icon: "zoomIn",
    iconColor: colors.primary,
  },
  {
    id: "minus",
    icon: "zoomOut",
    iconColor: colors.primary,
  },
  {
    id: "reset",
    icon: "reset",
    iconColor: colors.primary,
  },
];
