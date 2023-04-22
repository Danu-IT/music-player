import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userAPI } from "../../services/UserService";
import { calcArtist } from "../../utils/calc";
import Volume from "./components/Volume";
import PlayerSwicth from "./components/PlayerSwicth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changePlayTrack } from "../../store/slices/UserSlice";

const Player = () => {
  const [volume, setVolume] = useState<number>(30);
  const dispatch = useAppDispatch();

  const progressBar = useRef<any>();

  const { data: currentTrack, refetch } =
    userAPI.useGetCurrentlyPlayingQuery(null);

  const [shangeVolume] = userAPI.useVolumePlaybackMutation();

  const tracks = currentTrack && currentTrack.item.artists;
  const artists = tracks && calcArtist(tracks);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  useEffect(() => {
    dispatch(changePlayTrack(false));
  }, [tracks]);

  useEffect(() => {
    refetch();
  });

  useEffect(() => {
    shangeVolume({ volume_percent: volume });
  }, [volume]);

  return (
    <Container>
      <Track>
        <Image src={currentTrack?.item.album.images[1].url}></Image>
        <TrackName>
          <div>{currentTrack?.item.name}</div>
          <div>
            {artists?.split(",").map((el: string, i: number) => (
              <div key={el}>
                {currentTrack?.item.artists.length > 1 && i === 0
                  ? el + ","
                  : el}
              </div>
            ))}
          </div>
        </TrackName>
      </Track>
      <PlayerSwicth
        allTime={currentTrack?.item?.duration_ms}
        progressBar={progressBar}></PlayerSwicth>
      <Volume
        value={volume}
        setValue={handleChange}></Volume>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
  height: 120px;
  align-items: center;
  border-top: 1px solid gray;
  svg: hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const Image = styled.img`
  width: 70px;
  height: 60px;
  object-fit: cover;
  padding-left: 10px;
`;

const Track = styled.div`
  position: relative;
`;

const TrackName = styled.div`
  position: absolute;
  left: 80px;
  top: 10px;
  width: 400px;
`;

export default Player;
