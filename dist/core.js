import Album from "./models/Album";
import Artist from "./models/Artist";
import Letter from "./models/Letter";
import Search from "./models/Search";
import Track from "./models/Track";
import Year from "./models/Year";
const VERSION = "1.6.2";
// tslint:disable-next-line:class-name
export class musicdbcore {
    constructor() {
        this.artists = {};
        this.albums = {};
        this.tracks = {};
        this.letters = {};
        this.years = {};
        this.sortedLetters = [];
        this.sortedAlbums = [];
        this.isCoreParsed = false;
        this.totals = {
            artists: 0,
            albums: 0,
            tracks: 0,
            playingTime: 0,
            parsingTime: 0
        };
        this.latestAdditions = [];
        this.search = new Search();
        // tslint:disable-next-line:no-console
        console.info(`Core init ${VERSION}`);
    }
    resetCollection() {
        this.artists = {};
        this.albums = {};
        this.tracks = {};
        this.letters = {};
        this.years = {};
        this.sortedLetters = [];
        this.sortedAlbums = [];
        this.totals = {
            artists: 0,
            albums: 0,
            tracks: 0,
            playingTime: 0,
            parsingTime: 0
        };
        this.latestAdditions = [];
    }
    parseSourceJson(json, isFlacSupported = true) {
        const start = new Date().getTime();
        if (json.length) {
            // this json is flat; all lines in the json is 1 track
            for (const line of json) {
                this.parseLine(line, isFlacSupported);
            }
        }
        else if (json.tree) {
            // this json is build up as an object; with nested data
            this.parseTree(json.tree);
        }
        // sort letters
        const sorted = Object.keys(this.letters).sort((a, b) => {
            return a < b ? -1 : 1;
        });
        const t = [];
        // let core = this;
        sorted.forEach((value, index) => {
            t.push(this.letters[value]);
            this.letters[value].sortAndReturnArtistsBy("name", "asc");
        });
        this.sortedLetters = t;
        // update parsing time
        this.totals.parsingTime += new Date().getTime() - start;
        this.isCoreParsed = true;
    }
    getTrackByArtistAndName(artistName, trackName) {
        const artist = new Artist({ name: artistName, dummy: true });
        const coreArtist = this.artists[artist.sortName];
        let ret = null;
        if (coreArtist) {
            coreArtist.albums.some(album => {
                album.tracks.some(track => {
                    if (track.title &&
                        track.title.toLowerCase() === trackName.toLowerCase()) {
                        if (!ret) {
                            ret = track;
                        }
                        return true; // break out of the some itterator
                    }
                });
            });
        }
        return ret;
    }
    getTrackById(id) {
        let ret = new Track({});
        this.tracks.forEach(track => {
            if (track.id === id) {
                ret = track;
            }
        });
        return ret;
    }
    getArtistByName(artistName) {
        const artist = new Artist({ name: artistName, dummy: true });
        const coreArtist = this.artists[artist.sortName];
        return coreArtist;
    }
    getAlbumByArtistAndName(artist, albumName) {
        let ret = null;
        artist.albums.forEach(album => {
            // console.info(album.name, albumName);
            if (album.name.toLowerCase() === albumName.toLowerCase()) {
                ret = album;
            }
        });
        return ret;
    }
    getTrackByAlbumAndName(album, trackName) {
        let ret = null;
        album.tracks.forEach(track => {
            if (track.title.toLowerCase() === trackName.toLowerCase()) {
                ret = track;
            }
        });
        return ret;
    }
    artistsList() {
        const ret = [];
        const sorted = Object.keys(this.artists).sort((a, b) => {
            return a < b ? -1 : 1;
        });
        sorted.forEach((value, index) => {
            ret.push(this.artists[value]);
        });
        return ret;
    }
    trackList() {
        const ret = [];
        const sorted = Object.keys(this.tracks).sort((a, b) => {
            return a < b ? -1 : 1;
        });
        sorted.forEach((value, index) => {
            ret.push(this.tracks[value]);
        });
        return ret;
    }
    searchArtist(query) {
        return this.search.doSearch({ query, list: this.artistsList() });
    }
    searchAlbum(query) {
        return this.search.doSearch({ query, list: this.sortedAlbums });
    }
    searchTrack(query) {
        return this.search.doSearch({
            query,
            keys: ["title"],
            list: this.trackList()
        });
    }
    getLatestAdditions(amount = 14) {
        if (this.latestAdditions.length !== 0) {
            return this.latestAdditions;
        }
        this.sortedAlbums.sort((a, b) => {
            if (a.modified > b.modified) {
                return -1;
            }
            else if (a.modified < b.modified) {
                return 1;
            }
            else {
                return 0;
            }
        });
        this.latestAdditions = this.sortedAlbums.splice(0, amount);
        return this.latestAdditions;
    }
    getNextAlbum(album) {
        const artist = album.artist;
        const albumIndex = artist.albums.indexOf(album);
        let nextAlbum = artist.albums[albumIndex + 1];
        if (!nextAlbum) {
            // get next artist
            const nextArtist = this.getNextArtist(artist);
            nextAlbum = nextArtist.albums[0];
        }
        return nextAlbum;
    }
    getNextArtist(artist) {
        const letter = artist.letter;
        const artistIndex = letter.artists.indexOf(artist);
        let nextArtist = letter.artists[artistIndex + 1];
        if (!nextArtist) {
            const nextLetter = this.getNextLetter(letter);
            nextArtist = nextLetter.artists[0];
        }
        return nextArtist;
    }
    getNextLetter(letter) {
        const letterIndex = this.sortedLetters.indexOf(letter);
        let nextLetter = this.sortedLetters[letterIndex + 1];
        if (!nextLetter) {
            nextLetter = this.sortedLetters[0];
        }
        return nextLetter;
    }
    instanceIfPresent(core, key, map, obj, excecuteIfNew) {
        let ret = null;
        if (map[key]) {
            ret = map[key];
        }
        else {
            map[key] = obj;
            ret = obj;
            excecuteIfNew(core);
        }
        return ret;
    }
    handleLetter(letter) {
        return this.instanceIfPresent(this, letter.letter, this.letters, letter, (core) => {
            return;
        });
    }
    handleArtist(letter, artist) {
        return this.instanceIfPresent(this, artist.sortName, this.artists, artist, (core) => {
            letter.artists.push(artist);
            artist.letter = letter;
            core.totals.artists++;
        });
    }
    handleAlbum(artist, album, isFlacSupported = true) {
        return this.instanceIfPresent(this, artist.sortName + "|" + album.sortName, this.albums, album, (core) => {
            if ((album.type === "flac" && isFlacSupported) ||
                album.type !== "flac") {
                album.artist = artist;
                artist.albums.push(album);
                artist.sortAndReturnAlbumsBy("year", "asc");
                core.sortedAlbums.push(album);
                core.totals.albums++;
                if (core.years[album.year]) {
                    core.years[album.year].albums.push(album);
                }
                else {
                    const year = new Year(album);
                    year.albums.push(album);
                    core.years[year.year] = year;
                }
            }
        });
    }
    handleTrack(artist, album, track, isFlacSupported = true) {
        return this.instanceIfPresent(this, track.id, this.tracks, track, (core) => {
            album.type =
                album.type && album.type !== track.type ? "mixed" : track.type;
            if ((track.type === "flac" && isFlacSupported) ||
                track.type !== "flac") {
                core.totals.tracks++;
                core.totals.playingTime += track.duration;
                track.artist = artist;
                track.album = album;
                album.tracks.push(track);
                // group by discnumber
                const disc = track.disc;
                if (!album.discs[`disc-${disc}`]) {
                    album.discs[`disc-${disc}`] = [];
                    album.discs[`disc-${disc}`].push(track);
                }
                else {
                    album.discs[`disc-${disc}`].push(track);
                }
                // sort if needed
                album.discs[`disc-${disc}`].sort((a, b) => {
                    if (a.number < b.number) {
                        return -1;
                    }
                    return 1;
                });
                // sort all tracks firstly by disc, then by number
                album.tracks.sort((a, b) => {
                    if (a.disc < b.disc) {
                        return -1;
                    }
                    if (a.disc === b.disc) {
                        if (a.number < b.number) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    return 1;
                });
            }
            else {
                console.warn("skipping flac track, flac is not supported");
            }
        });
    }
    parseLine(line, isFlacSupported = true) {
        let letter = new Letter(line);
        if (letter.letter) {
            letter = this.handleLetter(letter);
        }
        let artist = new Artist(line);
        if (artist.name) {
            artist = this.handleArtist(letter, artist);
        }
        let album = new Album(line);
        if (album.name) {
            album = this.handleAlbum(artist, album, isFlacSupported);
        }
        let track = new Track(line);
        if (track.title) {
            track = this.handleTrack(artist, album, track, isFlacSupported);
        }
    }
    parseTree(tree) {
        // tslint:disable-next-line:forin
        for (const l in tree) {
            let letter = new Letter(tree[l]);
            letter = this.handleLetter(letter);
            // tslint:disable-next-line:forin
            for (const a in tree[l].artists) {
                // add artist in letter
                let artist = new Artist(tree[l].artists[a]);
                artist = this.handleArtist(letter, artist);
                // tslint:disable-next-line:forin
                for (const aa in tree[l].artists[a].albums) {
                    // add albums in artist in letter
                    let album = new Album(tree[l].artists[a].albums[aa]);
                    album = this.handleAlbum(artist, album);
                    // tslint:disable-next-line:forin
                    for (const t in tree[l].artists[a].albums[aa].tracks) {
                        let track = new Track(tree[l].artists[a].albums[aa].tracks[t]);
                        track = this.handleTrack(artist, album, track);
                    }
                }
            }
        }
    }
}
