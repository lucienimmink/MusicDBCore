declare namespace MusicDBObject {
    class Track implements ObjectWithUrl {
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
}
