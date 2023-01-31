import React, { FC } from "react";
import BaseContainer from "../components/BaseContainer";
import { useLocation } from "react-router";
import { userAPI } from "../services/UserService";

interface ArtistProps {}

const Artist: FC<ArtistProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data: artist } = userAPI.useGetArtistQuery(id);
  console.log(artist);

  return <BaseContainer search={true}>Artist</BaseContainer>;
};

export default Artist;
