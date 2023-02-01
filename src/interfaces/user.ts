export interface IUser {
  display_name: string;
  country: string;
  email: string;
  image: IImage;
}

export interface IUserPlaylist {
  images: any;
  name: string;
  id: string;
  tracks?: IUserPlaylistTracks;
  total?: number;
}

export interface IUserPlaylistTracks {
  items: IUserPlaylistTrackHaracter[];
  total?: number;
}

export interface IUserPlaylistTrackHaracter {
  added_at: string;
  track: IUserPlaylistTrack;
  tracks: IUserPlaylistTrack[];
}

export interface IUserPlaylistTrack {
  duration_ms: number;
  artists: IUserPlaylistTrackArtist[];
  album: IUserPlaylistTrackAlbum;
  name: string;
}

export interface IUserPlaylistTrackAlbum {
  id: string;
  name: string;
  images: IImage[];
}

export interface IUserPlaylistTrackArtist {
  id: string;
  name: string;
}

export interface IImage {
  url: string;
}
