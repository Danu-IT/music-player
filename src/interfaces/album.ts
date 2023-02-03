import { IImage, IUserPlaylistTrackHaracter } from './user';
import { IArtist } from './artist';

export interface IAlbums {
  items: IAlbum[];
}

export interface IAlbum {
  id: string;
  images: IImage[];
  name: string;
  release_date: string;
  artists: IArtist[];
  tracks: { items: IUserPlaylistTrackHaracter[] }
}
