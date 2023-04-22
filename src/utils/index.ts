import bell from "../assets/images/Search/bell.svg";
import chanelList from "../assets/images/Search/player-list-play.svg";
import refresh from "../assets/images/Search/refresh.svg";
import star from "../assets/images/Search/star.svg";
import bellDark from "../assets/images/Search/bellDark.svg";
import chanelListDark from "../assets/images/Search/player-list-playDark.svg";
import refreshDark from "../assets/images/Search/refreshDark.svg";
import starDark from "../assets/images/Search/starDark.svg";
import { ReactNode } from 'react';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import {ImVolumeLow} from 'react-icons/im'
import {FaVolumeUp} from 'react-icons/fa'
import { IconType } from "react-icons";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";

interface SearchIconsProps {
  name: string;
  light: string;
  dark: string;
}

interface VolumeIconsProps {
  range: number[];
  icon: IconType;
}

export interface RepeatIconsProps {
  name: string;
  src: IconType;
  color?: string;
}

export const SearchIcons: SearchIconsProps[] = [
  { name: "refresh", light: refresh, dark: refreshDark },
  { name: "bell", light: bell, dark: bellDark },
  { name: "star", light: star, dark: starDark },
  { name: "chanelList", light: chanelList, dark: chanelListDark },
];

export const VolumeIcons: VolumeIconsProps[] = [
  { icon: HiVolumeOff, range: [0, 0]},
  { icon: ImVolumeLow, range: [1, 33] },
  { icon: HiVolumeUp, range: [34, 66] },
  { icon: FaVolumeUp, range: [67, 100] }
]

export const RepeatIcons: RepeatIconsProps[] = [
  {src: TbRepeatOff, name: 'off'},
  {src: TbRepeat, name: 'context'},
  {src: TbRepeatOnce, name: 'track'},
]