import { FC, MouseEvent, useState } from "react";
import { IUserPlaylist } from "../../../interfaces/user";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { userAPI } from "../../../services/UserService";

interface PlaylistProps {
  playlist: IUserPlaylist;
}

const PlaylistItem: FC<PlaylistProps> = ({ playlist }) => {
  const [hover, setHover] = useState<boolean>(false);

  const [rename] = userAPI.useUpdateUserPlaylistMutation();
  const [remove] = userAPI.useDeleteUserPlaylistMutation();

  const { currentUserPlaylists, currentUser } = useAppSelector(
    (state) => state.userSlice
  );
  const { token } = useAppSelector((state) => state.tokenSlice);

  const navigate = useNavigate();
  const handlerPlaylist = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    const currentPlaylist = currentUserPlaylists.filter(
      (playlist) => playlist.id === id
    );

    navigate(`/playlists/${currentPlaylist[0].id}#access_token=${token}`);
  };

  const deletePlaylist = (e: MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();

    const currentPlaylist = currentUserPlaylists.filter(
      (playlist) => playlist.id === id
    );

    remove(currentPlaylist[0].id);
  };

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(event) => handlerPlaylist(event, playlist.id)}>
      {playlist.images ? (
        <Image src={playlist.images}></Image>
      ) : (
        <SiApplemusic size={120}></SiApplemusic>
      )}
      {hover && (
        <Delete onClick={(e) => deletePlaylist(e, playlist.id)}></Delete>
      )}
      {hover && <Rename></Rename>}
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
  position: relative;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Delete = styled(AiFillDelete)`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.bg};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  top: 10px;
  left: 15px;
`;
const Rename = styled(BsPencil)`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.bg};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 15px;
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
