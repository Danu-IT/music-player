import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import SidebarCustom from "../components/UI/Sidebar/SidebarCustom";
import { ContainerPage, Page } from "../layouts/components";
import { userAPI } from "../services/UserService";
import { IUser } from "../interfaces/user";
import { receiveСurrentUser } from "../store/slices/UserSlice";
import { useEffect } from "react";
import Loader from "../components/UI/Loader/Loader";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggle } from "../store/slices/SidebarHiddenSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useAppDispatch();
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );
  const {
    data: user,
    isFetching,
    isLoading: isLoadingUser,
  } = userAPI.useCurrentUserQuery(null);
  const { token } = useAppSelector((state) => state.tokenSlice);

  const { data: test } = userAPI.useTestFetchQuery(null);

  const fetchData = async (token: string | null, user: IUser | undefined) => {
    if (!token || user === undefined) return false;

    const { data } = await axios.get(
      `https://api.spotify.com/v1/episodes/512ojhOuo1ktJprKbVcKyQ`,
      {
        params: {
          market: "ES",
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type ": "application/json",
        },
      }
    );
    console.log(data);
  };

  const getCurrentUser = (user: IUser | any) => {
    if (!user) return false;

    const createdUser: IUser = {
      display_name: user.display_name,
      country: user.country,
      email: user.email,
      image: user.images[0],
    };
    dispatch(receiveСurrentUser(createdUser));
  };
  fetchData(token, user);

  useEffect(() => {
    getCurrentUser(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

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
    isActiveSidebar ? "300px" : "150px"};
  transition: all 0.5s ease-out;
`;

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
