import React, { FC } from "react";

interface SearchIconProps {
  name: string;
  src: string;
}

const SearchIcon: FC<SearchIconProps> = ({ name, src }) => {
  return <img src={src}></img>;
};

export default SearchIcon;
