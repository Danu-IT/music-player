export interface Player {
    repeat_state: string;
    shuffle_state: boolean;
    is_playing: boolean;
    progress_ms: number;
    track_number: number;
    item: {
        id: string; 
    }

}