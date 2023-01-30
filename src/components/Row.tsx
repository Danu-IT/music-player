import React, { FC } from "react";
import List from "./List";
import PlaylistItem from "./PlaylistItem";
import { IUserPlaylist } from "../interfaces/user";
import styled from "styled-components";

interface RowProps {
  title: string;
  component: any;
}

const Row: FC<RowProps> = ({ component, title }) => {
  return (
    <div>
      <Title>{title}</Title>
      <List
        items={component}
        flex={true}
        renderItem={(item: IUserPlaylist) => (
          <PlaylistItem
            key={item.id}
            playlist={item}></PlaylistItem>
        )}
      />
    </div>
  );
};

const Title = styled.h1`
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: 25px;
  line-height: 25px;
  margin: 0 0 30px 10px;
`;

export default Row;
