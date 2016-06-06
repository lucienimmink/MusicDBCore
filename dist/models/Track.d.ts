import Artist from "./Artist";
import Album from "./Album";
import MediaSource from "./MediaSource";
export default class Track {
    id: string;
    source: MediaSource;
    artist: Artist;
    album: Album;
    duration: number;
    title: string;
    disc: number;
    constructor(json: any);
    private guessBySource(json);
    url(): string;
}
