import React, { FC } from "react";
import { ICategoryItemApi } from "../../../../interfaces/category";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";

interface CategoryItemProps {
  category: ICategoryItemApi;
  loading: boolean;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, loading }) => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.tokenSlice);

  const handlerCategory = () => {
    navigate(`/category/${category.id}#access_token=${token}`);
  };
  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <CategoryItemBox onClick={handlerCategory}>
          <Image src={category.icons[0].url}></Image>
          <Text>{category.name}</Text>
        </CategoryItemBox>
      )}
    </>
  );
};

const CategoryItemBox = styled.div`
  position: relative;
  width: 200px;
`;

const Text = styled.span`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 10px;
  font-size: 25px;
  color: white;
  width: 100%;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
`;

export default CategoryItem;
