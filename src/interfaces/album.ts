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

export interface IMyAlbums {
  items: IMyAlbum[];
}

export interface IMyAlbum {
  added_at: string;
  album: IAlbum;
}

export interface IMySavedTracks {
  items: IMySavedTrack[]
}

interface IMySavedTrack {
  track: {
    id: string;
    name: string;
    duration_ms: number;
    album: {
      name: string;
    }
  }
}