import { FC } from "react";
import Menu from "@mui/material/Menu";
import styled from "styled-components";

interface MultiDropDownProps {
  open: boolean;
  children: React.ReactNode;
  el: null | HTMLElement;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

const MultiDropDown: FC<MultiDropDownProps> = ({
  open,
  children,
  handleClick,
  handleClose,
  el,
}) => {
  return (
    <>
      <DropDown
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        ...
      </DropDown>
      <Menu
        id="basic-menu"
        anchorEl={el}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {children}
      </Menu>
    </>
  );
};

const DropDown = styled.span`
  cursor: pointer;
  padding: 0;
`;

export default MultiDropDown;
