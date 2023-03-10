import styled from "styled-components";
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  flex?: boolean;
  direction?: string;
  length?: number;
}

export default function List<T>({
  flex,
  items,
  renderItem,
  direction,
}: ListProps<T>) {
  return (
    <Container
      direction={direction}
      flex={flex}>
      {items.map(renderItem)}
    </Container>
  );
}

interface ContainerProps {
  flex?: boolean;
  direction?: string;
}

const Container = styled.div<ContainerProps>`
  display: ${({ flex }) => (flex ? "flex" : "block")};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  gap: 15px;
`;
