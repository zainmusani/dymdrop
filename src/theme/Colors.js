// import { Platform } from "react-native";

// const white = "#FFFFFF";
// const black = "#000000";
// const black1 = "#323a45";
// const grey = "#707070";
// const grey1 = "#707070";
// const grey2 = "#aaaaaa";
// const grey3 = "#D5D8DB";
// const grey4 = "#8a959e";
// const grey5 = "#4e4e4e";
// const grey6 = "#f6f6f6";
// const gray7 = "#999999";
// const gary9 = "#e9e9e9";
// const gray10 = "#efeff4";
// const gray11 = "#c8c8c8";
// const gray12 = "#818181";
// const lightGray = "#f2f2f2";
// const graybrown = "#444444";
// const gray8 = "#f2f2f2";
// const yellow = "#ffc415";
// const green1 = "#32ccb0";
// const green2 = "#5cba47";
// const orange1 = "#fdb918";
// const orange2 = "#ff3d2e";

// const iceblue = "#f5f8ff";

// const transparent = "rgba(0,0,0,0)";
// const red = "#f94242";
// const red2 = "#f41729";
// const blue = "#4965b3";
// const blue1 = "#161b54";
// const blue2 = "#5c6d96";
// const blue3 = "#4965b3";
// const linkBlue = "#007bff";
// const lightblue = "#8092bc";
// const green = "#32b34a";
// const silver = "#dfdfe0";
// const silver1 = "#d1d1d6";
// const primary = white;
// const secondary = white;
// const tertiary = black;
// const quaternary = grey;

// const background = {
//   primary,
//   secondary: "#f2f2f2",
//   tertiary: "#00000057"
// };

// const text = {
//   primary: "#212121",
//   secondary: "#bcbcbc",
//   tertiary: primary,
//   quaternary: "#707070",
//   accent: "#ff2824"
// };

// const presetColors = {
//   primary: ["#febb5b", "#f24645"],
//   secondary: ["#f24645", "#febb5b"],
//   instagram: [
//     "rgb(106, 57, 171)",
//     "rgb(151, 52, 160)",
//     "rgb(197, 57, 92)",
//     "rgb(231, 166, 73)",
//     "rgb(181, 70, 92)"
//   ],
//   firefox: [
//     "rgb(236, 190, 55)",
//     "rgb(215, 110, 51)",
//     "rgb(181, 63, 49)",
//     "rgb(192, 71, 45)"
//   ],
//   sunrise: [
//     "rgb(92, 160, 186)",
//     "rgb(106, 166, 186)",
//     "rgb(142, 191, 186)",
//     "rgb(172, 211, 186)",
//     "rgb(239, 235, 186)",
//     "rgb(212, 222, 206)",
//     "rgb(187, 216, 200)",
//     "rgb(152, 197, 190)",
//     "rgb(100, 173, 186)"
//   ]
// };

// const navbar = {
//   background: background.primary,
//   text: text.primary
// };
// const dateColors = [
//   red,
//   blue1,
//   yellow,
//   orange2,
//   blue,
//   green1,
//   blue,
//   blue1,
//   yellow,
//   green,
//   orange2,
//   blue,
//   green1,
//   orange1,
//   green1,
//   orange1,
//   blue,
//   graybrown,
//   green1,
//   green,
//   blue1,
//   graybrown,
//   graybrown,
//   blue1,
//   linkBlue,
//   yellow,
//   green,
//   blue1,
//   red,
//   red2,
//   yellow,
//   blue,
//   orange1,
//   green,
//   yellow,
//   lightblue,
//   iceblue
// ];
// const border = "#f2f2f2";
// const separator = "#f2f2f2";

// const windowTint = "rgba(0, 0, 0, 0.4)";
// const windowTintWhite = "rgba(255, 255, 255, 0.1)";

// const colorsArray1 = [green1, green2, orange1, orange2];

