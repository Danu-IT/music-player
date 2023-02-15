import { FC, useMemo, useState } from "react";
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
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface PlaylistProps {}

export const Playlist: FC<PlaylistProps> = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: playlists, isLoading } =
    userAPI.useCurrentUserPlaylistQuery(id);
  const navigate = useNavigate();

  const [currentName, setCurrentName] = useState<string | undefined>(
    playlists?.name
  );

  const [rename] = userAPI.useUpdateUserPlaylistMutation();

  const artistsCount = useMemo(
    () => countArtistPlaylist(playlists),
    [playlists]
  );

  const handlerTitle = () => {
    setVisibleModal(true);
    setAnchorEl(null);
  };

  const renamePlaylist = () => {
    if (currentName) rename({ id: id, name: currentName });
    setVisibleModal(false);
  };

  const countDuration = useMemo(() => countAllDuration(playlists), [playlists]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <>
              <DropDown
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                ...
              </DropDown>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}>
                <MenuItem onClick={handlerTitle}>Rename</MenuItem>
                <MenuItem onClick={() => "f"}>Delete</MenuItem>
              </Menu>
            </>
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
              <Image
                alt="rename"
                src={playlists?.images[0]?.url}></Image>
              <Inputs>
                <input
                  value={currentName}
                  defaultValue={playlists?.name}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="name"></input>
                <Button onClick={renamePlaylist}>Rename</Button>
              </Inputs>
            </Rename>
          </Content>
        </Modal>
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

const DropDown = styled.span`
  cursor: pointer;
`;
