import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tokenState {
  token: null | string;
}

const initialState: tokenState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    isToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export default tokenSlice.reducer;
export const { isToken } = tokenSlice.actions;
