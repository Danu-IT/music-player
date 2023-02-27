import { FC } from "react";
import { userAPI } from "../../../services/UserService";
import { calcTime } from "../../../utils/calc";
import styled from "styled-components";
import { Play } from "../Track/Track";
import { useState } from "react";
import { LikePic } from "../Like/Like";

interface TrackAlbumProps {
  index: number;
  id: string;
}

const TrackAlbums: FC<TrackAlbumProps> = ({ index, id }) => {
  const [playAndRemoveVisible, setPlayAndRemoveVisible] =
    useState<boolean>(false);

  const { data: track } = userAPI.useGetAlbumTracksQuery({
    id: id,
  });

  let duration = calcTime(track ? track?.duration_ms : Number());

  return (
    <ContainerTracks
      onMouseEnter={() => setPlayAndRemoveVisible(true)}
      onMouseLeave={() => setPlayAndRemoveVisible(false)}>
      <Content>
        <CustomPlay
          size={30}
          playAndRemoveVisible={playAndRemoveVisible}></CustomPlay>
        <Index playAndRemoveVisible={playAndRemoveVisible}>{index}</Index>
        <Info>
          <Track>{track?.name}</Track>
          <Name>{track?.artists[0].name}</Name>
        </Info>
      </Content>
      <CustomLike
        playAndRemoveVisible={playAndRemoveVisible}
        size={25}></CustomLike>
      <div>{duration}</div>
    </ContainerTracks>
  );
};

const ContainerTracks = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 10px 0 10px 0px;
  justify-content: space-between;
  position: relative;
  padding: 10px 10px 10px 70px;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const CustomPlay = styled(Play)`
  cursor: pointer;
  left: 10px;
`;
const CustomLike = styled(LikePic)<IndexProps>`
  cursor: pointer;
  position: absolute;
  right: 110px;
  display: ${({ playAndRemoveVisible }) =>
    playAndRemoveVisible ? "block" : "none"};
`;
interface IndexProps {
  playAndRemoveVisible?: boolean;
}

const Index = styled.div<IndexProps>`
  font-size: 20px;
  position: absolute;
  left: 15px;
  display: ${({ playAndRemoveVisible }) =>
    !playAndRemoveVisible ? "block" : "none"};
`;
const Track = styled.div`
  font-size: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
const Name = styled.div`
  font-size: 13px;
  color: gray;
`;

export default TrackAlbums;
