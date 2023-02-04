import React, { FC } from "react";
import { userAPI } from "../services/UserService";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { receiveCurrentUserPlaylists } from "../store/slices/UserSlice";
import { useEffect } from "react";
import BaseContainer from "../components/BaseContainer";
import Row from "../components/Row";
import axios from "axios";
import List from "../components/List";
import PlaylistItem from "../components/Playlists/PlaylistItem/PlaylistItem";
import { IUserPlaylist } from "../interfaces/user";

interface PlaylistsProps {}

const Library: FC<PlaylistsProps> = () => {
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.tokenSlice);
  const { data: currentPlaylists } = userAPI.useCurrentUserPlaylistsQuery(null);
  // const { data: currentAlbums } = userAPI.useCurrentUserAlbumsTracksQuery({
  //   limit: 50,
  //   market: "ES",
  // });

  const addCurrentUserPlaylists = ({ items }: any) => {
    const playlists = items.map((item: any) => {
      const playlist = {
        id: item.id,
        name: item.name,
        images: item.images[0]?.url,
        total: item.tracks.total,
      };
      return playlist;
    });
    dispatch(receiveCurrentUserPlaylists(playlists));
  };

  // const fetch = async () => {
  //   const response = await axios.get(
  //     // "https://api.spotify.com/v1/browse/featured-playlists",
  //     // "https://api.spotify.com/v1/browse/categories",
  //     "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFFzDl7qN9Apr/playlists",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //       params: {
  //         limit: 10,
  //         offset: 5,
  //         market: "ES",
  //         include_groups: "single",
  //       },
  //     }
  //   );
  //   console.log(response);
  // };

  // useEffect(() => {
  //   fetch();
  // }, []);

  useEffect(() => {
    currentPlaylists && addCurrentUserPlaylists(currentPlaylists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylists]);

  return (
    <BaseContainer>
      <Row title="My Playlists">
        <List
          items={currentUserPlaylists}
          flex={true}
          renderItem={(item: IUserPlaylist) => (
            <PlaylistItem
              key={item.id}
              playlist={item}></PlaylistItem>
          )}
        />
      </Row>
    </BaseContainer>
  );
};

export default Library;
