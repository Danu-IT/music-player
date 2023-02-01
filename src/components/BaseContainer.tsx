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
  search?: boolean;
  navbar?: boolean;
};

const BaseContainer: FC<BaseContainerProps> = ({
  children,
  search,
  navbar,
}) => {
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
          <Navbar navbar={navbar}>
            <Hamburger
              size={30}
              onClick={() => dispatch(toggle())}></Hamburger>
            <SidebarCustom></SidebarCustom>
          </Navbar>
          <Content
            navbar={navbar}
            isActiveSidebar={isActiveSidebar}>
            <SearchCustom search={search}></SearchCustom>
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

interface NavbarProps {
  navbar?: boolean;
}

const Navbar = styled.div<NavbarProps>`
  display: ${({ navbar }) => (navbar !== true ? "flex" : "none")};
`;

const Hamburger = styled(GiHamburgerMenu)`
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.5s ease-out;
  position: fixed;
  margin: 15px;
  :hover {
    transition: all 0.5s ease-out;
  }
`;

interface ContentProps {
  isActiveSidebar: boolean;
  navbar?: boolean;
}

const Content = styled.div<ContentProps>`
  margin-left: ${({ isActiveSidebar, navbar }) =>
    navbar ? "0px" : isActiveSidebar ? "300px" : "200px"};
  transition: all 0.5s ease-out;
`;

export default BaseContainer;
