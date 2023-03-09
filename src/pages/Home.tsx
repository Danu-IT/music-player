import BaseContainer from "../components/BaseContainer";
import styled from "styled-components";
import { userAPI } from "../services/UserService";
import CategoryItem from "../components/Category/CategoryItem/CategoryItem";
import { Title } from "../components/Row";

const Home = () => {
  const { data: category } = userAPI.useGetSeveralBrowseCategoriesQuery(null);
  console.log(category);
  return (
    <BaseContainer>
      <Title>Category List</Title>
      <Category>
        {category &&
          category?.categories.items.map((el) => (
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
