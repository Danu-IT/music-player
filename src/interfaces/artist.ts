import { IImage } from './user';

export interface IArtists {
    artists: IArtist[],
}

export interface IArtist {
    followers: { total: number },
    name: string,
    id: string,
    type: string,
    images: IImage[]
}