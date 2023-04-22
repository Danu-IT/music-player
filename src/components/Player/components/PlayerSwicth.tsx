import { FC, ChangeEvent, RefObject, useEffect, useState } from "react";
import styled from "styled-components";
import { TiArrowShuffle } from "react-icons/ti";
import { RiRewindFill } from "react-icons/ri";
import { TbArrowsRight, TbRepeat } from "react-icons/tb";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { userAPI } from "../../../services/UserService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  changeDuration,
  changeIndex,
  changePlayTrack,
  changeTime,
} from "../../../store/slices/UserSlice";
import { RepeatIcons, RepeatIconsProps } from "../../../utils";
import { calcTime } from "../../../utils/calc";

interface PlayerSwicthProps {
  progressBar: any;
  allTime: number;
}

const PlayerSwicth: FC<PlayerSwicthProps> = ({ progressBar, allTime }) => {
  const { data: playerState, refetch } = userAPI.useGetPaybackStateQuery(null);

  const repeatIconInitialState = { src: TbRepeat, name: "off", color: "" };
  const [repeatIcon, setRepeatIcon] = useState<RepeatIconsProps>(
    repeatIconInitialState
  );

  let timeout: any;
  let second: any;
  let tick = allTime / 100;

  const [playTrack] = userAPI.useStartResumePlaybackMutation();
  const [pauseTrack] = userAPI.usePausePlaybackMutation();
  const [skipTrackPrev] = userAPI.useSkipToPreviousMutation();
  const [skipTrackNext] = userAPI.useSkipToNextMutation();
  const [repeat] = userAPI.useRepeatPlaybackMutation();
  const [shuffleTrack] = userAPI.useShufflePlaybackMutation();

  const { context, indexStore, isPlay, time, duration } = useAppSelector(
    (state) => state.userSlice
  );

  // console.log(duration);

  const dispatch = useAppDispatch();

  const prev = () => {
    skipTrackPrev(null);
    dispatch(changePlayTrack(false));
    dispatch(changeIndex(indexStore - 1));
    dispatch(changeDuration("0"));
    dispatch(changeTime(0));
  };

  const skip = () => {
    skipTrackNext(null);
    dispatch(changePlayTrack(false));
    dispatch(changeIndex(indexStore + 1));
    dispatch(changeDuration("0"));
    dispatch(changeTime(0));
  };

  const play = () => {
    playTrack({
      context_uri: context,
      position_ms: time,
      offset: indexStore,
    });
    dispatch(changePlayTrack(false));
  };

  const pause = () => {
    dispatch(changePlayTrack(true));
    pauseTrack(null);
  };

  const handlerRepeat = (name: string, i: number) => {
    if (i !== 2) {
      setRepeatIcon(RepeatIcons[i + 1]);
      repeat({ state: RepeatIcons[i + 1].name });
    } else {
      setRepeatIcon(RepeatIcons[0]);
      repeat({ state: RepeatIcons[0].name });
    }
  };

  const switchShuffle = () => {
    refetch();
  };

  const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    pause();
    dispatch(changeDuration(e.target.value));
    dispatch(changeTime(Number(e.target.value) * tick));
  };

  useEffect(() => {
    if (!isPlay) {
      timeout = setTimeout(() => {
        dispatch(changeDuration(String(+duration + 1)));
      }, tick);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isPlay, duration]);
  useEffect(() => {
    if (!isPlay) {
      second = setTimeout(() => {
        dispatch(changeTime(time + 1000));
      }, 1000);
    }
    if (allTime <= time) {
      dispatch(changeDuration("0"));
      dispatch(changeTime(0));
      dispatch(changeIndex(indexStore + 1));
    }
    return () => {
      clearTimeout(second);
    };
  }, [isPlay, time]);

  useEffect(() => {
    shuffleTrack({ state: !playerState?.shuffle_state });
  }, [playerState]);

  useEffect(() => {
    dispatch(changeDuration("0"));
  }, []);
  return (
    <Content>
      <ContentUp>
        <span onClick={switchShuffle}>
          {playerState?.shuffle_state ? (
            <TbArrowsRight size={33}></TbArrowsRight>
          ) : (
            <TiArrowShuffle size={33}></TiArrowShuffle>
          )}
        </span>
        <RiRewindFill
          onClick={prev}
          size={30}></RiRewindFill>
        {isPlay ? (
          <AiFillPlayCircle
            onClick={play}
            size={30}></AiFillPlayCircle>
        ) : (
          <AiFillPauseCircle
            onClick={pause}
            size={30}></AiFillPauseCircle>
        )}

        <RiRewindFillRight
          onClick={skip}
          size={30}></RiRewindFillRight>
        {RepeatIcons.map((el, i) => {
          if (el.name === repeatIcon.name) {
            return (
              <el.src
                color={repeatIcon.color}
                onClick={() => handlerRepeat(el.name, i)}
                size={30}></el.src>
            );
          }
        })}
      </ContentUp>
      <ContentDown>
        <LeftTime>{calcTime(time)}</LeftTime>
        <Input
          value={duration}
          type="range"
          onChange={(e) => changeProgress(e)}
          ref={progressBar}></Input>
        <RightTime>{calcTime(allTime)}</RightTime>
      </ContentDown>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  * {
    margin-left: 20px;
  }
`;
const ContentUp = styled.div`
  padding: 0 0 10px 0;
`;
const ContentDown = styled.div`
  position: absolute;
  width: 100%;
  left: -70px;
`;
const RiRewindFillRight = styled(RiRewindFill)`
  transform: rotate(180deg);
`;

const LeftTime = styled.span`
  position: absolute;
  left: -60px;
  top: 3px;
`;

const RightTime = styled.span`
  position: absolute;
  right: -240px;
  top: 3px;
`;

interface InputProps {
  value: string;
}

const Input = styled.input<InputProps>`
  width: 150%;
  position: relative;
  outline: none;
  height: 5px;
  border: none;
  appearance: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    background-color: white;
    height: 5px;
    width: ${({ value }) => value + "%"};
    border-radius: 10px;
    z-index: 2;
    transition: all 0.3s ease;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: none;
    outline: none;
  }
`;

export default PlayerSwicth;
