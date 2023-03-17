import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useLocation } from "react-router";
import { userAPI } from "../../services/UserService";
import { ContainerPage, Page } from "../../layouts/components";
import BaseContainer from "../../components/BaseContainer";
import styled from "styled-components";
import PlaylistItem from "../Playlist/components/PlaylistItem/PlaylistItem";
import CategoryPlaylistItem from "./components/CategoryPlaylistItem/CategoryPlaylistItem";
import { RowCustom } from "../Library/Library";
import List from "../../components/List";
import { IUserPlaylist } from "../../interfaces/user";

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: infoCategoryPlaylists } = userAPI.useGetCategorieFullInfoQuery({
    category_id: id,
  });

  const { data: infoCategory } = userAPI.useGetCategorieInfoQuery({
    category_id: id,
  });

  console.log(infoCategory, infoCategoryPlaylists?.playlists.items[0].id);
  // const { data: playlists } = userAPI.useGetPlaylistsQuery(
  //   "37i9dQZF1DX6OgmB2fwLGd"
  // );

  return (
    <BaseContainer search={true}>
      <Title>{infoCategory?.name}</Title>
      <Content>
        <RowCustom title="Playlists Category's">
          {infoCategoryPlaylists && (
            <List
              items={infoCategoryPlaylists.playlists.items}
              flex={true}
              renderItem={(item: any) => (
                <CategoryPlaylistItem
                  key={item.id}
                  playlist={item}></CategoryPlaylistItem>
              )}
            />
          )}
        </RowCustom>
      </Content>
    </BaseContainer>
  );
};

const Title = styled.h1`
  font-size: 70px;
  margin: 75px 0;
`;

const Content = styled.div``;

export default Category;
