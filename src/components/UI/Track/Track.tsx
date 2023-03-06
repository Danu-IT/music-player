import { FC } from "react";
import {
  Album,
  Duration,
  Image,
  Number,
  ArtistProps,
} from "../../Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";
import { calcArtist, calcTime } from "../../../utils/calc";
import styled from "styled-components";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemove, MdAdd } from "react-icons/md";
import { useState } from "react";
import { Name } from "../../Playlists/PlaylistItem/PlaylistItem";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { userAPI } from "../../../services/UserService";
import { useLocation } from "react-router";
import MultiDropDown from "../MultiDropDown/MultiDropDown";
import MenuItem from "@mui/material/MenuItem";
import { IUserPlaylist } from "../../../interfaces/user";

interface TrackProps {
  track: any;
  index: number;
  artist?: boolean;
  remove?: boolean;
  add?: boolean;
}

const Track: FC<TrackProps> = ({ track, index, artist, remove, add }) => {
  const [playAndRemoveVisible, setPlayAndRemoveVisible] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: album } = userAPI.useGetAlbumQuery({ id: track.album.id });

  const [delete_track, {}] = userAPI.useDeleteUserPlaylistTrackMutation();
  const [add_track, {}] = userAPI.usePostItemsToPlaylistMutation();

  const { token } = useAppSelector((state) => state.tokenSlice);
  const arrayTrack = track?.artists;

  const navigate = useNavigate();

  const duration = calcTime(track?.duration_ms);
  const artists = calcArtist(arrayTrack);

  const handleArtist = (artist: any) => {
    const answer = arrayTrack.filter(
      (track: any) => track.name === artist.trim()
    );
    navigate(`/artists/${answer[0].id}#access_token=${token}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlbum = () => {
    navigate(`/albums/${album?.id}#access_token=${token}`);
  };

  const handleDeleteTrack = () => {
    delete_track({ ids: id, url: track.id });
  };

  const addTrackInPlaylist = (praylist: IUserPlaylist) => {
    setPlayAndRemoveVisible(false);
    setAnchorEl(null);
    console.log(praylist);
    add_track({ id: praylist.id, url: track.id });
  };

  return (
    <Music
      artist={artist}
      onMouseEnter={() => setPlayAndRemoveVisible(true)}
      onMouseLeave={() => setPlayAndRemoveVisible(false)}>
      <Number>{index}</Number>
      <Play
        size={30}
        playAndRemoveVisible={playAndRemoveVisible}
      />
      <SongCustom>
        <SongContainer>
          <Image
            src={track.album.images[1].url}
            alt=""
          />
          <Name length={track.name.length}>
            <div>
              <span>{track.name}</span>
            </div>
          </Name>
        </SongContainer>
      </SongCustom>
      <Duration>{duration}</Duration>
      <CustArtist display={artist}>
        <Name length={artists.length}>
          <div>
            {artists.split(",").map((artist, id) => (
              <ArtSpan onClick={() => handleArtist(artist)}>
                {track.artists.length > 1 && id === 0 ? artist + "," : artist}
              </ArtSpan>
            ))}
          </div>
        </Name>
      </CustArtist>
      <Album onClick={handleAlbum}>{track.album.name}</Album>
      <Remove
        onClick={handleDeleteTrack}
        displayRemove={remove}
        playAndRemoveVisible={playAndRemoveVisible}></Remove>
      <MultiDropDownTrack
        displayAdd={add}
        playAndRemoveVisible={playAndRemoveVisible}>
        <MultiDropDown
          handleClick={handleClick}
          handleClose={handleClose}
          el={anchorEl}
          open={open}
          container="+">
          {currentUserPlaylists.map((praylist) => (
            <MenuItem onClick={() => addTrackInPlaylist(praylist)}>
              {praylist.name}
            </MenuItem>
          ))}
        </MultiDropDown>
      </MultiDropDownTrack>
    </Music>
  );
};

interface MusicProps {
  artist: boolean | undefined;
}

export const Music = styled.div<MusicProps>`
  display: flex;
  position: relative;
  color: white;
  width: ${({ artist }) => (artist ? "900px" : "100%")};
  color: ${({ theme }) => theme.colors.secondary};
  & > * {
    margin-top: 15px;
    margin-bottom: 15px;
    align-self: center;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
  }
`;

interface PlayProps {
  playAndRemoveVisible: boolean;
}

interface RemoveProps {
  playAndRemoveVisible: boolean;
  displayRemove?: boolean;
}

interface AddProps {
  playAndRemoveVisible: boolean;
  displayAdd?: boolean;
}

export const Play = styled(BsFillPlayFill)<PlayProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible }) =>
    playAndRemoveVisible ? "flex" : "none"};
  left: 55px;
`;

const Remove = styled(MdRemove)<RemoveProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible, displayRemove }) =>
    !playAndRemoveVisible ? "none" : !displayRemove ? "none" : "flex"};
  right: 55px;
  cursor: pointer;
`;

const MultiDropDownTrack = styled.div<AddProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible, displayAdd }) =>
    !playAndRemoveVisible ? "none" : !displayAdd ? "none" : "flex"};
  right: 55px;
`;

const CustArtist = styled.div<ArtistProps>`
  display: ${({ display }) => (!display ? "block" : "none")};
  column-width: 250px;
  width: 280px;
  & :hover {
    text-decoration: underline;
  }
`;

const ArtSpan = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const SongCustom = styled.div`
  column-width: 250px;
`;

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  & > div {
    margin-left: 20px;
  }
`;

export default Track;
