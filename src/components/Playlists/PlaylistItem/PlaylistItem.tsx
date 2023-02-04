import { FC, MouseEvent } from "react";
import { IUserPlaylist } from "../../../interfaces/user";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";

interface PlaylistProps {
  playlist: IUserPlaylist;
}

const PlaylistItem: FC<PlaylistProps> = ({ playlist }) => {
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const { token } = useAppSelector((state) => state.tokenSlice);

  const navigate = useNavigate();
  const handlerPlaylist = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    const currentPlaylist = currentUserPlaylists.filter(
      (playlist) => playlist.id === id
    );

    navigate(`/playlists/${currentPlaylist[0].id}#access_token=${token}`);
  };
  return (
    <Container onClick={(event) => handlerPlaylist(event, playlist.id)}>
      {playlist.images ? (
        <Image src={playlist.images}></Image>
      ) : (
        <SiApplemusic size={120}></SiApplemusic>
      )}

      <Name length={playlist.name.length}>
        <div>{playlist.name}</div>
      </Name>
      <Songs>{playlist?.total} songs</Songs>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 15px;
`;

export interface NameProps {
  length: number;
}

const Songs = styled.span`
  color: white;
`;

export const Name = styled.div<NameProps>`
  margin: 10px 0;
  padding: 2px;
  max-width: 90%;
  overflow: hidden;
  &:hover {
    overflow: visible;
    & div {
      animation: none;
      cursor: pointer;
    }
  }
  & div {
    width: 120%;
    display: inline-block;
    animation: ${({ length }) =>
      length > 15 ? "marquee-text 5s linear infinite" : "none"};
  }
  @keyframes marquee-text {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export default PlaylistItem;
