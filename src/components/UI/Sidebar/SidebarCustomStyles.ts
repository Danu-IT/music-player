import styled from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export interface SidebarProps {
  isActiveSidebar: boolean;
}

export const Sidebar = styled.div<SidebarProps>`
    width: 265px;
    background: ${({ theme }) => theme.colors.bg};
    position: absolute;
    height: 100vh;
    padding: 30px 30px 0px 30px;
    left: ${({ isActiveSidebar }) => (isActiveSidebar ? "none" : "-100%")};
  `;

export const ImgArrow = styled(BsArrowLeft)`
    position: absolute;
    right: 30px;
  `;

export const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    transition: all 1s;
  `;

export const Name = styled.div`
    font-size: 25px;
    padding-top: 10px;
    padding-left: 5px;
  `;
export const Avatar = styled.img`
    width: 46px;
    height: 46px;
    border-radius: 50%;
  `;

export interface LinkCustomProps {
  coloractive: string;
  location: string;
}

export const LinkCustom = styled(Link) <LinkCustomProps>`
    display: inline;
    color: ${({ theme, coloractive, location }) =>
    coloractive === location ? "red" : theme.colors.primary};
    :hover {
      opacity: 0.6;
      border-radius: 10px;
    }
  `;

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 400;
    font-size: 20px;
    color: ;
    > * {
      padding: 5px;
    }
  `;

export const DarkMode = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;
    margin-top: 50px;
  `;