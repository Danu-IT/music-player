import { FC } from "react";
import { userAPI } from "../../services/UserService";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { receiveCurrentUserPlaylists } from "../../store/slices/UserSlice";
import { useEffect } from "react";
import BaseContainer from "../../components/BaseContainer";
import Row, { Title } from "../../components/Row";
import List from "../../components/List";
import PlaylistItem from "../Playlist/components/PlaylistItem/PlaylistItem";
import { IUserPlaylist } from "../../interfaces/user";
import AlbumItem from "../Album/components/AlbumItem/AlbumItem";
import ArtistItem from "../Artist/components/ArtistItem/ArtistItem";
import styled from "styled-components";
import Track from "../../components/UI/Track/Track";
import {
  Album,
  Artist,
  Duration,
  Header,
  Number,
  Song,
} from "../../components/Columns/ColumnTracksPlaylists/ColumnTracksPlaylists";

interface PlaylistsProps {}

const Library: FC<PlaylistsProps> = () => {
  const { currentUserPlaylists, currentUser } = useAppSelector(
    (state) => state.userSlice
  );
  const dispatch = useAppDispatch();

  const { data: currentPlaylists } = userAPI.useCurrentUserPlaylistsQuery(null);
  const { data: currentAlbums } = userAPI.useGetUsersSavedAlbumsQuery(null);
  const { data: currentArtists } = userAPI.useGetFollowedArtistsQuery(null);
  const { data: savedTracks } = userAPI.useGetUsersSavedTracksQuery(null);

  const [create] = userAPI.usePostUserPlaylistMutation();

  const addCurrentUserPlaylists = ({ items }: any) => {
    const playlists = items.map((item: any) => {
      const playlist = {
        id: item.id,
        name: item.name,
        images: item.images[0]?.url,
        total: item.tracks.total,
      };
      return playlist;
    });
    dispatch(receiveCurrentUserPlaylists(playlists));
  };

  const createPlaylist = () => currentUser && create(currentUser.id);

  useEffect(() => {
    currentPlaylists && addCurrentUserPlaylists(currentPlaylists);
  }, [currentPlaylists]);

  return (
    <BaseContainer>
      <Favorite>
        <Title>Favorite tracks</Title>
        <CustomHeader>
          <Number>#</Number>
          <Song>Songs</Song>
          <Duration>Duration</Duration>
          <Artist>Artist</Artist>
          <Album>Album</Album>
        </CustomHeader>
        {savedTracks?.items.map((el, i) => (
          <Track
            like={true}
            track={el.track}
            index={i + 1}
            add={true}></Track>
        ))}
      </Favorite>
      <RowCustom title="My Playlists">
        <Btn onClick={createPlaylist}>+</Btn>
        <List
          items={currentUserPlaylists}
          flex={true}
          renderItem={(item: IUserPlaylist) => (
            <PlaylistItem
              key={item.id}
              playlist={item}></PlaylistItem>
          )}
        />
      </RowCustom>
      {currentAlbums && (
        <Row
          title="My Albums"
          top={true}>
          <List
            items={currentAlbums?.items}
            flex={true}
            renderItem={(item) => (
              <AlbumItem
                key={item.added_at}
                album={item.album}></AlbumItem>
            )}></List>
        </Row>
      )}
      {currentArtists && (
        <Row
          title="My Artist"
          top={true}>
          <List
            items={currentArtists?.artists.items}
            flex={true}
            renderItem={(item) => (
              <ArtistItem
                key={item.id}
                artist={item}></ArtistItem>
            )}></List>
        </Row>
      )}
    </BaseContainer>
  );
};

const Favorite = styled.div`
  margin-bottom: 50px;
`;

const Btn = styled.div`
  cursor: pointer;
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 10px 15px;
  border-radius: 50%;
  margin: 15px 0;
  position: absolute;
  top: -18px;
  left: 150px;
`;
const CustomHeader = styled(Header)`
  margin: 30px 0;
`;

export const RowCustom = styled(Row)`
  position: relative;
`;

export default Library;
