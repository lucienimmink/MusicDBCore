import Artist from "./Artist";
import Track from "./Track";
export default class Album {
    name: string;
    sortName: string;
    escapedName: string;
    artist: Artist;
    tracks: Track[];
    discs: any[];
    sortedDiscs: any[];
    year: any;
    art: string;
    modified: number;
    type: string;
    isContinues: boolean;
    constructor(json: any);
    url(): string;
}
