import React, { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
`;
const Content = styled.div`
  cursor: pointer;
`;
export default Button;
