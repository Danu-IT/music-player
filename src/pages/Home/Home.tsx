import BaseContainer from "../../components/BaseContainer";
import styled from "styled-components";
import { userAPI } from "../../services/UserService";
import Row, { Title } from "../../components/Row";
import CategoryItem from "./components/CategoryItem/CategoryItem";
import { useAppSelector } from "../../hooks/redux";
import Track from "../../components/Track/Track";
import List from "../../components/List";
import AlbumItem from "../Album/components/AlbumItem/AlbumItem";
import Player from "../../components/Player/Player";

const Home = () => {
  const { search, player } = useAppSelector((state) => state.userSlice);
  const { data: category, isLoading: categoryLoading } =
    userAPI.useGetSeveralBrowseCategoriesQuery(null);

  const { data: req, isLoading: loading } = userAPI.useSearchInfoQuery({
    q: search,
    type: "album,track",
  });

  return (
    <BaseContainer>
      {search ? (
        <>
          <Tracks>
            <Title>Tracks</Title>
            {req?.tracks?.items.slice(0, 5).map((el, i) => (
              <Track
                like={true}
                track={el}
                index={i + 1}
                add={true}></Track>
            ))}
          </Tracks>
          <Row
            title="Albums"
            top={true}>
            {req && (
              <List
                items={req.albums.items}
                flex={true}
                renderItem={(item) => (
                  <AlbumItem
                    key={item.release_date}
                    album={item}></AlbumItem>
                )}></List>
            )}
          </Row>
        </>
      ) : (
        <>
          <Title>Category List</Title>
          <Category>
            {category?.categories.items.map((el) => (
              <CategoryItem
                loading={categoryLoading}
                key={el.id}
                category={el}></CategoryItem>
            ))}
          </Category>{" "}
        </>
      )}
      {player && <Player></Player>}
    </BaseContainer>
  );
};

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tracks = styled.div``;

export default Home;
