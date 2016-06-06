
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import Letter from './models/Letter';

export class musicdbcore {
    private const VERSION:string = "1.0.0"; 

    protected artists:Array<Artist> = [];
    protected albums:Array<Album> = [];
    protected tracks:Array<Track> = [];
    protected letters:Array<Letter> = [];

    protected totals:any = {
        artists: 0,
        albums: 0,
        tracks: 0,
        playingTime: 0
    } 

    constructor () {
        console.log(`Core init ${this.VERSION}`);
    }
    parseSourceJson(json:any) {
        console.log(`this json has ${json.length} records`);
        for (let line of json) {
            // TODO: include logic for compilation tracks (artist.name !== artist.albumArtist)
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
            this.totals.tracks++;
            this.totals.playingTime += track.duration;

            track.artist = artist;
            track.album = album;

            album.tracks.push(track);
            
        }
    }
}