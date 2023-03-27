import Album from "./Album";
import Artist from "./Artist";
import MediaSource from "./MediaSource";
export default class Track {
    id: string;
    source: MediaSource | null;
    artist: Artist | null;
    album: Album | null;
    trackArtist: string;
    duration: number;
    title: string;
    disc: number;
    number: number;
    type: string;
    isPlaying: boolean;
    isPaused: boolean;
    isLoved: boolean;
    position: number;
    buffered: any;
    showActions: boolean;
    date: Date | null;
    nowPlaying: boolean;
    image: string;
    trackGain: number;
    constructor(json: any);
    url(): string;
    toJSON(): string;
    private guessBySource;
}
