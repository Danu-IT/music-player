import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  IUser,
  IUserPlaylist,
  IUserPlaylistTracks,
  IUserPlaylistTrackHaracter,
} from "../interfaces/user";
import { IArtist, IArtists, IMyArtists } from '../interfaces/artist';
import { IAlbums, IAlbum, IMyAlbums } from '../interfaces/album';
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
  tagTypes: ["User", "Artist", "Playlist"],
  endpoints: (build) => ({
    currentUserPlaylists: build.query<IUserPlaylist[], null>({ // Получить действующие плейлисты
      query: () => ({
        url: "/v1/me/playlists",
      }),
      providesTags: (result) => ["Playlist"],
    }),
    currentUserPlaylist: build.query<IUserPlaylist, string>({ // Получить действующий плейлист
      query: (id: string) => ({
        url: `/v1/playlists/${id}`,
      }),
      providesTags: (result) => ["Playlist"],
    }),
    currentUserPlaylistTracks: build.query<IUserPlaylistTracks, string>({ // Получить треки из действующего плейлиста
      query: (id: string) => ({
        url: `/v1/playlists/${id}/tracks`,
      }),
      providesTags: (result) => ["Playlist"],
    }),
    updateUserPlaylist: build.mutation<any, { id: string, name: string }>({ // Изменить плейлист
      query: ({ id, name }) => ({
        url: `/v1/playlists/${id}`,
        method: 'PUT',
        body: { name: name }
      }),
      invalidatesTags: ['Playlist']
    }),
    updateUserPlaylistItems: build.mutation<any, { // Изменить элемент плейлист
      playlist_id: string, uris: string[], range_start: number
      , insert_before: number, range_length: number
    }>({
      query: ({ playlist_id, uris, range_start, insert_before, range_length }) => {
        return {
          url: `/v1/playlists/${playlist_id}/tracks`,
          method: 'PUT',
          body: { 'uris': [uris], 'range_start': range_start, 'insert_before': insert_before, 'range_length': range_length }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    postUserPlaylist: build.mutation<IUserPlaylistTracks, string>({ // Создать плейлист
      query: (id) => {
        return {
          url: `/v1/users/${id}/playlists`,
          method: 'POST',
          body: { name: 'default-name' }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    postItemsToPlaylist: build.mutation<IUserPlaylistTracks, { id: string, url: string }>({ // Добавить трек в плейлист
      query: ({ id, url }) => {
        return {
          url: `/v1/playlists/${id}/tracks`,
          method: 'POST',
          body: { 'uris': [`spotify:track:${url}`], 'position': 0 }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    deleteUserPlaylist: build.mutation<any, string>({ // Удалить плейлист
      query: (ids) => ({
        url: `/v1/playlists/${ids}/followers`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlist']
    }),
    deleteUserPlaylistTrack: build.mutation<any, { ids: string, url: string }>({ // Удалить трек из плейлист
      query: ({ ids, url }) => {
        return {
          url: `/v1/playlists/${ids}/tracks`,
          method: 'DELETE',
          body: { "tracks": [{ 'uri': `spotify:track:${url}` }] }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    getUsersSavedTracks: build.query<IUser, null>({ // Получение пользователя
      query: () => ({
        url: "/v1/me/tracks",
      }),
      providesTags: (result) => ["User"],
    }),
    currentUser: build.query<IUser, null>({ // Получение пользователя
      query: () => ({
        url: "/v1/me",
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
    getArtistsRelatedArtists: build.query<IArtists, string>({ // Получить похожих артистов
      query: (id) => ({
        url: `/v1/artists/${id}/related-artists`,
      }),
      providesTags: (result) => ["User"],
    }),
    getUsersSavedAlbums: build.query<IMyAlbums, null>({ // Получить сохраненные альбомы пользователя
      query: () => {
        return {
          url: `/v1/me/albums`,
          params: { limit: 20, market: 'ES' },
        };
      },
      providesTags: (result) => ["User"],
    }),
    getFollowedArtists: build.query<IMyArtists, null>({// Получить подписанных артистов
      query: () => {
        return {
          url: `/v1/me/following`,
          params: { type: 'artist' },
        };
      },
      providesTags: (result) => ["Artist"],
    }),
    getCheckIfUserFollowsArtists: build.query<boolean[], { ids: string | undefined, type: string }>({// Проверить подписан ли на артиста
      query: ({ ids, type }) => {
        return {
          url: `/v1/me/following/contains`,
          params: { ids: ids, type: type },
        };
      },
      providesTags: (result) => ["Artist"],
    }),
    updateFollowArtists: build.mutation<any, { ids: string | undefined, type: string }>({ // Подписка на артиста
      query: ({ ids, type }) => ({
        url: `/v1/me/following`,
        method: 'PUT',
        params: { ids: ids, type: type },
        body: { ids: [ids] }
      }),
      invalidatesTags: ['Artist']
    }),
    deleteFollowArtists: build.mutation<any, { ids: string | undefined, type: string }>({ // Отписка от артиста
      query: ({ ids, type }) => ({
        url: `/v1/me/following`,
        method: 'Delete',
        params: { ids: ids, type: type },
        body: { ids: [ids] }
      }),
      invalidatesTags: ['Artist']
    }),
    RecentlyPlayedTracks: build.query<any, null>({
      query: () => ({
        url: "/v1/me/player/recently-played",
      }),
      providesTags: (result) => ["User"],
    }),
  }),
}); 