// export default {
//   white,
//   black,
//   black1,
//   grey,
//   grey1,
//   grey2,
//   grey3,
//   grey4,
//   grey5,
//   grey6,
//   gray7,
//   gray8,
//   yellow,
//   gary9,
//   gray10,
//   gray11,
//   gray12,
//   transparent,
//   red,
//   blue,
//   blue1,
//   blue2,
//   blue3,
//   green,
//   silver,
//   silver1,
//   primary,
//   secondary,
//   tertiary,
//   quaternary,
//   lightGray,
//   graybrown,
//   green1,
//   green2,
//   orange1,
//   orange2,

//   background,
//   navbar,
//   text,
//   presetColors,
//   border,
//   separator,
//   windowTint,
//   windowTintWhite,

//   twitter: "#41abe1",
//   google: "#e94335",
//   facebook: "#3b5998",

//   info: "#19bfe5",
//   warning: "#feb401",
//   danger: "#ed1c4d",
//   success: "#b76c94",
//   dateColors,
//   colorsArray1
// };

const isDarkMode = false;

const white = '#FFFFFF';
const black = '#000';
const resolutionBlue = '#002286';
const transparent = 'rgba(0, 0, 0, 0)';

const background = {
  primary: isDarkMode ? black : white,
  secondary: isDarkMode ? black : '#f2f2f2',
  overlay: 'rgba(0, 0, 0, 0.5)',
  tertiary: isDarkMode ? black : '#f0f3f5',
  quaternary: isDarkMode ? black : 'rgba(21, 107, 249, 0.2)',
  accent: isDarkMode ? black : '#1D2126',
  hexa: isDarkMode ? black : '#062143',
  hepta: isDarkMode ? black : '#FF0045',
  seca: isDarkMode ? black : '#acacac',
  reca: isDarkMode ? black : '#ffffff40',
  heca: isDarkMode ? black : '#333240',
  cheka: isDarkMode ? black : '#2a2e43',
};

const text = {
  primary: isDarkMode ? white : black,
  secondary: isDarkMode ? black : '#5b596a',
  tertiary: isDarkMode ? black : white,
  malachite: isDarkMode ? black : '#12E619',
  quaternary: isDarkMode ? black : '#A4A6AA',
  accent: isDarkMode ? black : resolutionBlue,
  hexa: isDarkMode ? black : '#787878',
  error: isDarkMode ? black : '#eb2e2e',
  deca: isDarkMode ? black : '#acacac',
  penta: isDarkMode ? black : '#504e4e',
  zeka: isDarkMode ? black : '#666e7e',
  hepta: isDarkMode ? black : '#4CD964',
  seca: isDarkMode ? black : '#222455',
  peca: isDarkMode ? black : '#6e7faa',
  heca: isDarkMode ? black : '#3E3F68',
  reca: isDarkMode ? black : '#156bf9',

  weca: isDarkMode ? black : '#007aff',
  yeka: isDarkMode ? black : '#454f63',
  neka: isDarkMode ? black : '#333240',
  feca: 'rgba(248, 248, 248, 0.92)',

  teka: 'rgba(0,0,0,0.3)',
  veca: 'rgba(0,0,0,1)',
  blue: '#0060ff',
};

const image = {
  primary: isDarkMode ? black : white,
  secondary: isDarkMode ? white : black,
  tertiary: isDarkMode ? black : '#0FEF52',
  quaternary: isDarkMode ? black : '#A4A6AA',
  accent: isDarkMode ? black : resolutionBlue,
};

const gradient = {
  primary: isDarkMode ? [black, black] : [resolutionBlue, '#f8446f'],
  secondary: isDarkMode ? [black, black] : [white, white],
  tertiary: isDarkMode ? [white, white] : [black, black],
  quaternary: isDarkMode ? [white, white] : ['#ff8c48', '#ff5673'],
};

const error = {
  primary: isDarkMode ? '#f94242' : '#f94242',
};

