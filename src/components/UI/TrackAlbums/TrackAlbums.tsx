import { FC } from "react";
import { userAPI } from "../../../services/UserService";
import { calcTime } from "../../../utils/calc";
import styled from "styled-components";
import { Play } from "../Track/Track";
import { useState } from "react";
import Like, { LikePic } from "../Like/Like";
import { BsFillPlayFill } from "react-icons/bs";

interface TrackAlbumProps {
  index: number;
  id: string;
}

const TrackAlbums: FC<TrackAlbumProps> = ({ index, id }) => {
  const [playandremovevisible, setPlayAndRemoveVisible] =
    useState<boolean>(false);

  const { data: track } = userAPI.useGetAlbumTracksQuery({
    id: id,
  });

  const { data: checkSavedTrack } = userAPI.useGetCheckUsersSavedTracksQuery({
    ids: id,
  });

  const [deleteSaveTrack, {}] = userAPI.useDeleteUsersSavedTracksMutation();
  const [saveTrack, {}] = userAPI.usePutCheckUsersSavedTracksMutation();

  const handlerTrackSaved = () => {
    if (checkSavedTrack && checkSavedTrack[0]) {
      deleteSaveTrack({ ids: String(id) });
    } else {
      saveTrack({ ids: String(id) });
    }
  };

  let duration = calcTime(track ? track?.duration_ms : Number());

  return (
    <ContainerTracks
      onMouseEnter={() => setPlayAndRemoveVisible(true)}
      onMouseLeave={() => setPlayAndRemoveVisible(false)}>
      <Content>
        <CustomPlay playandremovevisible={playandremovevisible}>
          <BsFillPlayFill size={30} />
        </CustomPlay>
        <Index playandremovevisible={playandremovevisible}>{index}</Index>
        <Info>
          <Track>{track?.name}</Track>
          <Name>{track?.artists[0].name}</Name>
        </Info>
      </Content>
      <CustomLike playandremovevisible={playandremovevisible}>
        <Like
          activated={checkSavedTrack}
          onClick={handlerTrackSaved}></Like>
      </CustomLike>
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

interface PlayProps {
  playandremovevisible?: boolean;
}

export const CustomPlay = styled.div<PlayProps>`
  cursor: pointer;
  position: absolute;
  left: 10px;
  display: ${({ playandremovevisible }) =>
    playandremovevisible ? "block" : "none"};
`;
export const CustomLike = styled.div<IndexProps>`
  cursor: pointer;
  position: absolute;
  right: 110px;
  display: ${({ playandremovevisible }) =>
    playandremovevisible ? "block" : "none"};
`;
interface IndexProps {
  playandremovevisible?: boolean;
}

const Index = styled.div<IndexProps>`
  font-size: 20px;
  position: absolute;
  left: 15px;
  display: ${({ playandremovevisible }) =>
    !playandremovevisible ? "block" : "none"};
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
