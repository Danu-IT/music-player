import { FC } from "react";
import {
  Name,
  Songs,
} from "../../../PlaylistCurrent/components/PlaylistItem/PlaylistItem";
import styled from "styled-components";
import { IUserPlaylistTrackAlbum } from "../../../../interfaces/user";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../hooks/redux";

interface CategoryPlaylistItemProps {
  playlist: IUserPlaylistTrackAlbum;
  loading: any;
}

const CategoryPlaylistItem: FC<CategoryPlaylistItemProps> = ({
  playlist,
  loading,
}) => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.tokenSlice);

  const handlerPlaylist = () => {
    navigate(`/playlists/${playlist.id}#access_token=${token}`);
  };
  if (loading) {
    return <>Loading</>;
  }
  return (
    <Container onClick={handlerPlaylist}>
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
