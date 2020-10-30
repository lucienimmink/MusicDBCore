import Album from "./models/Album";
import Artist from "./models/Artist";
import Letter from "./models/Letter";
import Track from "./models/Track";
export declare class musicdbcore {
    artists: any;
    albums: any;
    tracks: any;
    letters: any;
    years: any;
    sortedLetters: Letter[];
    sortedAlbums: Album[];
    isCoreParsed: boolean;
    totals: any;
    private latestAdditions;
    private search;
    constructor();
    resetCollection(): void;
    parseSourceJson(json: any, isFlacSupported?: boolean): void;
    getTrackByArtistAndName(artistName: string, trackName: string): Track;
    getTrackById(id: string): Track;
    getArtistByName(artistName: string): Artist;
    getAlbumByArtistAndName(artist: Artist, albumName: string): Album;
    getTrackByAlbumAndName(album: Album, trackName: string): Track;
    artistsList(): Artist[];
    trackList(): Track[];
    searchArtist(query: string): any;
    searchAlbum(query: string): any;
    searchTrack(query: string): any;
    getLatestAdditions(amount?: number): Album[];
    getNextAlbum(album: Album): Album;
    getNextArtist(artist: Artist): Artist;
    getNextLetter(letter: Letter): Letter;
    private instanceIfPresent;
    private handleLetter;
    private handleArtist;
    private handleAlbum;
    private handleTrack;
    private parseLine;
    private parseTree;
}
