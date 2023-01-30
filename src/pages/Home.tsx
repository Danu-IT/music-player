import BaseContainer from "../components/BaseContainer";
import styled from "styled-components";

const Home = () => {
  return (
    <BaseContainer>
      <Header>Home</Header>
    </BaseContainer>
  );
};

const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
