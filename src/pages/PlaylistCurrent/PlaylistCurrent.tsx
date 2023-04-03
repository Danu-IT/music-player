import { FC, useMemo, useState, useRef, useEffect, useCallback } from "react";
import BaseContainer from "../../components/BaseContainer";
import { userAPI } from "../../services/UserService";
import { useLocation, useNavigate } from "react-router";
import PlaylistPicture from "./components/PlaylistPicture/PlaylistPicture";
import styled from "styled-components";
import Loader from "../../components/UI/Loader/Loader";
import { countAllDuration, countArtistPlaylist } from "../../utils/calc";
import { ContainerPage, Page } from "../../layouts/components/index";
import { BsArrowLeft } from "react-icons/bs";
import ColumnTracksPlaylists from "../../components/Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import MenuItem from "@mui/material/MenuItem";
import MultiDropDown from "../../components/UI/MultiDropDown/MultiDropDown";
import { SiApplemusic } from "react-icons/si";
import { useAppSelector } from "../../hooks/redux";
import Player from "../../components/Player/Player";

interface PlaylistProps {}

export const PlaylistCurrent: FC<PlaylistProps> = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { player } = useAppSelector((state) => state.userSlice);

  const input = useRef<HTMLInputElement | null>(null);
  const error = useRef<HTMLSpanElement | null>(null);

  const open = Boolean(anchorEl);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const { data: playlists, isLoading } =
    userAPI.useCurrentUserPlaylistQuery(id);

  const [currentName, setCurrentName] = useState<string | undefined>(
    playlists?.name
  );

  const [rename] = userAPI.useUpdateUserPlaylistMutation();
  const [remove] = userAPI.useDeleteUserPlaylistMutation();

  const artistsCount = useMemo(
    () => countArtistPlaylist(playlists),
    [playlists]
  );

  const handlerTitle = () => {
    setVisibleModal(true);
    setAnchorEl(null);
  };

  const renamePlaylist = () => {
    if (currentName && currentName.length <= 10) {
      rename({ id: id, name: currentName });
      setVisibleModal(false);
    } else if (input.current && error.current) {
      input.current.style.border = "1px solid red";
      error.current.innerHTML = "Enter a name of 10 characters";
      error.current.style.color = "red";
    }
  };

  const countDuration = useMemo(() => countAllDuration(playlists), [playlists]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePlaylist = () => {
    remove(id);
    navigate(-1);
  };

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
            rename={handlerTitle}
            picture={playlists?.images[0]?.url}
            playlistName={playlists?.name.toUpperCase()}
            total={playlists?.tracks?.total}
            artistsCount={artistsCount}
            countDuration={countDuration}>
            <MultiDropDown
              handleClick={handleClick}
              handleClose={handleClose}
              el={anchorEl}
              open={open}>
              <MenuItem onClick={handlerTitle}>Rename</MenuItem>
              <MenuItem onClick={deletePlaylist}>Delete</MenuItem>
            </MultiDropDown>
          </PlaylistPicture>
          <ColumnTracksPlaylists id={id}></ColumnTracksPlaylists>
        </ContainerPlaylist>
        <Modal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          color="white">
          <Content>
            <TitleRename>Will change details</TitleRename>
            <Rename>
              {playlists?.images[0]?.url ? (
                <Image
                  alt="rename"
                  src={playlists?.images[0]?.url}></Image>
              ) : (
                <SiApplemusic size={200}></SiApplemusic>
              )}
              <Inputs>
                <Validation>
                  <span ref={error}></span>
                  <Input
                    ref={input}
                    value={currentName}
                    defaultValue={playlists?.name}
                    onChange={(e) => setCurrentName(e.target.value)}
                    placeholder="name"></Input>
                </Validation>
                <Button onClick={renamePlaylist}>Rename</Button>
              </Inputs>
            </Rename>
          </Content>
        </Modal>
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
