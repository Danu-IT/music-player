import React, { FC } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import LogoImage from "../../../assets/images/Logo.svg";
import LogoImageDark from "../../../assets/images/LogoDark.svg";
import { SearchIcons } from "../../../utils";
import SearchIcon from "./SearchIcon";
import List from "../../List";
import { useAppSelector } from "../../../hooks/redux";

interface SearchCustomProps {
  search?: boolean;
}

const SearchCustom: FC<SearchCustomProps> = ({ search }) => {
  const { theme } = useAppSelector((state) => state.themeSlice);
  return (
    <ContainerSearch search={search}>
      <Logo src={theme.type === "dark" ? LogoImage : LogoImageDark}></Logo>
      <InputContainer>
        <ImgInput size={15}></ImgInput>
        <Input></Input>
      </InputContainer>
      <SearchContainer>
        <List
          items={SearchIcons}
          flex={true}
          renderItem={(icon) => (
            <SearchIcon
              key={icon.name}
              name={icon.name}
              src={theme.type === "dark" ? icon.light : icon.dark}></SearchIcon>
          )}></List>
      </SearchContainer>
    </ContainerSearch>
  );
};

interface ContainerSearchProps {
  search?: boolean;
}

const ContainerSearch = styled.div<ContainerSearchProps>`
  display: ${({ search }) => (search !== true ? "flex" : "none")};
  align-items: center;
  margin: 40px 20px;
  & > * {
    margin-right: 30px;
  }
`;
const Logo = styled.img``;
const Input = styled.input`
  background-color: white !important;
  background-size: 16px;
  background-position: 10px 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 19px;
  width: 543px;
  height: 37px;
  padding: 0 0 0 40px;
`;
const InputContainer = styled.div`
  position: relative;
`;
const ImgInput = styled(BsSearch)`
  position: absolute;
  top: 30%;
  left: 20px;
`;
const SearchContainer = styled.div`
  & > * {
    margin-right: 20px;
  }
`;
export default SearchCustom;
