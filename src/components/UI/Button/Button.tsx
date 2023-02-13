import React, { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 4px 10px;
  max-width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
`;
const Content = styled.div`
  cursor: pointer;
`;
export default Button;
