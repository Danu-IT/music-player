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
    tolal: number;
    tracks?: IUserPlaylistTracks;
}

export interface IUserPlaylistTracks {
    items: IUserPlaylistTrackHaracter[];
}

export interface IUserPlaylistTrackHaracter {
    added_at: string;
    track: IUserPlaylistTrack;
}

export interface IUserPlaylistTrack {
    duration_ms: number;
    artist: IUserPlaylistTrackArtist[];
    albun: IUserPlaylistTrackAlbum;
}

export interface IUserPlaylistTrackAlbum {
    id: string;
    name: string;
}

export interface IUserPlaylistTrackArtist {
    id: string;
    name: string;
}

interface IUserImage {
    url: string;
}