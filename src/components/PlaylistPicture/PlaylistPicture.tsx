import React, { FC } from "react";
import styled from "styled-components";

interface PlaylistPictureProps {
  picture: string | undefined;
  playlistName: string | undefined;
}

const PlaylistPicture: FC<PlaylistPictureProps> = ({
  picture,
  playlistName,
}) => {
  return (
    <Container>
      <Image src={picture}></Image>
      <CustomTitle>{playlistName}</CustomTitle>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const CustomTitle = styled.h1`
  font-weight: 400;
  font-size: 50px;
  line-height: 50px;
  position: absolute;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  bottom: 4px;
`;
const Image = styled.img`
  width: 647px;
  height: 463px;
  object-fit: cover;
  border-radius: 24px;
`;

export default PlaylistPicture;
