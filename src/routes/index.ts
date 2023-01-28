import Home from "../pages/Home";
import Login from "../pages/Login";
import Playlists from '../pages/Playlists';
import { ComponentType } from 'react'

export interface IRoute {
    path: string;
    component: ComponentType;
}

export enum RoutesNames {
    HOME = '/',
    LOGIN = '/',
    PLAYLISTS = '/playlists'
}

export const privateRoutes: IRoute[] = [
    { path: RoutesNames.HOME, component: Home },
    { path: RoutesNames.PLAYLISTS, component: Playlists },
]

export const publicRoutes: IRoute[] = [{ path: RoutesNames.LOGIN, component: Login },]