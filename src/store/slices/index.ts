/* eslint-disable import/no-anonymous-default-export */
import themeSlice from './ThemeSlice';
import tokenSlice from './TokenSlice';
import userSlice from './UserSlice';
import sidebarHiddenSlice from './SidebarHiddenSlice';
import { userAPI } from '../../services/UserService';

export default {
    themeSlice,
    tokenSlice,
    userSlice,
    sidebarHiddenSlice,
    [userAPI.reducerPath]: userAPI.reducer
}