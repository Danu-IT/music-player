import React, { FC } from "react";
import { userAPI } from "../services/UserService";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { receiveCurrentUserPlaylists } from "../store/slices/UserSlice";
import { useEffect } from "react";
import BaseContainer from "../components/BaseContainer";
import Row from "../components/Row";

interface PlaylistsProps {}

const Playlists: FC<PlaylistsProps> = () => {
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const { data: currentPlaylists } = userAPI.useCurrentUserPlaylistsQuery(null);
  const { data } = userAPI.useRecentlyPlayedTracksQuery(null);

  const addCurrentUserPlaylists = ({ items }: any) => {
    const playlists = items.map((item: any) => {
      const playlist = {
        id: item.id,
        name: item.name,
        images: item.images[0]?.url,
        tolal: item.tracks.total,
      };
      return playlist;
    });
    dispatch(receiveCurrentUserPlaylists(playlists));
  };

  useEffect(() => {
    currentPlaylists && addCurrentUserPlaylists(currentPlaylists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylists]);

  return (
    <BaseContainer>
      <Row
        title="My Playlists"
        component={currentUserPlaylists}></Row>
    </BaseContainer>
  );
};

export default Playlists;
