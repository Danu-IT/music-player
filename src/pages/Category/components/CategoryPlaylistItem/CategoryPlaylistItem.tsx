import React, { FC } from "react";
import {
  Name,
  Songs,
} from "../../../Playlist/components/PlaylistItem/PlaylistItem";
import styled from "styled-components";
import { IUserPlaylistTrackAlbum } from "../../../../interfaces/user";

interface CategoryPlaylistItemProps {
  playlist: IUserPlaylistTrackAlbum;
}

const CategoryPlaylistItem: FC<CategoryPlaylistItemProps> = ({ playlist }) => {
  console.log(playlist);
  return (
    <Container>
      <Image src={playlist.images[0].url}></Image>
      <Name length={playlist.name.length}>
        <div>{playlist.name}</div>
      </Name>
    </Container>
  );
};

const Image = styled.img`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export default CategoryPlaylistItem;
