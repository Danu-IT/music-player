import { FC, useState, useEffect } from "react";
import BaseContainer from "../components/BaseContainer";
import { useLocation } from "react-router";
import { userAPI } from "../services/UserService";
import styled from "styled-components";
import ButtonAndPicture from "../components/UI/ButtonAndPicture/ButtonAndPicture";
import Button from "../components/UI/Button/Button";
import List from "../components/List";
import Track from "../components/UI/Track/Track";
import AlbumItem from "../components/Albums/AlbumItem/AlbumItem";
import Row from "../components/Row";
import ArtistItem from "../components/Artists/ArtistItem/ArtistItem";
import { separation } from "../utils/calc";

interface ArtistProps {}

const Artist: FC<ArtistProps> = () => {
  const [full, setFull] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: artist } = userAPI.useGetArtistQuery(id);
  const { data: top } = userAPI.useGetArtistsTopTracksQuery({ id });
  const { data: albums } = userAPI.useGetArtistsAlbumsQuery({ id });
  const { data: artistsRelated } = userAPI.useGetArtistsRelatedArtistsQuery(id);

  // const { update } = userAPI.usePutFollowArtistsMutation({
  //   ids: "57dN52uHvrHOxijzpIgu3E",
  //   type: "artist",
  // });

  const { data: checkSubscibe } = userAPI.useGetCheckIfUserFollowsArtistsQuery({
    ids: artist?.id,
    type: "artist",
  });

  const total = separation(artist?.followers.total);

  useEffect(() => {
    if (Array.isArray(checkSubscibe)) {
      setCheck(checkSubscibe[0]);
    }
  }, [checkSubscibe]);

  useEffect(() => window.scrollTo(0, 0), [id]);
  return (
    <Container search={true}>
      <HeaderArtist>
        <HeaderContent>
          <IamgeArtist src={artist?.images[0].url}></IamgeArtist>
          <InfoArtist>
            <NameInfo>{artist?.name}</NameInfo>
            <Subscribe>{total} subscribers</Subscribe>
          </InfoArtist>
        </HeaderContent>
      </HeaderArtist>
      <Content>
        <Play>
          <ButtonAndPicture content=""></ButtonAndPicture>
          <Button>{check ? "Unsubscribe" : "Subscribe"}</Button>
        </Play>
        <Row
          top={true}
          title="Popular tracks">
          {top && (
            <List
              items={full ? top?.tracks : top?.tracks.slice(0, 5)}
              renderItem={(item, i) => (
                <Track
                  add={true}
                  artist={true}
                  index={i + 1}
                  track={item}
                  key={item.duration_ms}></Track>
              )}></List>
          )}
        </Row>
        {top && top?.tracks.length >= 5 ? (
          <View onClick={() => setFull((prev) => (prev = !prev))}>
            {full ? "HOLD" : "MORE"}
          </View>
        ) : (
          <></>
        )}

        <Row
          top={true}
          title="Albums">
          {albums && (
            <List
              flex={true}
              items={albums.items.slice(0, 5)}
              renderItem={(item, i) => (
                <AlbumItem
                  album={item}
                  key={item.id}></AlbumItem>
              )}></List>
          )}
        </Row>
        <Row
          top={true}
          title="Fans also like">
          {artistsRelated && (
            <List
              flex={true}
              items={artistsRelated.artists.slice(0, 5)}
              renderItem={(item, i) => (
                <ArtistItem artist={item}></ArtistItem>
              )}></List>
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

const View = styled.div`
  cursor: pointer;
  margin-top: 10px;
`;

const Play = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
`;
export default Artist;
