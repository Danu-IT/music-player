import { IImage } from './user';

export interface IArtist {
    followers: { total: number },
    name: string,
    id: string,
    type: string,
    images: IImage[]
}