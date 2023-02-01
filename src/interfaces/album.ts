import { IImage } from './user';

export interface IAlbums {
    items: IAlbum[]
}

export interface IAlbum {
    id: string;
    images: IImage[];
    name: string;
    release_date: string;
    artists: [{ name: string }];
}