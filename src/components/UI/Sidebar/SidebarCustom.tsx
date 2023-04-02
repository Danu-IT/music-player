import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { toggleTheme } from "../../../store/slices/ThemeSlice";
import CustomizedSwitches from "../Switch/SwitchCustom";
import { useState } from "react";
import { toggle } from "../../../store/slices/SidebarHiddenSlice";
import { userAPI } from "../../../services/UserService";
import { IUser } from "../../../interfaces/user";
import { receiveСurrentUser } from "../../../store/slices/UserSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import List from "../../List";
import { privateRoutes } from "../../../routes/index";
import {
  ImgArrow,
  Sidebar,
  User,
  Avatar,
  Name,
  Links,
  LinkCustom,
  DarkMode,
} from "./SidebarCustomStyles";

interface SidebarCustomProps {}

const SidebarCustom: FC<SidebarCustomProps> = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { vissible: isActiveSidebar } = useAppSelector(
    (state) => state.sidebarHiddenSlice
  );

  const { currentUser } = useAppSelector((state) => state.userSlice);
  const { token } = useAppSelector((state) => state.tokenSlice);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
    setIsDarkMode((prev) => !prev);
  };

  const { data: user, isFetching } = userAPI.useCurrentUserQuery(null);

  const getCurrentUser = (user: IUser | any) => {
    if (!user) return false;

    const createdUser: IUser = {
      id: user.id,
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
        <List
          items={privateRoutes.slice(0, 4)}
          flex={true}
          direction="column"
          renderItem={(item) => (
            <LinkCustom
              location={location.pathname}
              coloractive={item.path}
              key={item.type}
              to={`${item.path}#access_token=${token}`}>
              {item.type}
            </LinkCustom>
          )}></List>
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

export default SidebarCustom;
