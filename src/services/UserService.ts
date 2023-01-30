import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser, IUserPlaylist } from '../interfaces/user';

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
    RecentlyPlayedTracks: build.query<any, null>({
      query: () => ({
        url: "/v1/me/player/recently-played",
      }),
      providesTags: (result) => ["User"],
    }),
  }),
});
