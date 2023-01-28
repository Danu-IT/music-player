export interface IUser {
    display_name: string;
    country: string;
    email: string;
    image: IUserImage;
}

export interface IUserPlaylists {
    items: IUserPlaylist[]
}

export interface IUserPlaylist {
    images: IUserImage[];
    name: string;
    id: string;
    tracks: any;
}

interface IUserImage {
    url: string;
}