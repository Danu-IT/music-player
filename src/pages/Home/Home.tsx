import BaseContainer from "../../components/BaseContainer";
import styled from "styled-components";
import { userAPI } from "../../services/UserService";
import CategoryItem from "../Category/components/CategoryItem/CategoryItem";
import { Title } from "../../components/Row";

const Home = () => {
  const { data: category } = userAPI.useGetSeveralBrowseCategoriesQuery(null);
  return (
    <BaseContainer>
      <Title>Category List</Title>
      <Category>
        {category?.categories.items.map((el) => (
          <CategoryItem category={el}></CategoryItem>
        ))}
      </Category>
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

export default Home;
