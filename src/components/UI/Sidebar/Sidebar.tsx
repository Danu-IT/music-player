import { FC } from "react";
import styled from "styled-components";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <Container>
      <User></User>
      <></>
    </Container>
  );
};

const Container = styled.div``;
const User = styled.div``;

export default Sidebar;
