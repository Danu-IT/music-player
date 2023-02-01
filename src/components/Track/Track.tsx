import React, { FC } from "react";
import { Album, Artist, Duration, Image, Number } from "../Tracks/Tracks";
import { calcArtist, calcTime } from "../../utils/calc";
import styled from "styled-components";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemove, MdAdd } from "react-icons/md";
import { useState } from "react";
import { Name } from "../PlaylistItem";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

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
  const { token } = useAppSelector((state) => state.tokenSlice);
  const arrayTrack = track.artists;

  const navigate = useNavigate();

  const duration = calcTime(track.duration_ms);
  const artists = calcArtist(arrayTrack);

  const handleArtist = (artist: any) => {
    const answer = arrayTrack.filter(
      (track: any) => track.name === artist.trim()
    );
    navigate(`/artists/${answer[0].id}#access_token=${token}`);
  };
  return (
    <Music
      onMouseEnter={() => setPlayAndRemoveVisible(true)}
      onMouseLeave={() => setPlayAndRemoveVisible(false)}>
      <Number>{index}</Number>
      <Play
        size={30}
        playAndRemoveVisible={playAndRemoveVisible}></Play>
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
      <Artist display={artist}>
        <Name length={artists.length}>
          <div>
            {artists.split(",").map((artist, id) => (
              <span onClick={() => handleArtist(artist)}>
                {track.artists.length > 1 && id === 0 ? artist + "," : artist}
              </span>
            ))}
          </div>
        </Name>
      </Artist>
      <Album>{track.album.name}</Album>
      <Remove
        displayRemove={remove}
        playAndRemoveVisible={playAndRemoveVisible}></Remove>
      <Add
        displayAdd={add}
        playAndRemoveVisible={playAndRemoveVisible}></Add>
    </Music>
  );
};

export const Music = styled.div`
  display: flex;
  position: relative;
  color: white;
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

const Play = styled(BsFillPlayFill)<PlayProps>`
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
`;

const Add = styled(MdAdd)<AddProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible, displayAdd }) =>
    !playAndRemoveVisible ? "none" : !displayAdd ? "none" : "flex"};
  right: 55px;
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
