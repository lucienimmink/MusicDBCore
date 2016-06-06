/// <reference path="MusicDBObject.d.ts" />
declare namespace MusicDBObject {
    class Album implements ObjectWithUrl {
        name: string;
        artist: Artist;
        tracks: Array<any>;
        year: number;
        art: string;
        constructor(json: any);
        url(): string;
    }
}
