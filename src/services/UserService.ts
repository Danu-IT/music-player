import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser, IUserPlaylist, IUserPlaylistTracks, IUserPlaylistTrackHaracter } from '../interfaces/user';
import { IArtist } from '../interfaces/artist';
import { IAlbums } from '../interfaces/album';

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com",
    prepareHeaders: (headers, { getState }) => {
      const {
        tokenSlice: { token },
      } = (getState() as any);

      if (token) {
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    currentUser: build.query<IUser, null>({
      query: () => ({
        url: "/v1/me",
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylists: build.query<IUserPlaylist[], null>({
      query: () => ({
        url: "/v1/me/playlists",
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylist: build.query<IUserPlaylist, string>({
      query: (id: string) => ({
        url: `/v1/playlists/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    currentUserPlaylistTracks: build.query<IUserPlaylistTracks, string>({
      query: (id: string) => ({
        url: `/v1/playlists/${id}/tracks`,
      }),
      providesTags: (result) => ["User"],
    }),
    getArtist: build.query<IArtist, string>({
      query: (id: string) => ({
        url: `/v1/artists/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    getArtistsTopTracks: build.query<IUserPlaylistTrackHaracter, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/v1/artists/${id}/top-tracks`,
          params: { market: 'ES' }
        }
      },
      providesTags: (result) => ["User"],
    }),
    getArtistsAlbums: build.query<IAlbums, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/v1/artists/${id}/albums`,
          params: { market: 'ES' }
        }
      },
      providesTags: (result) => ["User"],
    }),
    getAlbumTracks: build.query<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/v1/playlists/${id}`,
          params: { market: 'ES' }
        }
      },
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
