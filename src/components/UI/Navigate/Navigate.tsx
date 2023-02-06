import { FC } from "react";
import { IRoute } from "../../../routes/index";

interface NavigateProps {
  content: IRoute[];
}

const Navigate: FC<NavigateProps> = ({ content }) => {
  return (
    <div>
      {content.map((item) => (
        <span>{item.type}</span>
      ))}
      <span></span>
    </div>
  );
};

export default Navigate;
