import React, { FC } from "react";
import { Page, ContainerPage } from "../layouts/components/index";
import Loader from "./UI/Loader/Loader";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { userAPI } from "../services/UserService";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggle } from "../store/slices/SidebarHiddenSlice";
import SidebarCustom from "./UI/Sidebar/SidebarCustom";
import SearchCustom from "./UI/Search/SearchCustom";

type BaseContainerProps = {
  children: React.ReactNode;
};

const BaseContainer: FC<BaseContainerProps> = ({ children }) => {
  const { isLoading: isLoadingUser } = userAPI.useCurrentUserQuery(null);
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );
  const dispatch = useAppDispatch();
  return (
    <Page>
      {isLoadingUser ? (
        <Loader></Loader>
      ) : (
        <ContainerHomePage>
          <Hamburger
            size={30}
            onClick={() => dispatch(toggle())}></Hamburger>
          <SidebarCustom></SidebarCustom>
          <Content isActiveSidebar={isActiveSidebar}>
            <SearchCustom></SearchCustom>
            {children}
          </Content>
        </ContainerHomePage>
      )}
    </Page>
  );
};

const ContainerHomePage = styled(ContainerPage)`
  display: flex;
  gap: 50px;
`;

const Hamburger = styled(GiHamburgerMenu)`
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.5s ease-out;
  position: absolute;
  margin: 15px;
  :hover {
    transition: all 0.5s ease-out;
    transform: rotate(180deg);
  }
`;

interface ContentProps {
  isActiveSidebar: boolean;
}

const Content = styled.div<ContentProps>`
  margin-left: ${({ isActiveSidebar }) =>
    isActiveSidebar ? "300px" : "200px"};
  transition: all 0.5s ease-out;
`;

export default BaseContainer;
