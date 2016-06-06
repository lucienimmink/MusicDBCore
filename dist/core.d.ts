import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import Letter from './models/Letter';
export declare class musicdbcore {
    private VERSION;
    protected artists: Array<Artist>;
    protected albums: Array<Album>;
    protected tracks: Array<Track>;
    protected letters: Array<Letter>;
    protected totals: any;
    constructor();
    parseSourceJson(json: any): void;
}
