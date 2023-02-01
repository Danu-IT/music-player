import React, { FC } from "react";
import BaseContainer from "../components/BaseContainer";
import { useLocation } from "react-router";
import { userAPI } from "../services/UserService";
import styled from "styled-components";
import ButtonAndPicture from "../components/UI/ButtonAndPicture/ButtonAndPicture";
import Button from "../components/UI/Button/Button";
import List from "../components/List";
import Track from "../components/Track/Track";
import AlbumItem from "../components/Albums/AlbumItem";
import Row from "../components/Row";

interface ArtistProps {}

const Artist: FC<ArtistProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data: artist } = userAPI.useGetArtistQuery(id);
  const { data: top } = userAPI.useGetArtistsTopTracksQuery({ id });
  const { data: albums } = userAPI.useGetArtistsAlbumsQuery({ id });

  return (
    <Container search={true}>
      <HeaderArtist>
        <HeaderContent>
          <IamgeArtist src={artist?.images[0].url}></IamgeArtist>
          <InfoArtist>
            <NameInfo>{artist?.name}</NameInfo>
            <Subscribe>{artist?.followers.total} подписчиков</Subscribe>
          </InfoArtist>
        </HeaderContent>
      </HeaderArtist>
      <Content>
        <Play>
          <ButtonAndPicture content=""></ButtonAndPicture>
          <Button>Подписаться</Button>
        </Play>
        <Row top={true} title="Popular tracks">
          {top && (
            <List
              items={top.tracks}
              renderItem={(item, i) => (
                <Track
                  add={true}
                  artist={true}
                  index={i + 1}
                  track={item}
                  key={item.duration_ms}
                ></Track>
              )}
            ></List>
          )}
        </Row>
        <Row top={true} title="Albums">
          {albums && (
            <List
              flex={true}
              items={albums.items}
              renderItem={(item, i) => (
                <AlbumItem album={item} key={item.id}></AlbumItem>
              )}
            ></List>
          )}
        </Row>
      </Content>
    </Container>
  );
};

const Container = styled(BaseContainer)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeaderArtist = styled.div`
  height: 200px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeaderContent = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: flex-end;
`;

const InfoArtist = styled.div`
  padding: 0px 0 0 30px;
`;
const Subscribe = styled.div`
  padding: 20px 0 0 0px;
`;
const NameInfo = styled.h1`
  font-size: 70px;
  font-weight: bold;
`;
const IamgeArtist = styled.img`
  border-radius: 50%;
  height: 200px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Play = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
`;
export default Artist;
