import { ITheme, ThemeEnum } from "./../../interfaces/styled";

export const baseTheme: ITheme = {
  colors: {
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
    bg: "#0F1E36",
    dark: "#1F1E36",
    primary: "#76CCFB",
    secondary: "#FFFFFF",
  },
};
