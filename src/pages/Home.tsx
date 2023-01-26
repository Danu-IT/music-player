import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux";
import { toggleTheme } from "../store/slices/ThemeSlice";
import SidebarCustom from "../components/UI/Sidebar/SidebarCustom";
import { ContainerPage, Page } from "../layouts/components";
import { userAPI } from "../services/UserService";
import { IUser } from "../interfaces/user";
import { receiveСurrentUser } from "../store/slices/UserSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: user, isFetching } = userAPI.useCurrentUserQuery(null);

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

  useEffect(() => {
    getCurrentUser(user);
  }, [isFetching]);

  return (
    <Page>
      <ContainerHomePage>
        <SidebarCustom></SidebarCustom>
        <Content>
          <Header>Music</Header>
        </Content>
      </ContainerHomePage>
    </Page>
  );
};

const ContainerHomePage = styled(ContainerPage)`
  display: flex;
  gap: 50px;
`;

const Content = styled.div``;

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
