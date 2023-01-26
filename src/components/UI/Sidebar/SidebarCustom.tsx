import React from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { toggleTheme } from "../../../store/slices/ThemeSlice";

type Props = {};

const SidebarCustom = (props: Props) => {
  const { currentUser } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();
  const handleTheme = () => dispatch(toggleTheme());

  return (
    <div>
      <button onClick={handleTheme}>toggle theme</button>
    </div>
  );
};

export default SidebarCustom;
