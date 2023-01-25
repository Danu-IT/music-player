import { ITheme } from '../../interfaces/styled';
import { lightTheme, darkTheme } from '../../styles/Theme/theme';
import { createSlice } from '@reduxjs/toolkit';

interface themeState {
    theme: ITheme;
}

const initialState: themeState = {
    theme: darkTheme,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme.type === 'light' ? darkTheme : lightTheme;
        }
    }
})

export default themeSlice.reducer
export const { toggleTheme } = themeSlice.actions