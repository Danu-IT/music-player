import { FC, useEffect } from "react";
import {
  Album,
  Duration,
  Image,
  Number,
  ArtistProps,
} from "../Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";
import { calcArtist, calcTime } from "../../utils/calc";
import styled from "styled-components";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemove } from "react-icons/md";
import { AiOutlinePause } from "react-icons/ai";
import { useState } from "react";
import { Name } from "../../pages/PlaylistCurrent/components/PlaylistItem/PlaylistItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import { useLocation } from "react-router";
import MultiDropDown from "../UI/MultiDropDown/MultiDropDown";
import MenuItem from "@mui/material/MenuItem";
import { IUserPlaylist } from "../../interfaces/user";
import { CustomLike } from "../TrackAlbums/TrackAlbums";
import Like from "../UI/Like/Like";
import {
  changeContext,
  changeDuration,
  changeIndex,
  changeTime,
  changeTrack,
  changeVisiblePlayer,
} from "../../store/slices/UserSlice";

interface TrackProps {
  track: any;
  index: number;
  artist?: boolean;
  remove?: boolean;
  add?: boolean;
  like?: boolean;
}

const Track: FC<TrackProps> = ({ track, index, artist, remove, add, like }) => {
  const [playandremovevisible, setPlayandremovevisible] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [played, setPlayed] = useState<boolean>(false);
  const { data: playerState, refetch } = userAPI.useGetPaybackStateQuery(null);

  const { currentUserPlaylists, indexStore, context, isPlay } = useAppSelector(
    (state) => state.userSlice
  );

  let kindOfPlace: string = "playlist";

  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const place = location.pathname.split("/")[1];

  useEffect(() => {
    if (place === "playlists" || place === "playlistsCurrent") {
      kindOfPlace = "playlist";
    } else if (place === "artists") {
      kindOfPlace = "artist";
    }
  }, []);

  const { data: album } = userAPI.useGetAlbumQuery({ id: track.album.id });

  const [delete_track, {}] = userAPI.useDeleteUserPlaylistTrackMutation();
  const [add_track, {}] = userAPI.usePostItemsToPlaylistMutation();
  const [saveTrack, {}] = userAPI.usePutCheckUsersSavedTracksMutation();
  const [startPlayback] = userAPI.useStartResumePlaybackMutation();

  const { data: checkSavedTrack } = userAPI.useGetCheckUsersSavedTracksQuery({
    ids: track.id,
  });

  const [deleteSaveTrack, {}] = userAPI.useDeleteUsersSavedTracksMutation();

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

  const handlerTrackSaved = () => {
    if (checkSavedTrack && checkSavedTrack[0]) {
      deleteSaveTrack({ ids: String(track.id) });
    } else {
      saveTrack({ ids: String(track.id) });
    }
  };

  const handleDeleteTrack = () => {
    delete_track({ ids: id, url: [{ uri: `spotify:track:${track.id}` }] });
  };

  const addTrackInPlaylist = (praylist: IUserPlaylist) => {
    setPlayandremovevisible(false);
    setAnchorEl(null);
    add_track({ id: praylist.id, url: [`spotify:track:${track.id}`] });
  };

  const visiblePlayer = () => {
    dispatch(changeVisiblePlayer(true));
    dispatch(changeTrack(track.id));
    kindOfPlace &&
      startPlayback({
        context_uri: `spotify:${kindOfPlace}:${id}`,
        offset: index - 1,
        position_ms: 0,
      });
    dispatch(changeContext(`spotify:${kindOfPlace}:${id}`));
    dispatch(changeIndex(index - 1));
    dispatch(changeTime(0));
    dispatch(changeDuration("0"));
    setPlayed(true);
  };

  useEffect(() => {
    if (
      index - 1 === indexStore &&
      context === `spotify:${kindOfPlace}:${id}`
    ) {
      setPlayed(true);
    } else {
      setPlayed(false);
    }
  }, [indexStore]);

  return (
    <Music
      played={played}
      onDoubleClick={visiblePlayer}
      artist={artist}
      onMouseEnter={() => setPlayandremovevisible(true)}
      onMouseLeave={() => setPlayandremovevisible(false)}>
      <Number>{index}</Number>
      <Play playandremovevisible={playandremovevisible}>
        {!isPlay && played ? (
          <AiOutlinePause size={30}></AiOutlinePause>
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </Play>
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
              <ArtSpan
                key={artist}
                onClick={() => handleArtist(artist)}>
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
        playandremovevisible={playandremovevisible}>
        <MdRemove></MdRemove>
      </Remove>
      <MultiDropDownTrack
        displayAdd={add}
        playandremovevisible={playandremovevisible}>
        <MultiDropDown
          handleClick={handleClick}
          handleClose={handleClose}
          el={anchorEl}
          open={open}
          container="+">
          {currentUserPlaylists.map((praylist) => (
            <MenuItem
              key={praylist.id}
              onClick={() => addTrackInPlaylist(praylist)}>
              {praylist.name}
            </MenuItem>
          ))}
        </MultiDropDown>
      </MultiDropDownTrack>
      {like && (
        <CustomLike playandremovevisible={playandremovevisible}>
          <Like
            onClick={handlerTrackSaved}
            activated={checkSavedTrack}></Like>
        </CustomLike>
      )}
    </Music>
  );
};

interface MusicProps {
  artist: boolean | undefined;
  played: boolean;
}

interface PlayProps {
  playandremovevisible: boolean;
}

interface RemoveProps {
  playandremovevisible: boolean;
  displayRemove?: boolean;
}

interface AddProps {
  playandremovevisible: boolean;
  displayAdd?: boolean;
}

export const Music = styled.div<MusicProps>`
  display: flex;
  position: relative;
  width: ${({ artist }) => (artist ? "900px" : "100%")};
  color: ${({ theme, played }) => (played ? "gray" : theme.colors.secondary)};
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

export const Play = styled.div<PlayProps>`
  position: absolute;
  display: ${({ playandremovevisible }) =>
    playandremovevisible ? "flex" : "none"};
  left: 55px;
`;

const Remove = styled.div<RemoveProps>`
  position: absolute;
  display: ${({ playandremovevisible, displayRemove }) =>
    !playandremovevisible ? "none" : !displayRemove ? "none" : "flex"};
  right: 55px;
  cursor: pointer;
  color: white !important;
`;

const MultiDropDownTrack = styled.div<AddProps>`
  position: absolute;
  display: ${({ playandremovevisible, displayAdd }) =>
    !playandremovevisible ? "none" : !displayAdd ? "none" : "flex"};
  right: 55px;
`;

export const CustArtist = styled.div<ArtistProps>`
  display: ${({ display }) => (!display ? "block" : "none")};
  column-width: 250px;
  width: 280px;
  & :hover {
    text-decoration: underline;
  }
`;

export const ArtSpan = styled.span`
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
