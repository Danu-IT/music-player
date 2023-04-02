import { useEffect } from "react";
import styled from "styled-components";
import { FaExchangeAlt } from "react-icons/fa";
import { RiRewindFill, RiRepeatLine } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import { useAppSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import { calcArtist } from "../../utils/calc";

const Player = () => {
  const { data: currentTrack } = userAPI.useGetCurrentlyPlayingQuery(null);

  const [skipTrack] = userAPI.useSkipToNextMutation();

  const tracks = currentTrack && currentTrack.item.artists;
  const artists = tracks && calcArtist(tracks);
  const skip = () => {
    skipTrack(null);
  };

  return (
    <Container>
      <Track>
        <Image src={currentTrack?.item.album.images[1].url}></Image>
        <TrackName>
          <div>{currentTrack?.item.name}</div>
          {artists && (
            <div>
              {artists.split(",").map((el: string, i: number) => (
                <div key={el}>
                  {currentTrack?.item.artists.length > 1 && i === 0
                    ? el + ","
                    : el}
                </div>
              ))}
            </div>
          )}
        </TrackName>
      </Track>
      <Content>
        <FaExchangeAlt size={30}></FaExchangeAlt>
        <RiRewindFill size={30}></RiRewindFill>
        <AiFillPlayCircle size={30}></AiFillPlayCircle>
        <RiRewindFillRight
          onClick={skip}
          size={30}></RiRewindFillRight>
        <RiRepeatLine size={30}></RiRepeatLine>
        <Road></Road>
      </Content>
      <Value>Value</Value>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: gray;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
  height: 120px;
  align-items: center;
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
  width: 200px;
`;
const Content = styled.div`
  * {
    margin-left: 20px;
  }
`;
const RiRewindFillRight = styled(RiRewindFill)`
  transform: rotate(180deg);
`;
const Road = styled.div``;
const Value = styled.div``;

export default Player;
