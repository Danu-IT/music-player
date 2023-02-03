import React from "react";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
type Props = {};

const Like = (props: Props) => {
  return <LikePic size={40}>Like</LikePic>;
};

export const LikePic = styled(FiHeart)`
  color: ${({ theme }) => theme.colors.secondary};
`;

export default Like;
