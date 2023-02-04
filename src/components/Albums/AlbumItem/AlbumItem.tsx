import React, { FC } from "react";
import { IAlbum } from "../../../interfaces/album";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../hooks/redux";

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
    <ContainerCard onClick={handlerAlbum}>
      <Image src={album.images[0].url}></Image>
      <Name>{album.name}</Name>
      <Type>{album.release_date.split("-")[0]} &bull; Альбом</Type>
    </ContainerCard>
  );
};

export const ContainerCard = styled.div`
  width: 200px;
  cursor: pointer;
  height: 250px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  gap: 15px;
  :hover {
    opacity: 0.7;
  }
`;

const Image = styled.img`
  margin-top: 15px;
  width: 150px;
  height: 150px;
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
