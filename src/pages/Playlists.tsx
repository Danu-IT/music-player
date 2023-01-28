import React, { FC } from "react";
import { ContainerPage, Page } from "../layouts/components";
import { userAPI } from "../services/UserService";
import Loader from "../components/UI/Loader/Loader";
import { Hamburger, Content } from "./Home";
import SidebarCustom from "../components/UI/Sidebar/SidebarCustom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { toggle } from "../store/slices/SidebarHiddenSlice";
import { IUserPlaylists, IUserPlaylist } from "../interfaces/user";
import { receiveCurrentUserPlaylists } from "../store/slices/UserSlice";
import { useEffect } from "react";

interface PlaylistsProps {}

const Playlists: FC<PlaylistsProps> = () => {
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const {
    data: currentPlaylists,
    isLoading: isLoadingPlaylists,
    isFetching: isFetchingPlaylists,
  } = userAPI.useCurrentUserPlaylistsQuery(null);

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
  }, [isFetchingPlaylists]);

  return (
    <Page>
      {isLoadingPlaylists ? (
        <Loader></Loader>
      ) : (
        <ContainerPage>
          <Hamburger
            size={30}
            onClick={() => dispatch(toggle())}></Hamburger>
          <SidebarCustom></SidebarCustom>
          <Content isActiveSidebar={isActiveSidebar}>
            {currentUserPlaylists &&
              currentUserPlaylists.map((item) => <div>{item.name}</div>)}
          </Content>
        </ContainerPage>
      )}
    </Page>
  );
};

export default Playlists;
