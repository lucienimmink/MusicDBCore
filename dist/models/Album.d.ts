import Artist from "./Artist";
import Track from "./Track";
export default class Album {
    name: string;
    sortName: string;
    escapedName: string;
    artist: Artist | null;
    tracks: Track[];
    discs: any[];
    sortedDiscs: any[];
    year: any;
    art: string;
    modified: number;
    type: string;
    isContinues: boolean;
    albumGain: number;
    mbid: string;
    constructor(json: any);
    url(): string;
}
