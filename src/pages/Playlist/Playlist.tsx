import { FC, useMemo, useState, useRef, useEffect } from "react";
import BaseContainer from "../../components/BaseContainer";
import { userAPI } from "../../services/UserService";
import { useLocation, useNavigate } from "react-router";
import PlaylistPicture from "../PlaylistCurrent/components/PlaylistPicture/PlaylistPicture";
import styled from "styled-components";
import Loader from "../../components/UI/Loader/Loader";
import { countAllDuration, countArtistPlaylist } from "../../utils/calc";
import { ContainerPage, Page } from "../../layouts/components/index";
import { BsArrowLeft } from "react-icons/bs";
import ColumnTracksPlaylists from "../../components/Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";
import Player from "../../components/Player/Player";
import { useAppSelector } from "../../hooks/redux";

interface PlaylistProps {}

export const Playlist: FC<PlaylistProps> = () => {
  const input = useRef<HTMLInputElement | null>(null);
  const error = useRef<HTMLSpanElement | null>(null);
  const { player } = useAppSelector((state) => state.userSlice);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const { data: playlists, isLoading } =
    userAPI.useCurrentUserPlaylistQuery(id);

  const [currentName] = useState<string | undefined>(playlists?.name);

  const artistsCount = useMemo(
    () => countArtistPlaylist(playlists),
    [playlists]
  );

  const countDuration = useMemo(() => countAllDuration(playlists), [playlists]);

  useEffect(() => {
    if (input.current && error.current) {
      input.current.style.border = "0px solid red";
      error.current.innerHTML = "";
      error.current.style.color = "none";
    }
  }, [currentName]);

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
            rename={() => {}}
            picture={playlists?.images[0]?.url}
            playlistName={playlists?.name.toUpperCase()}
            total={playlists?.tracks?.total}
            artistsCount={artistsCount}
            countDuration={countDuration}></PlaylistPicture>
          <ColumnTracksPlaylists
            isDelete={false}
            id={id}></ColumnTracksPlaylists>
        </ContainerPlaylist>
      </ContainerPage>
      {player && <Player></Player>}
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
`;

const TitleRename = styled.h1`
  font-size: 20px;
`;

const Rename = styled.div`
  display: flex;
  gap: 15px;
`;

const Inputs = styled.div``;

const Validation = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: transparent;
  padding: 10px;
  margin-bottom: 10px;
`;
