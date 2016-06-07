
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import Letter from './models/Letter';

const VERSION: string = "1.0.0";

export class musicdbcore {

    protected artists: INameToValueMap = {};
    protected albums: INameToValueMap = {};
    protected tracks: INameToValueMap = {};
    protected letters: INameToValueMap = {};

    protected totals: any = {
        artists: 0,
        albums: 0,
        tracks: 0,
        playingTime: 0
    }

    constructor() {
        console.log(`Core init ${VERSION}`);
    }
    private parseLine(line: any): void {
        let letter = new Letter(line);
        if (this.letters[letter.letter]) {
            letter = this.letters[letter.letter];
        } else {
            this.letters[letter.letter] = letter;
        }

        let artist = new Artist(line);
        if (this.artists[artist.sortName]) {
            artist = this.artists[artist.sortName];
        } else {
            letter.artists.push(artist);
            artist.letter = letter;
            this.artists[artist.sortName] = artist;
            this.totals.artists++;
        }

        let album = new Album(line);
        if (this.albums[album.sortName]) {
            album = this.albums[album.sortName];
        } else {
            album.artist = artist;
            artist.albums.push(album);
            this.albums[album.sortName] = album;
            this.totals.albums++;
        }

        let track = new Track(line);
        this.tracks[track.id] = track;
        this.totals.tracks++;
        this.totals.playingTime += track.duration;

        track.artist = artist;
        track.album = album;

        album.tracks.push(track);
    };
    parseSourceJson(json: any): void {
        if (json.length) {
            // this json is flat; all lines in the json is 1 track
            console.log(`this json has ${json.length} records`);
            for (let line of json) {
                this.parseLine(line);
            }
        } else if (json.tree) {
            // this json is build up as an object; with nested data
            for (let l in json.tree) {
                let letter: Letter = new Letter(json.tree[l]);
                // add letter
                if (this.letters[letter.letter]) {
                    letter = this.letters[letter.letter];
                } else {
                    this.letters[letter.letter] = letter;
                }
                for (let a in json.tree[l].artists) {
                    // add artist in letter
                    let artist: Artist = new Artist(json.tree[l].artists[a]);
                    if (this.artists[artist.sortName]) {
                        artist = this.artists[artist.sortName];
                    } else {
                        letter.artists.push(artist);
                        artist.letter = letter;
                        this.artists[artist.sortName] = artist;
                        this.totals.artists++;
                    }
                    for (let aa in json.tree[l].artists[a].albums) {
                        // add albums in artist in letter
                        let album: Album = new Album(json.tree[l].artists[a].albums[aa]);
                        if (this.albums[album.sortName]) {
                            album = this.albums[album.sortName];
                        } else {
                            album.artist = artist;
                            artist.albums.push(album);
                            this.albums[album.sortName] = album;
                            this.totals.albums++;
                        }
                        for (let t in json.tree[l].artists[a].albums[aa].tracks) {
                            let track:Track = new Track(json.tree[l].artists[a].albums[aa].tracks[t]);
                            this.tracks[track.id] = track;
                            this.totals.tracks++;
                            this.totals.playingTime += track.duration;

                            track.artist = artist;
                            track.album = album;

                            album.tracks.push(track);
                        }
                    }
                }
            }
        }
    }
}