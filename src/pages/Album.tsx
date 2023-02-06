import React, { FC } from "react";
import BaseContainer from "../components/BaseContainer";
import { useLocation, useNavigate } from "react-router";
import { userAPI } from "../services/UserService";
import styled from "styled-components";
import { useAppSelector } from "../hooks/redux";
import ButtonAndPicture from "../components/UI/ButtonAndPicture/ButtonAndPicture";
import Like from "../components/UI/Like/Like";
import List from "../components/List";
import { BiTime } from "react-icons/bi";
import TrackAlbums from "../components/UI/TrackAlbums/TrackAlbums";
interface AlbumTracksProps {}

const Album: FC<AlbumTracksProps> = () => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.tokenSlice);
  const idAlbums = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { data: album } = userAPI.useGetAlbumQuery({ id: idAlbums });
  let id = album?.artists[0]?.id;

  const { data: artist } = userAPI.useGetArtistQuery(id ? id : "");
  const handlerActer = () => {
    navigate(`/artists/${album?.artists[0].id}#access_token=${token}`);
  };

  return (
    <BaseContainer search={true}>
      <AlbumContainer>
        <HeaderAlbum>
          <Image src={album?.images[0].url}></Image>
          <InfoAlbum>
            <h3>{"Album".toUpperCase()}</h3>
            <div>{album?.name}</div>
            <Info>
              <ImageActer
                src={artist?.images[0].url}
                alt="icon"
              />
              <Artist onClick={handlerActer}>{album?.artists[0].name}</Artist>
              &nbsp;&bull;&nbsp;
              {album?.release_date.split("-")[0]} &bull;&nbsp;
              {album?.tracks.items.length} tracks,
            </Info>
          </InfoAlbum>
        </HeaderAlbum>
        <Dashboard>
          <ButtonAndPicture content=""></ButtonAndPicture>
          <Like></Like>
        </Dashboard>
        <Header>
          <div># НАЗВАНИЕ</div>
          <BiTime></BiTime>
        </Header>
        <hr></hr>
        {album && (
          <List
            items={album?.tracks.items}
            renderItem={(item, index) => (
              <TrackAlbums
                key={item.added_at}
                id={item.id}
                index={index + 1}></TrackAlbums>
            )}></List>
        )}
      </AlbumContainer>
    </BaseContainer>
  );
};

const AlbumContainer = styled.div`
  margin: 50px 0;
`;
const HeaderAlbum = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 25px;
`;

const Dashboard = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
`;

const Image = styled.img`
  width: 200px;
`;

const ImageActer = styled.img`
  width: 20px;
  border-radius: 50%;
`;

const Artist = styled.span`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InfoAlbum = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Header = styled.div`
  margin: 40px 25px;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default Album;
