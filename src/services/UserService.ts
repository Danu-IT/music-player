import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  IUser,
  IUserPlaylist,
  IUserPlaylistTracks,
  IUserPlaylistTrackHaracter,
  IUserPlaylists,
} from "../interfaces/user";
import { IArtist, IArtists, IMyArtists } from '../interfaces/artist';
import { IAlbums, IAlbum, IMyAlbums, IMySavedTracks } from '../interfaces/album';
import { IUserPlaylistTrack } from '../interfaces/user';
import { ICategoryItem, ICategoryItemApi } from "../interfaces/category";
import { Player } from "../interfaces/player";

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
    getPlaylists: build.query<IUserPlaylist[], string>({ // Получить плейлист
      query: (id: string) => ({
        url: `/v1/me/playlists/${id}`,
      }),
      providesTags: (result) => ["Playlist"],
    }),
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
        params: {limit: 20}
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
    deleteUserPlaylist: build.mutation<any, string>({ // Удалить плейлист
      query: (ids) => ({
        url: `/v1/playlists/${ids}/followers`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlist']
    }),
    postItemsToPlaylist: build.mutation<IUserPlaylistTracks, { id: string, url: string[] }>({ // Добавить трек в плейлист
      query: ({ id, url }) => {
        return {
          url: `/v1/playlists/${id}/tracks`,
          method: 'POST',
          body: { 'uris': [...url], 'position': 0 }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    deleteUserPlaylistTrack: build.mutation<any, { ids: string, url: any[] }>({ // Удалить трек из плейлист
      query: ({ ids, url }) => {
        return {
          url: `/v1/playlists/${ids}/tracks`,
          method: 'DELETE',
          body: { "tracks": [...url] }
        }
      },
      invalidatesTags: ['Playlist']
    }),
    getUsersSavedTracks: build.query<IMySavedTracks, null>({ // Получить избранный альбом
      query: () => ({
        url: "/v1/me/tracks",
      }),
      providesTags: (result) => ["User"],
    }),
    getCheckUsersSavedTracks: build.query<boolean[], { ids: string }>({ // Получить сохранение трека в избранный альбом
      query: ({ ids }) => ({
        url: "/v1/me/tracks/contains",
        params: { ids: ids }
      }),
      providesTags: (result) => ["User"],
    }),
    putCheckUsersSavedTracks: build.mutation<any, { ids: string }>({ //Cохранение трека в избранный альбом
      query: ({ ids }) => ({
        url: "/v1/me/tracks",
        method: "PUT",
        params: { ids: ids }
      }),
      invalidatesTags: ['User']
    }),
    deleteUsersSavedTracks: build.mutation<any, { ids: string }>({ //Удаление трека из избранного альбома
      query: ({ ids }) => ({
        url: "/v1/me/tracks",
        method: "DELETE",
        params: { ids: ids }
      }),
      invalidatesTags: ['User']
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
    getCheckAlbum: build.query<boolean[], { id: string }>({// Проверить сохранен ли альбом
      query: ({ id }) => {
        return {
          url: `/v1/me/albums/contains`,
          params: { ids: id },
        };
      },
      providesTags: (result) => ["User"],
    }),
    putAlbumForCurrentUser: build.mutation<any, { id: string }>({ // Проверить сохранен ли альбом
      query: ({ id }) => {
        return {
          url: `/v1/me/albums`,
          method: 'PUT',
          params: { ids: id },
        };
      },
      invalidatesTags: ['User']
    }),
    deleteAlbumForCurrentUser: build.mutation<any, { id: string }>({ // Проверить сохранен ли альбом
      query: ({ id }) => {
        return {
          url: `/v1/me/albums`,
          method: 'DELETE',
          params: { ids: id },
        };
      },
      invalidatesTags: ['User']
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
    getSeveralBrowseCategories: build.query<ICategoryItem, null>({// Получить категории
      query: () => ({
        url: `/v1/browse/categories`,
        params: {country: "SE", locale: "sv_SE", offset: 0, limit: 45}
      }),
      providesTags: (result) => ["User"],
    }),
    getCategorieInfo: build.query<ICategoryItemApi, {category_id: string}>({// Получить плейлисты категории
      query: ({category_id}) => ({
        url: `v1/browse/categories/${category_id}`,
        params: {country: "SE", offset: 0, limit: 45}
      }),
      providesTags: (result) => ["User"],
    }),
    getCategorieFullInfo: build.query<IUserPlaylists, {category_id: string}>({// Получить плейлисты категории
      query: ({category_id}) => ({
        url: `v1/browse/categories/${category_id}/playlists`,
        params: {country: "SE", offset: 0, limit: 45}
      }),
      providesTags: (result) => ["User"],
    }),
    searchInfo: build.query<{albums: IAlbums, artists: IMyArtists, tracks: IUserPlaylistTracks}, { q: string, type: string }>({ // Поиск
      query: ({ q, type }) => {
        return {
          url: `/v1/search`,
          params: { q: q, type: type, limit: 10 },
        };
      },
      providesTags: (result) => ["Artist"],
    }),
    getCurrentlyPlaying: build.query<any, null>({ // Получить играющий трек
      query: () => {
        return {
          url: `/v1/me/player/currently-playing`,
        };
      },
      providesTags: (result) => ["Artist"],
    }),
    getPaybackState: build.query<Player, null>({ // Получить играющий трек
      query: () => {
        return {
          url: `/v1/me/player`,
        };
      },
      providesTags: (result) => ["Artist"],
    }),
    startResumePlayback: build.mutation<null, {context_uri: string, uris?: string[], position_ms: number, offset: number }>({ // Воспроизведение трека
      query: ({context_uri,  position_ms, offset}) => {
        return {
          url: `/v1/me/player/play`,
          method: 'PUT',
          // params: {device_id: device_id},
          body: { 
            "context_uri": context_uri,  "position_ms": position_ms, offset: {"position": offset}}
        }
      },
      invalidatesTags: ['Playlist']
    }),
    pausePlayback: build.mutation<null, null>({ // Воспроизведение трека
      query: () => {
        return {
          url: `/v1/me/player/pause`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    skipToNext: build.mutation<null, null>({ // Скип Трека
      query: () => {
        return {
          url: `/v1/me/player/next`,
          method: 'POST',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    skipToPrevious: build.mutation<null, null>({ // Трек назад
      query: () => {
        return {
          url: `/v1/me/player/previous`,
          method: 'POST',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    volumePlayback: build.mutation<null, {volume_percent: number}>({ // Трек назад
      query: ({volume_percent}) => {
        return {
          url: `/v1/me/player/volume`,
          params: {volume_percent: volume_percent},
          method: 'PUT',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    repeatPlayback: build.mutation<null, {state: string}>({ // Повторить трек или контекст
      query: ({state}) => {
        return {
          url: `/v1/me/player/repeat`,
          params: {state: state},
          method: 'PUT',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    shufflePlayback: build.mutation<null, {state: boolean}>({ // 
      query: ({state}) => {
        return {
          url: `/v1/me/player/shuffle`,
          params: {state: state},
          method: 'PUT',
        }
      },
      invalidatesTags: ['Playlist']
    }),
    RecentlyPlayedTracks: build.query<any, null>({
      query: () => ({
        url: "/v1/me/player/recently-played",
      }),
      providesTags: (result) => ["User"],
    }),
  }),
}); 
