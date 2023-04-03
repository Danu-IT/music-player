import { FC } from "react";
import { useLocation } from "react-router";
import { userAPI } from "../../services/UserService";
import BaseContainer from "../../components/BaseContainer";
import styled from "styled-components";
import CategoryPlaylistItem from "./components/CategoryPlaylistItem/CategoryPlaylistItem";
import { RowCustom } from "../Library/Library";
import List from "../../components/List";
import { useAppSelector } from "../../hooks/redux";
import Player from "../../components/Player/Player";

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { player } = useAppSelector((state) => state.userSlice);

  const {
    data: infoCategoryPlaylists,
    isLoading: infoCategoryPlaylistsLoading,
  } = userAPI.useGetCategorieFullInfoQuery({
    category_id: id,
  });

  const { data: infoCategory } = userAPI.useGetCategorieInfoQuery({
    category_id: id,
  });

  return (
    <Container search={true}>
      <Head>
        <Image
          src={infoCategory?.icons[0].url}
          alt=""
        />
        <Title>{infoCategory?.name}</Title>
      </Head>
      <Content>
        <RowCustom title="Playlists Category's">
          {infoCategoryPlaylists && (
            <List
              items={infoCategoryPlaylists.playlists.items}
              flex={true}
              renderItem={(item: any) => (
                <CategoryPlaylistItem
                  key={item.id}
                  playlist={item}
                  loading={infoCategoryPlaylistsLoading}></CategoryPlaylistItem>
              )}
            />
          )}
        </RowCustom>
      </Content>
      {player && <Player></Player>}
    </Container>
  );
};

const Container = styled(BaseContainer)`
  position: relative;
`;

const Head = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  gap: 100px;
  margin: 25px 0;
`;

const Title = styled.h1`
  z-index: 2;
  font-size: 100px;
`;

const Image = styled.img`
  z-index: 0;
`;

const Content = styled.div`
  margin: 405px 0;
`;

export default Category;
