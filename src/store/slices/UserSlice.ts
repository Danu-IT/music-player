import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

interface userState {
    currentUser: IUser | null;
}

const initialState: userState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        receiveСurrentUser(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload
        }
    },
});

export default userSlice.reducer;
export const { receiveСurrentUser } = userSlice.actions;
