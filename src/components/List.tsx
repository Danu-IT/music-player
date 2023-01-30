import styled from "styled-components";
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  flex?: boolean;
  direction?: string;
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
  gap: 15px;
`;
