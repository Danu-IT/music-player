import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserPlaylist } from '../../interfaces/user';

interface userState {
    currentUser: IUser | null;
    currentUserPlaylists: IUserPlaylist[];
    search: string;
    player: boolean;
    trackID: string;
    context: any;
    indexStore: number;
    isPlay: boolean;
    duration: string;
    time: number; 
    
}

const initialState: userState = {
    currentUser: null,
    currentUserPlaylists: [],
    search: '',
    player: false,
    trackID: '',
    context: '',
    indexStore: 0,
    isPlay: false,
    duration: '0',
    time: 0,
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
        },
        changeIndex(state, action: PayloadAction<any>){
            state.indexStore = action.payload
        },
        changePlayTrack(state, action: PayloadAction<any>){
            state.isPlay = action.payload
        }, 
        changeDuration(state, action: PayloadAction<any>){
            state.duration = action.payload
        },
        changeTime(state, action: PayloadAction<any>){
            state.time = action.payload
        }
    },
});

export default userSlice.reducer;
export const { changeDuration, changeTime, receiveСurrentUser, receiveCurrentUserPlaylists, changeSearch, changeVisiblePlayer, changeTrack, changeContext, changeIndex, changePlayTrack } = userSlice.actions;
