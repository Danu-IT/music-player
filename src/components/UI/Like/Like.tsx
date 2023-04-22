import React, { FC } from "react";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

interface LikeProps {
  activated?: boolean[] | undefined;
  onClick?: () => void;
}

const Like: FC<LikeProps> = ({ activated, onClick }) => {
  return (
    <div onClick={onClick}>
      {activated?.[0] ? (
        <LikeState size={30}></LikeState>
      ) : (
        <LikePic size={30}></LikePic>
      )}
    </div>
  );
};

interface LikePicProps {
  activated?: boolean[] | undefined;
}

export const LikePic = styled(FiHeart)<LikePicProps>`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LikeState = styled(AiFillHeart)<LikePicProps>`
  color: ${({ theme }) => theme.colors.secondary};
`;

export default Like;
