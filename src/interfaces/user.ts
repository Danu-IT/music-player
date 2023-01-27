export interface IUser {
    display_name: string;
    country: string;
    email: string;
    image: IUserImage;
}

interface IUserImage {
    url: string;
}