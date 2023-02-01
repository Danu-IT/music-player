import React, { FC } from "react";
import { IAlbum } from "../../interfaces/album";
import { userAPI } from "../../services/UserService";

interface AlbumsProps {
  track: IAlbum;
}

const Albums: FC<AlbumsProps> = ({ track }) => {
  console.log(track);
  const { data } = userAPI.useGetAlbumTracksQuery({
    id: track.id,
  });
  console.log(data);
  return <div>{track.name}</div>;
};

export default Albums;
