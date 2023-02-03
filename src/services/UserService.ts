import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  IUser,
  IUserPlaylist,
  IUserPlaylistTracks,
  IUserPlaylistTrackHaracter,
} from "../interfaces/user";
import { IArtist, IArtists } from '../interfaces/artist';
import { IAlbums, IAlbum } from '../interfaces/album';
import { IUserPlaylistTrack } from '../interfaces/user';

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com",
    prepareHeaders: (headers, { getState }) => {
      const {
        tokenSlice: { token },
      } = getState() as any;

      if (token) {
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    currentUser: build.query<IUser, null>({ // Получение пользователя
      query: () => ({
        url: "/v1/me",
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylists: build.query<IUserPlaylist[], null>({ // Получить действующие плейлисты
      query: () => ({
        url: "/v1/me/playlists",
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylist: build.query<IUserPlaylist, string>({ // Получить действующий плейлист
      query: (id: string) => ({
        url: `/v1/playlists/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylistTracks: build.query<IUserPlaylistTracks, string>({ // Получить треки из действующего плейлиста
      query: (id: string) => ({
        url: `/v1/playlists/${id}/tracks`,
      }),
      providesTags: (result) => ["User"],
    }),
    getArtist: build.query<IArtist, string>({// Получить артиста
      query: (id: string) => ({
        url: `/v1/artists/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    getArtistsTopTracks: build.query<// Получить лучшие треки артиста
      IUserPlaylistTrackHaracter,
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `/v1/artists/${id}/top-tracks`,
          params: { market: "ES" },
        };
      },
      providesTags: (result) => ["User"],
    }),
    getArtistsAlbums: build.query<IAlbums, { id: string }>({// Получить альбомы артиста
      query: ({ id }) => {
        return {
          url: `/v1/artists/${id}/albums`,
          params: { market: "ES" },
        };
      },
      providesTags: (result) => ["User"],
    }),
    getAlbumTracks: build.query<IUserPlaylistTrack, { id: string }>({// Получить треки из альбома артиста
      query: ({ id }) => {
        return {
          url: `/v1/tracks/${id}`,
          params: { market: "ES", limit: 10 },
        };
      },
      providesTags: (result) => ["User"],
    }),
    getAlbum: build.query<IAlbum, { id: string }>({// Получить альбом
      query: ({ id }) => {
        return {
          url: `/v1/albums/${id}`,
          params: { market: "ES" },
        };
      },
      providesTags: (result) => ["User"],
    }),
    getArtistsRelatedArtists: build.query<IArtists, string>({
      query: (id) => ({
        url: `/v1/artists/${id}/related-artists`,
      }),
      providesTags: (result) => ["User"],
    }),
    RecentlyPlayedTracks: build.query<any, null>({
      query: () => ({
        url: "/v1/me/player/recently-played",
      }),
      providesTags: (result) => ["User"],
    }),
  }),
}); 
