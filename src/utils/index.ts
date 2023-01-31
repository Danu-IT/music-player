import bell from "../assets/images/Search/bell.svg";
import chanelList from "../assets/images/Search/player-list-play.svg";
import refresh from "../assets/images/Search/refresh.svg";
import star from "../assets/images/Search/star.svg";
import bellDark from "../assets/images/Search/bellDark.svg";
import chanelListDark from "../assets/images/Search/player-list-playDark.svg";
import refreshDark from "../assets/images/Search/refreshDark.svg";
import starDark from "../assets/images/Search/starDark.svg";

interface SearchIconsProps {
  name: string;
  light: string;
  dark: string;
}

export const SearchIcons: SearchIconsProps[] = [
  { name: "refresh", light: refresh, dark: refreshDark },
  { name: "bell", light: bell, dark: bellDark },
  { name: "star", light: star, dark: starDark },
  { name: "chanelList", light: chanelList, dark: chanelListDark },
];
