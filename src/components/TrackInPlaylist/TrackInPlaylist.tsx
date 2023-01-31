import React, { FC } from "react";
import {
  Album,
  Artist,
  Duration,
  Image,
  Number,
} from "../TracksInPlaylist/TracksInPlaylist";
import { calcArtist, calcTime } from "../../utils/calc";
import styled from "styled-components";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemove } from "react-icons/md";
import { useState } from "react";
import { Name } from "../PlaylistItem";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
interface TrackInPlaylistProps {
  track: any;
  index: number;
}

const TrackInPlaylist: FC<TrackInPlaylistProps> = ({ track, index }) => {
  const [playAndRemoveVisible, setPlayAndRemoveVisible] =
    useState<boolean>(false);
  const { token } = useAppSelector((state) => state.tokenSlice);
  const arrayTrack = track.track.artists;

  const navigate = useNavigate();

  const duration = calcTime(track.track.duration_ms);
  const artists = calcArtist(arrayTrack);

  const handleArtist = (artist: any) => {
    navigate(`/artists/${arrayTrack[0].id}#access_token=${token}`);
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
            src={track.track.album.images[0].url}
            alt=""
          />
          <div>{track.track.name}</div>
        </SongContainer>
      </SongCustom>
      <Duration>{duration}</Duration>
      <Artist>
        <Name length={artists.length}>
          <div>
            {artists.split(",").map((artist, id) => (
              <span onClick={() => handleArtist(artist)}>
                {track.track.artists.length > 1 && id === 0
                  ? artist + ","
                  : artist}
              </span>
            ))}
          </div>
        </Name>
      </Artist>
      <Album>{track.track.album.name}</Album>
      <Remove playAndRemoveVisible={playAndRemoveVisible}></Remove>
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

const Play = styled(BsFillPlayFill)<PlayProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible }) =>
    playAndRemoveVisible ? "flex" : "none"};
  left: 55px;
`;

const Remove = styled(MdRemove)<PlayProps>`
  position: absolute;
  display: ${({ playAndRemoveVisible }) =>
    playAndRemoveVisible ? "flex" : "none"};
  right: 55px;
`;

const SongCustom = styled.div`
  column-width: 250px;
`;

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  & > div {
    margin-left: 20px;
  }
`;

export default TrackInPlaylist;
