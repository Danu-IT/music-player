import tokenSlice from './slices/TokenSlice';
import themeSlice from './slices/ThemeSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from '../services/UserService';
import userSlice from './slices/UserSlice';

const rootReducer = combineReducers({
    themeSlice,
    tokenSlice,
    userSlice,
    [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];