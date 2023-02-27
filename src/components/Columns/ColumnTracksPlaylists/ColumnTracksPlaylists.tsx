import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { userAPI } from "../../../services/UserService";
import List from "../../List";
import Track from "../../UI/Track/Track";
import { IUserPlaylistTrackHaracter } from "../../../interfaces/user";

interface TracksProps {
  id: string;
}

const ColumnTracksPlaylists: FC<TracksProps> = ({ id }) => {
  const { data: tracks } = userAPI.useCurrentUserPlaylistTracksQuery(id);
  // const [upddate] = userAPI.useUpdateUserPlaylistItemsMutation();

  // const findDuplicates = (
  //   arr: IUserPlaylistTrackHaracter[] | undefined
  // ): string[] => {
  //   const filteredArray: any[] = [];
  //   const answer: string[] = [];
  //   arr?.filter((item) => {
  //     if (
  //       !filteredArray.some((element) => element.track.id === item.track.id)
  //     ) {
  //       filteredArray.push(item);
  //     }
  //   });
  //   filteredArray.forEach((el) => answer.push(`spotify:track:${el.track.id}`));
  //   return answer;
  // };

  useEffect(() => {
    console.log(tracks);
    // const current = findDuplicates(tracks?.items);
    // upddate({
    //   playlist_id: id,
    //   uris: current,
    //   range_start: 0,
    //   insert_before: current.length,
    //   range_length: current.length,
    // });
  }, [tracks]);
  return (
    <Container>
      <ContainerMusic>
        <Header>
          <Number>#</Number>
          <Song>Songs</Song>
          <Duration>Duration</Duration>
          <Artist>Artist</Artist>
          <Album>Album</Album>
        </Header>
        {tracks && (
          <List
            items={tracks.items}
            renderItem={(item, i) => (
              <Track
                index={i + 1}
                track={item.track}
                remove={true}
                key={item.track.duration_ms}></Track>
            )}></List>
        )}
      </ContainerMusic>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;
const Header = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 18px;
  line-height: 13px;
`;

export const Image = styled.img`
  width: 62px;
  height: 41px;
  object-fit: cover;
`;

export const Number = styled.div`
  column-width: 100px;
  margin-left: 20px;
`;

export const Song = styled.div`
  column-width: 250px;
`;

export const Duration = styled.div`
  column-width: 200px;
`;

export interface ArtistProps {
  display?: boolean;
}

export const Artist = styled.div<ArtistProps>`
  column-width: 250px;
  width: 280px;
  display: ${({ display }) => (!display ? "block" : "none")};
`;
export const Album = styled.div`
  margin-right: 100px;
  column-width: 250px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const ContainerMusic = styled.div`
  display: grid;
  grid-auto-rows: 2em;
  justify-content: center;
`;

export default ColumnTracksPlaylists;
