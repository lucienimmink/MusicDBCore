import Album from "./Album";
import Artist from "./Artist";
import MediaSource from "./MediaSource";
export default class Track {
    id: string;
    source: MediaSource;
    artist: Artist;
    album: Album;
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
    date: Date;
    nowPlaying: boolean;
    image: string;
    trackGain: number;
    constructor(json: any);
    url(): string;
    toJSON(): string;
    private guessBySource;
}
