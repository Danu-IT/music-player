import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux";
import { toggleTheme } from "../store/slices/ThemeSlice";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import { ContainerPage, Page } from "../layouts/components";

const Home = () => {
  const dispatch = useAppDispatch();
  const handleTheme = () => dispatch(toggleTheme());

  return (
    <Page>
      <ContainerPage>
        <Sidebar></Sidebar>
        <button onClick={handleTheme}>toggle theme</button>
        <Header>Music</Header>
      </ContainerPage>
    </Page>
  );
};

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
