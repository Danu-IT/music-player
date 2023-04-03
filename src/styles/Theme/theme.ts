import { ITheme, ThemeEnum } from "./../../interfaces/styled";

export const baseTheme: ITheme = {
  colors: {
    bgMain: '',
    primary: "#76CCFB",
    secondary: "#FFFFFF",
    success: "#4caf50",
    danger: "#f44336",
    bg: "#0F1E36",
  },
  type: "light",
};

export const lightTheme = {
  ...baseTheme,
  type: ThemeEnum.light,
  colors: {
    ...baseTheme.colors,
    bgMain: '#76CCFB',
    bg: "#76CCFB",
    dark: "#1fCCFB",
    primary: "#0F1E36",
    secondary: "#000000",
  },
};

export const darkTheme = {
  ...baseTheme,
  type: ThemeEnum.dark,
  colors: {
    ...baseTheme.colors,
    bgMain: 'linear-gradient(90deg, rgba(1,101,140,1) 0%, rgba(1,101,140,1) 41%, rgba(15,30,50,1) 79%, rgba(1,111,146,1) 95%)',
    bg: "#0F1E32",
    dark: "#1F1E36",
    primary: "#76CCFB",
    secondary: "#FFFFFF",
  },
};