const button = {
  primary: isDarkMode ? black : '#156bf9',
  secondary: isDarkMode ? black : '#686565',
  tertiary: isDarkMode ? black : '#A4A6AA',
  quaternary: isDarkMode ? black : '#1D2126',
  accent: isDarkMode ? black : '#4FBE79',
  deca: isDarkMode ? black : '#00bc26',
  hexa: isDarkMode ? black : white,
  hepta: isDarkMode ? black : '#9E4CD8',
  seca: isDarkMode ? black : '#dcdcdc',
  reca: isDarkMode ? black : '#ffffff',
  danger: isDarkMode ? black : '#FF0045',
  lang: isDarkMode ? black : '#8F128F',
};

const alertBtn = {
  primary: isDarkMode ? black : '#20c670',
  secondary: isDarkMode ? black : '#333240',
  quaternary: isDarkMode ? black : '#82828a',
};

const deliveryMode = {
  online: isDarkMode ? [black, black] : ['#31A4F7', '#2444E2'],
  offline: isDarkMode ? [black, black] : ['#FFA590', '#FF7656'],
  waspha: isDarkMode ? [black, black] : ['#C67DFA', '#913CCD'],
  change: isDarkMode ? [black, black] : ['#ff7656', '#ff7656'],
};

const progressBar = {
  primary: isDarkMode ? black : '#20c670',
  secondary: isDarkMode ? black : 'rgba(21, 107, 249, 0.2)',
  tertiary: isDarkMode ? black : '#333240',
};

// const navbar = {
//   primary: resolutionBlue,
//   secondary: '#7B327A',
// };

const contactOptionsColor = {
  enable: isDarkMode ? black : '#663399',
  disable: isDarkMode ? black : '#cec8de',
};
const navbar = {
  background: background.quaternary,
  text: text.tertiary,
};
const border = {
  primary: isDarkMode ? white : black,
  secondary: isDarkMode ? black : white,
  tertiary: isDarkMode ? black : '#f0f3f5',
  quaternary: isDarkMode ? black : '#cad5dc',
  hepta: isDarkMode ? black : '#156bf9',
  deca: isDarkMode ? black : '#4a4a4a',
  accent: isDarkMode ? black : '#cad5dc',
  peta: isDarkMode ? black : '#f7f9fc',
  error: isDarkMode ? black : '#FF0045',
  margin: isDarkMode ? black : '#e4e4e4',
  veca: isDarkMode ? black : '#c6c6c8',
  teka: isDarkMode ? black : '#78849e',
  hica: isDarkMode ? black : 'rgba(202,213,220,.4)',
};

const label = {
  primary: isDarkMode ? black : '#FF0045',
  secondary: isDarkMode ? black : black,
  // penta: isDarkMode ? white : 'rgba(21,107,249,0.4)',

  tertiary: isDarkMode ? white : '#156bf9',
  penta: isDarkMode ? white : 'rgba(0,0,0,0.8)',
};

const social = {
  gmail: isDarkMode ? black : '#DD4B39',
  fb: isDarkMode ? black : '#3B5999',
};

const switchButton = {
  primary: isDarkMode ? white : black,
};

const badge = {
  primary: isDarkMode ? black : '#ffffff',
  secondary: isDarkMode ? black : '#3497fd',
  tertiary: isDarkMode ? black : '#f0f3f5',
};
const loader = {
  primary: isDarkMode ? black : black,
  secondary: isDarkMode ? black : white,
  tertirary: isDarkMode ? black : '#00bc26',
};

const icon = {
  primary: isDarkMode ? white : '#000000',
  secondary: isDarkMode ? black : white,
  tertirary: isDarkMode ? black : '#00bc26',
};
const linkProgressColors = [
  '#00bc26',
  '#913CCD',
  '#31A4F7',
  '#FF0045',
  '#222455',
  '#19bfe5',
  '#b76c94',
  '#444444',
  '#ffc415',
  '#32ccb0',
  '#002286',
  '#6e7faa',
];

export default {
  loader,
  switchButton,
  white,
  black,
  background,
  text,
  navbar,
  button,
  label,
  deliveryMode,
  gradient,
  social,
  error,
  border,
  image,
  transparent,
  contactOptionsColor,
  badge,
  resolutionBlue,
  icon,
  progressBar,
  alertBtn,
  linkProgressColors,
};
