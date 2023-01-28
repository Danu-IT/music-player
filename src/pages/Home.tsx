import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import SidebarCustom from "../components/UI/Sidebar/SidebarCustom";
import { ContainerPage, Page } from "../layouts/components";
import { userAPI } from "../services/UserService";
import Loader from "../components/UI/Loader/Loader";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggle } from "../store/slices/SidebarHiddenSlice";
import SearchCustom from "../components/UI/Search/SearchCustom";

const Home = () => {
  const dispatch = useAppDispatch();
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );
  const { isLoading: isLoadingUser } = userAPI.useCurrentUserQuery(null);

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
            <Header>Music</Header>
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

export const Hamburger = styled(GiHamburgerMenu)`
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

export const Content = styled.div<ContentProps>`
  margin-left: ${({ isActiveSidebar }) =>
    isActiveSidebar ? "300px" : "200px"};
  transition: all 0.5s ease-out;
`;

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
