import Home from "../pages/Home";
import Login from "../pages/Login";
import Playlists from '../pages/Playlists';
import { ComponentType } from 'react'
import { Playlist } from '../pages/Playlist';

export interface IRoute {
    path: string;
    component: ComponentType;
    type: string;
}

export enum RoutesNamesPrivate {
    HOME = '/',
    PLAYLISTS = '/playlists',
    PLAYLISTS_ID = '/playlists/:id',
    SETTINGS = '/settings',
    LANGUGE = '/language',
}

export enum RoutesNamesPublic {
    LOGIN = '/',
}

export const privateRoutes: IRoute[] = [
    { path: RoutesNamesPrivate.HOME, component: Home, type: 'Home' },
    { path: RoutesNamesPrivate.PLAYLISTS, component: Playlists, type: 'Playlists' },
    { path: RoutesNamesPrivate.PLAYLISTS_ID, component: Playlist, type: 'Playlist' },
    { path: RoutesNamesPrivate.SETTINGS, component: Home, type: 'Settings' },
    { path: RoutesNamesPrivate.LANGUGE, component: Home, type: 'Language' },
]

export const publicRoutes: IRoute[] = [{ path: RoutesNamesPublic.LOGIN, component: Login, type: 'Login' },]