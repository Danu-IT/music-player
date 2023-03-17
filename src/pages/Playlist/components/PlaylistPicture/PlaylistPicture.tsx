import React, { FC } from "react";
import styled from "styled-components";
import ButtonAndPicture from "../../../../components/UI/ButtonAndPicture/ButtonAndPicture";
import { SiApplemusic } from "react-icons/si";

interface PlaylistPictureProps {
  picture: string | undefined;
  playlistName: string | undefined;
  total: number | undefined;
  artistsCount: number | undefined;
  countDuration: string | undefined;
  rename: (name: string) => void;
  children?: React.ReactNode;
}

const PlaylistPicture: FC<PlaylistPictureProps> = ({
  picture,
  playlistName,
  total,
  artistsCount,
  countDuration,
  children,
  rename,
}) => {
  return (
    <Container>
      <ContainerPic>
        {picture ? (
          <Image src={picture}></Image>
        ) : (
          <SiApplemusic size={320}></SiApplemusic>
        )}
        <CustomTitle>{playlistName}</CustomTitle>
      </ContainerPic>
      <Info>
        <Title onClick={() => rename("name")}>{playlistName}</Title>
        <InfoTreck>
          <div>{artistsCount} Artists</div>
          <div>{total} Songs</div>
          <div>{countDuration}</div>
        </InfoTreck>
        <RowButton>
          <ButtonAndPicture content="Play"></ButtonAndPicture>
          {children}
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
  display: flex;
  gap: 40px;
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
  cursor: pointer;
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
