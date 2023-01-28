import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { toggleTheme } from "../../../store/slices/ThemeSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CustomizedSwitches from "../Switch/SwitchCustom";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toggle } from "../../../store/slices/SidebarHiddenSlice";
import { userAPI } from "../../../services/UserService";
import { IUser } from "../../../interfaces/user";
import { receiveСurrentUser } from "../../../store/slices/UserSlice";
import { useEffect } from "react";

interface SidebarCustomProps {}

const SidebarCustom: FC<SidebarCustomProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );

  const { currentUser } = useAppSelector((state) => state.userSlice);
  const { token } = useAppSelector((state) => state.tokenSlice);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
    setIsDarkMode((prev) => (prev = !prev));
  };

  const {
    data: user,
    isFetching,
    isLoading: isLoadingUser,
  } = userAPI.useCurrentUserQuery(null);

  const getCurrentUser = (user: IUser | any) => {
    if (!user) return false;

    const createdUser: IUser = {
      display_name: user.display_name,
      country: user.country,
      email: user.email,
      image: user.images[0],
    };
    dispatch(receiveСurrentUser(createdUser));
  };

  useEffect(() => {
    getCurrentUser(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <Sidebar isActiveSidebar={isActiveSidebar}>
      <ImgArrow
        size={20}
        onClick={() => dispatch(toggle())}></ImgArrow>
      <User>
        <Avatar
          src={currentUser?.image.url}
          alt="avatar"
        />
        <Name>{currentUser?.display_name}</Name>
      </User>
      <Links>
        <LinkCustom
          replace={false}
          to={`/#access_token=${token}`}>
          Home
        </LinkCustom>
        <LinkCustom
          replace={false}
          to={`/playlists/#access_token=${token}`}>
          Playlists
        </LinkCustom>
        <LinkCustom
          replace={false}
          to={`/#access_token=${token}`}>
          Settings
        </LinkCustom>
        <LinkCustom
          replace={false}
          to={`/#access_token=${token}`}>
          Language
        </LinkCustom>
      </Links>
      <DarkMode>
        <div>Night Mode</div>
        <CustomizedSwitches
          checked={isDarkMode}
          onChange={handleTheme}></CustomizedSwitches>
      </DarkMode>
    </Sidebar>
  );
};

interface SidebarProps {
  isActiveSidebar: boolean;
}

const Sidebar = styled.div<SidebarProps>`
  width: 265px;
  background: ${({ theme }) => theme.colors.bg};
  position: absolute;
  height: 100vh;
  padding: 30px 30px 0px 30px;
  left: ${({ isActiveSidebar }) => (isActiveSidebar ? "none" : "-100%")};
`;

const ImgArrow = styled(BsArrowLeft)`
  position: absolute;
  right: 30px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  transition: all 1s;
`;
const Name = styled.div`
  font-size: 25px;
  padding-top: 10px;
  padding-left: 5px;
`;
const Avatar = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

const LinkCustom = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 400;
  font-size: 20px;
  color: ;
  > * {
    padding: 5px;
    :hover {
      opacity: 0.6;
      border-radius: 10px;
    }
  }
`;

const DarkMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  margin-top: 50px;
`;

export default SidebarCustom;
