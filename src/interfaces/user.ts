export interface IUser {
    display_name: string;
    country: string;
    email: string;
    image: IUserImage;
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
    images: IUserImage[];
}

export interface IUserPlaylistTrackArtist {
    id: string;
    name: string;
}

interface IUserImage {
    url: string;
}