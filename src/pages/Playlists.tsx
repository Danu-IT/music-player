import React, { FC } from "react";
import { userAPI } from "../services/UserService";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { IUserPlaylists, IUserPlaylist } from "../interfaces/user";
import { receiveCurrentUserPlaylists } from "../store/slices/UserSlice";
import { useEffect } from "react";
import BaseContainer from "../components/BaseContainer";

interface PlaylistsProps {}

const Playlists: FC<PlaylistsProps> = () => {
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const { data: currentPlaylists, isFetching: isFetchingPlaylists } =
    userAPI.useCurrentUserPlaylistsQuery(null);

  const addCurrentUserPlaylists = ({ items }: IUserPlaylists) => {
    const result = items.map((item) => {
      const data: IUserPlaylist = {
        id: item.id,
        name: item.name,
        images: item.images,
        tracks: item.tracks.total,
      };
      return data;
    });
    dispatch(receiveCurrentUserPlaylists(result));
  };

  useEffect(() => {
    currentPlaylists && addCurrentUserPlaylists(currentPlaylists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingPlaylists]);

  return (
    <BaseContainer>
      {currentUserPlaylists &&
        currentUserPlaylists.map((item) => <div>{item.name}</div>)}
    </BaseContainer>
  );
};

export default Playlists;
