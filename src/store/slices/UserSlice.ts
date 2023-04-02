import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserPlaylist } from '../../interfaces/user';

interface userState {
    currentUser: IUser | null;
    currentUserPlaylists: IUserPlaylist[];
    search: string;
    player: boolean;
    trackID: string;
    context: any;
}

const initialState: userState = {
    currentUser: null,
    currentUserPlaylists: [],
    search: '',
    player: false,
    trackID: '',
    context: {}
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
        },
        changeSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        },
        changeVisiblePlayer(state, action: PayloadAction<boolean>){
            state.player = action.payload
        },
        changeTrack(state, action: PayloadAction<string>){
            state.trackID = action.payload
        },
        changeContext(state, action: PayloadAction<any>){
            state.context = action.payload
        }
    },
});

export default userSlice.reducer;
export const { receiveСurrentUser, receiveCurrentUserPlaylists, changeSearch, changeVisiblePlayer, changeTrack } = userSlice.actions;
