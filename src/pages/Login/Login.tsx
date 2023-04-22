/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { isToken } from "../../store/slices/TokenSlice";
import { ContainerPage, Page } from "../../layouts/components";
import styled, { keyframes } from "styled-components";
import { FaPlay } from "react-icons/fa";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [rotate, setRotate] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.tokenSlice);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setRotate(true);
    const clientID = "31902ba63cef4879b088fcd06fd9d234";
    const redirect = window.location.href;
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "ugc-image-upload",
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-library-modify",
      "user-library-read",
      "user-read-recently-played",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-follow-modify",
      "user-follow-read",
      "streaming",
      "app-remote-control",
    ];

    window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirect}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(isToken(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Page>
      <ContainerLogin>
        <Logo>
          <Title>Music Player</Title>
          <LogoImg rotateImg={rotate}>
            <FaPlay
              size={150}
              onClick={handleLogin}></FaPlay>
          </LogoImg>
        </Logo>
      </ContainerLogin>
    </Page>
  );
};

const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ContainerLogin = styled(ContainerPage)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Title = styled.span`
  font-family: "MuseoModerno";
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 76px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition-duration: 0.5s;
  animation: ${fade} 1s linear infinite alternate;
  :hover {
    animation: none;
    cursor: pointer;
    transition-duration: 0.5s;
    scale: 1.2;
    opacity: 1;
  }
  :active {
    transition-duration: 0.1s;
    opacity: 0.5;
  }
`;

interface LogoImg {
  rotateImg: boolean;
}

const LogoImg = styled.div<LogoImg>`
  animation: ${({ rotateImg }) => rotateImg && rotate} 1s linear infinite;
`;

export default Login;
