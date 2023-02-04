import { FC, useMemo } from "react";
import BaseContainer from "../components/BaseContainer";
import { userAPI } from "../services/UserService";
import { useLocation, useNavigate } from "react-router";
import PlaylistPicture from "../components/Playlists/PlaylistPicture/PlaylistPicture";
import styled from "styled-components";
import Loader from "../components/UI/Loader/Loader";
import { countAllDuration, countArtistPlaylist } from "../utils/calc";
import { ContainerPage, Page } from "../layouts/components/index";
import { BsArrowLeft } from "react-icons/bs";
import ColumnTracksPlaylists from "../components/Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";

interface PlaylistProps {}

export const Playlist: FC<PlaylistProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: playlists, isLoading } =
    userAPI.useCurrentUserPlaylistQuery(id);

  const navigate = useNavigate();

  const artistsCount = useMemo(
    () => countArtistPlaylist(playlists),
    [playlists]
  );

  const countDuration = useMemo(() => countAllDuration(playlists), [playlists]);

  if (isLoading) {
    return (
      <BaseContainer
        navbar={true}
        search={true}>
        <Loader></Loader>
      </BaseContainer>
    );
  }

  return (
    <Page>
      <ContainerPage>
        <ContainerPlaylist>
          <Arrow
            size={20}
            onClick={() => navigate(-1)}></Arrow>
          <PlaylistPicture
            picture={playlists?.images[0]?.url}
            playlistName={playlists?.name.toUpperCase()}
            total={playlists?.tracks?.total}
            artistsCount={artistsCount}
            countDuration={countDuration}></PlaylistPicture>
          <ColumnTracksPlaylists id={id}></ColumnTracksPlaylists>
        </ContainerPlaylist>
      </ContainerPage>
    </Page>
  );
};

const ContainerPlaylist = styled.div`
  padding: 60px 50px 0 50px;
  display: block;
  gap: 50px;
  position: relative;
  font-weight: 400;
  font-size: 20px;
  line-height: 13px;
`;

const Arrow = styled(BsArrowLeft)`
  position: absolute;
  left: 10px;
  top: 25px;
`;
