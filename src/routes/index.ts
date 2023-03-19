import { Playlist } from './../pages/Playlist/Playlist';
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { ComponentType } from "react";
import { PlaylistCurrent } from "../pages/PlaylistCurrent/PlaylistCurrent";
import Library from "../pages/Library/Library";
import Artist from "../pages/Artist/Artist";
import Album from "../pages/Album/Album";
import Category from "../pages/Category/Category";

export interface IRoute {
  path: string;
  component: ComponentType;
  type: string;
}

export enum RoutesNamesPrivate {
  HOME = "/",
  LIBRARY = "/library",
  PLAYLISTS_ID = "/playlists/:id",
  PLAYLISTS_CURRENT_ID = "/playlistsCurrent/:id",
  SETTINGS = "/settings",
  LANGUGE = "/language",
  ARTISTS = "/artists/:id",
  ALBUMS = "/albums/:id",
  CATEGORY = "/category/:id",
  MYALBUMS = "/library/albums",
  MYPLAYLISTS = "/library/playlists",
  MYARTISTS = "/library/artists",
}

export enum RoutesNamesPublic {
  LOGIN = "/",
}

export const privateRoutes: IRoute[] = [
  { path: RoutesNamesPrivate.HOME, component: Home, type: "Home" },
  { path: RoutesNamesPrivate.LIBRARY, component: Library, type: "Library" },
  { path: RoutesNamesPrivate.SETTINGS, component: Home, type: "Settings" },
  { path: RoutesNamesPrivate.LANGUGE, component: Home, type: "Language" },
  { path: RoutesNamesPrivate.ARTISTS, component: Artist, type: "Artist" },
  {
    path: RoutesNamesPrivate.ALBUMS, component: Album, type: "Albums"
  },
  {
    path: RoutesNamesPrivate.PLAYLISTS_CURRENT_ID,
    component: PlaylistCurrent,
    type: "Playlist",
  },
  {
    path: RoutesNamesPrivate.PLAYLISTS_ID,
    component: Playlist,
    type: "Playlist",
  },
  { path: RoutesNamesPrivate.MYALBUMS, component: Artist, type: "MyArtist" },
  { path: RoutesNamesPrivate.MYPLAYLISTS, component: Artist, type: "MyAlbums" },
  { path: RoutesNamesPrivate.MYARTISTS, component: Artist, type: "MyPlaylist" },
  { path: RoutesNamesPrivate.CATEGORY, component: Category, type: "Category" },
];

export const publicRoutes: IRoute[] = [
  { path: RoutesNamesPublic.LOGIN, component: Login, type: "Login" },
];
