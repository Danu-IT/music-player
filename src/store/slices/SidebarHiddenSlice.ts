import { createSlice } from '@reduxjs/toolkit';

interface SidebarHiddenSliceState {
    vissible: boolean;
}

const initialState: SidebarHiddenSliceState = {
    vissible: true,
}

export const sidebarHiddenSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggle(state) {
            state.vissible = !state.vissible;
        }
    }
})

export default sidebarHiddenSlice.reducer
export const { toggle } = sidebarHiddenSlice.actions