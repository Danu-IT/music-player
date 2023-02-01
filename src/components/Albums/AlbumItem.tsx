import React, { FC } from "react";
import { IAlbum } from "../../interfaces/album";
import { userAPI } from "../../services/UserService";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/redux";

interface AlbumsProps {
  album: IAlbum;
}

const AlbumItem: FC<AlbumsProps> = ({ album }) => {
  const { token } = useAppSelector((state) => state.tokenSlice);
  const navigate = useNavigate();

  const handlerAlbum = () => {
    navigate(`/albums/${album.id}#access_token=${token}`);
  };

  return (
    <Container onClick={handlerAlbum}>
      <Image src={album.images[0].url}></Image>
      <Name>{album.name}</Name>
      <Type>{album.release_date.split("-")[0]} &bull; Альбом</Type>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  height: 250px;
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  gap: 15px;
`;

const Image = styled.img`
  margin-top: 15px;
  width: 150px;
  border-radius: 10px;
`;

const Name = styled.div`
  align-self: start;
  margin-left: 30px;
`;

const Type = styled.div`
  align-self: start;
  margin-left: 30px;
`;

export default AlbumItem;
