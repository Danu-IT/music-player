import bell from "../assets/images/Search/bell.svg";
import chanelList from "../assets/images/Search/player-list-play.svg";
import refresh from "../assets/images/Search/refresh.svg";
import star from "../assets/images/Search/star.svg";

interface SearchIconsProps {
  name: string;
  src: string;
}

export const SearchIcons: SearchIconsProps[] = [
  { name: "refresh", src: refresh },
  { name: "bell", src: bell },
  { name: "star", src: star },
  { name: "chanelList", src: chanelList },
];
