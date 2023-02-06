import { FC } from "react";
import { userAPI } from "../services/UserService";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { receiveCurrentUserPlaylists } from "../store/slices/UserSlice";
import { useEffect } from "react";
import BaseContainer from "../components/BaseContainer";
import Row from "../components/Row";
import List from "../components/List";
import PlaylistItem from "../components/Playlists/PlaylistItem/PlaylistItem";
import { IUserPlaylist } from "../interfaces/user";
import AlbumItem from "../components/Albums/AlbumItem/AlbumItem";
import ArtistItem from "../components/Artists/ArtistItem/ArtistItem";

interface PlaylistsProps {}

const Library: FC<PlaylistsProps> = () => {
  const { currentUserPlaylists } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const { data: currentPlaylists } = userAPI.useCurrentUserPlaylistsQuery(null);
  const { data: currentAlbums } = userAPI.useGetUsersSavedAlbumsQuery(null);
  const { data: currentArtists } = userAPI.useGetFollowedArtistsQuery(null);

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

  useEffect(() => {
    currentPlaylists && addCurrentUserPlaylists(currentPlaylists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylists]);

  return (
    <BaseContainer>
      {/* <Navigate content={privateRoutes.slice(7, 10)}></Navigate> */}
      <Row title="My Playlists">
        <List
          items={currentUserPlaylists}
          flex={true}
          renderItem={(item: IUserPlaylist) => (
            <PlaylistItem
              key={item.id}
              playlist={item}></PlaylistItem>
          )}
        />
      </Row>
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
              <ArtistItem artist={item}></ArtistItem>
            )}></List>
        </Row>
      )}
    </BaseContainer>
  );
};

export default Library;
