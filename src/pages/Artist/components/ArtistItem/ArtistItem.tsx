import React, { FC } from "react";
import { IArtist } from "../../../../interfaces/artist";
import { ContainerCard } from "../../../Album/components/AlbumItem/AlbumItem";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../hooks/redux";

interface ArtistItemProps {
  artist: IArtist;
}

const ArtistItem: FC<ArtistItemProps> = ({ artist }) => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.tokenSlice);

  const handlerArtist = () => {
    navigate(`/artists/${artist.id}#access_token=${token}`);
  };

  return (
    <Container onClick={handlerArtist}>
      <Image src={artist.images[0].url}></Image>
      <div>{artist.name}</div>
      <div>
        {artist.type[0].toUpperCase() +
          artist.type.slice(1, artist.type.length)}
      </div>
    </Container>
  );
};

const Container = styled(ContainerCard)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > * {
    margin-left: 25px;
  }
`;

const Image = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
`;

export default ArtistItem;
