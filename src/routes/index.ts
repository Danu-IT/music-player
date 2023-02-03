import Home from "../pages/Home";
import Login from "../pages/Login";
import { ComponentType } from "react";
import { Playlist } from "../pages/Playlist";
import Library from "../pages/Library";
import Artist from "../pages/Artist";
import Album from "../pages/Album";

export interface IRoute {
  path: string;
  component: ComponentType;
  type: string;
}

export enum RoutesNamesPrivate {
  HOME = "/",
  LIBRARY = "/library",
  PLAYLISTS_ID = "/playlists/:id",
  SETTINGS = "/settings",
  LANGUGE = "/language",
  ARTISTS = "/artists/:id",
  ALBUMS = "/albums/:id",
}

export enum RoutesNamesPublic {
  LOGIN = "/",
}

export const privateRoutes: IRoute[] = [
  { path: RoutesNamesPrivate.HOME, component: Home, type: "Home" },
  { path: RoutesNamesPrivate.LIBRARY, component: Library, type: "Library" },
  {
    path: RoutesNamesPrivate.PLAYLISTS_ID,
    component: Playlist,
    type: "Playlist",
  },
  { path: RoutesNamesPrivate.SETTINGS, component: Home, type: "Settings" },
  { path: RoutesNamesPrivate.LANGUGE, component: Home, type: "Language" },
  { path: RoutesNamesPrivate.ARTISTS, component: Artist, type: "Artist" },
  {
    path: RoutesNamesPrivate.ALBUMS, component: Album, type: "Albums"
  }
];

export const publicRoutes: IRoute[] = [
  { path: RoutesNamesPublic.LOGIN, component: Login, type: "Login" },
];
