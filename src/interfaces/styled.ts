export interface ITheme {
    type: string,
    colors: {
        primary: string
        secondary: string
        success: string
        danger: string
        bg: string,
    },
}

export enum ThemeEnum {
    light = "light",
    dark = "dark"
}