import React, { FC } from "react";

import styled from "styled-components";

interface RowProps {
  title: string;
  children: React.ReactNode;
  top?: boolean;
}

const Row: FC<RowProps> = ({ title, children, top, ...props }) => {
  return (
    <div {...props}>
      <Title top={top}>{title}</Title>
      {children}
    </div>
  );
};

interface TitleProps {
  top?: boolean;
}

export const Title = styled.h1<TitleProps>`
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: 25px;
  line-height: 25px;
  margin: ${({ top }) => (top ? "45px" : "0px")} 0 30px 10px;
`;

export default Row;
