import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserPlaylist } from '../../interfaces/user';

interface userState {
    currentUser: IUser | null;
    currentUserPlaylists: IUserPlaylist[];
}

const initialState: userState = {
    currentUser: null,
    currentUserPlaylists: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        receiveСurrentUser(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload
        },
        receiveCurrentUserPlaylists(state, action: PayloadAction<IUserPlaylist[]>) {
            state.currentUserPlaylists = action.payload
        }
    },
});

export default userSlice.reducer;
export const { receiveСurrentUser, receiveCurrentUserPlaylists } = userSlice.actions;
