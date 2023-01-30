import React, { FC } from "react";
import BaseContainer from "../components/BaseContainer";
import { userAPI } from "../services/UserService";
import { useLocation } from "react-router";
import PlaylistPicture from "../components/PlaylistPicture/PlaylistPicture";
import styled from "styled-components";

interface PlaylistProps {}

export const Playlist: FC<PlaylistProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, isLoading } = userAPI.useCurrentUserPlaylistQuery(id);
  return (
    <BaseContainer
      navbar={true}
      search={true}>
      <ContainerPlaylist>
        <PlaylistPicture
          picture={data?.images[0]?.url}
          playlistName={data?.name}></PlaylistPicture>
      </ContainerPlaylist>
    </BaseContainer>
  );
};

const ContainerPlaylist = styled.div`
  margin: 60px 50px 0 50px;
  display: block;
  gap: 50px;
`;
