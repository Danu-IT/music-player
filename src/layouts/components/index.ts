import styled from "styled-components";

export const Page = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
`;

export const ContainerPage = styled.div`
  width: 1200px;
  margin: 0 auto;
`;