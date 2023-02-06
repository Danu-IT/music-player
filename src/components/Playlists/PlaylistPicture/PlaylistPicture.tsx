import React, { FC } from "react";
import styled from "styled-components";
import ButtonAndPicture from "../../UI/ButtonAndPicture/ButtonAndPicture";

interface PlaylistPictureProps {
  picture: string | undefined;
  playlistName: string | undefined;
  total: number | undefined;
  artistsCount: number | undefined;
  countDuration: string | undefined;
}

const PlaylistPicture: FC<PlaylistPictureProps> = ({
  picture,
  playlistName,
  total,
  artistsCount,
  countDuration,
}) => {
  return (
    <Container>
      <ContainerPic>
        <Image src={picture}></Image>
        <CustomTitle>{playlistName}</CustomTitle>
      </ContainerPic>
      <Info>
        <Title>{playlistName}</Title>
        <InfoTreck>
          <div>{artistsCount} Artists</div>
          <div>{total} Songs</div>
          <div>{countDuration}</div>
        </InfoTreck>
        <RowButton>
          <ButtonAndPicture content="Play"></ButtonAndPicture>
        </RowButton>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ContainerPic = styled.div`
  position: relative;
`;

const InfoTreck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
`;
const RowButton = styled.div`
  align-self: start;
`;

const CustomTitle = styled.h1`
  font-weight: 400;
  font-size: 50px;
  line-height: 50px;
  position: absolute;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  bottom: -8px;
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 50px;
  line-height: 50px;
`;
const Image = styled.img`
  width: 447px;
  height: 323px;
  object-fit: cover;
  border-radius: 24px;
`;

export default PlaylistPicture;