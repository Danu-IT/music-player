import React, { FC } from "react";
import styled from "styled-components";
import { BsPlay } from "react-icons/bs";

interface ButtonAndPictureProps {
  content: string;
}

const ButtonAndPicture: FC<ButtonAndPictureProps> = ({ content }) => {
  return (
    <Container content={content}>
      <LinkButton href="">{content}</LinkButton>
      <Icon size={content.length > 0 ? 20 : 30}></Icon>
    </Container>
  );
};
interface ContainerProps {
  content: string;
}

const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: ${({ content }) => (content.length > 0 ? "100px" : "50px")};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ content }) => (content.length > 0 ? "18px" : "50%")};
  &:hover {
    opacity: 0.7;
    scale: 1.05;
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
