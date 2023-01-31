import React, { FC } from "react";
import styled from "styled-components";
import { BsPlay } from "react-icons/bs";

interface ButtonAndPictureProps {
  content: string;
}

const ButtonAndPicture: FC<ButtonAndPictureProps> = ({ content }) => {
  return (
    <Container>
      <LinkButton href="">{content}</LinkButton>
      <Icon></Icon>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  &:hover {
    opacity: 0.7;
  }
`;
const LinkButton = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.bg};
`;
const Icon = styled(BsPlay)`
  color: ${({ theme }) => theme.colors.bg};
`;

export default ButtonAndPicture;
