import Artist from "./Artist";
import Track from "./Track";
export default class Album {
    name: string;
    artist: Artist;
    tracks: Array<Track>;
    year: number;
    art: string;
    constructor(json: any);
    url(): string;
}
