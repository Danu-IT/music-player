import { IUserPlaylist } from '../interfaces/user';
import { ArtistsProps } from '../interfaces/utils';

export const countArtistPlaylist = (data: IUserPlaylist | undefined) => {
    let answer: any[] = [];
    data?.tracks?.items.forEach(item => {
        const artists = item.track.artists;
        artists.length > 1 ? artists.forEach(artist => answer.push(artist.id)) : answer.push(artists[0].id)
    })
    return answer.filter((el, id) => answer.indexOf(el) === id).length
}

export const countAllDuration = (data: IUserPlaylist | undefined) => {
    let duration: number = 0;
    data?.tracks?.items.forEach(item => {
        duration += item.track.duration_ms
    })
    return calcTime(duration, true);
}

export const calcTime = (data: number, all: boolean = false) => {
    let seconds: string | number = String((data / 1000) % 60),
        minutes: string | number = String((data / (1000 * 60)) % 60),
        hours: string | number = String((data / (1000 * 60 * 60)) % 24);

    hours = (+hours < 10) ? "0" + hours : hours;
    const absoluteHours = Math.floor(+hours);
    minutes = (+minutes < 10) ? "0" + minutes : minutes;
    const absoluteMinutes = Math.floor(+minutes);
    seconds = (+seconds < 10) ? "0" + Math.floor(+seconds) : Math.floor(+seconds);
    if (all) {
        return `${absoluteHours}h ${absoluteMinutes}mins`
    }

    return `0${absoluteMinutes}:${seconds}`
}

export const calcArtist = (artists: ArtistsProps[]) => {
    let answer = '';
    artists.forEach(artist => {
        if (artists.length > 1) {
            answer += artist.name + ', '
        } else {
            answer += artist.name
        }
    })
    return artists.length > 1 ? answer.slice(0, answer.length - 2) : answer;
}


export const separation = (num: number | undefined) => {
    return new Intl.NumberFormat('ru-RU').format(Number(num));
};