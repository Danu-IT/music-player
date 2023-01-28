import styled from "styled-components";
import BaseContainer from "../components/BaseContainer";

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
