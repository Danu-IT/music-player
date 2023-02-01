import React, { FC } from "react";
import BaseContainer from "../components/BaseContainer";
import { useLocation } from "react-router";
import { userAPI } from "../services/UserService";

interface AlbumTracksProps {}

const Album: FC<AlbumTracksProps> = () => {
  const location = useLocation();
  const idAlbums = location.pathname.split("/")[2];
  const { data } = userAPI.useGetAlbumTracksQuery({
    id: idAlbums,
  });
  console.log(data);

  console.log(data?.items[0].id);
  // const { data: track } = userAPI.useGetTrackQuery({});

  return <BaseContainer search={true}>d</BaseContainer>;
};

export default Album;
