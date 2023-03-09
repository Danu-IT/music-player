import { FC } from "react";
import { ICategoryItemApi } from "../../../interfaces/category";
import styled from "styled-components";
import { userAPI } from "../../../services/UserService";

type CategoryItemProps = {
  category: ICategoryItemApi;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { data: infoCategory } = userAPI.useGetCategorieFullInfoQuery({
    category_id: category.id,
  });
  console.log(infoCategory);
  return (
    <CategoryIcon>
      <Icon src={category.icons[0].url}></Icon>
      <Text>{category.name}</Text>
    </CategoryIcon>
  );
};

const CategoryIcon = styled.div`
  height: 250px;
  width: 250px;
  background-color: red;
  position: relative;
  border-radius: 16px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const Text = styled.div`
  color: white;
  position: absolute;
  bottom: 0;
  left: 0px;
  font-size: 30px;
`;

export default CategoryItem;
