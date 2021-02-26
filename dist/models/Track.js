import MediaSource from "./MediaSource";
export default class Track {
    constructor(json) {
        this.isPlaying = false;
        this.isPaused = false;
        this.isLoved = false;
        this.position = 0;
        this.buffered = {
            start: 0,
            end: 0,
        };
        this.showActions = false;
        this.image = "";
        if (json.album && json.title) {
            this.id = json.id;
            this.duration = json.seconds
                ? json.seconds * 1000
                : json.duration && !isNaN(json.duration)
                    ? json.duration
                    : 0;
            this.title = json.title;
            this.source = new MediaSource(json);
            this.disc = json.disc || this.guessBySource(json);
            this.number = json.number;
            this.trackArtist = json.artist;
            this.type = json.type || "mp3";
        }
    }
    url() {
        // tslint:disable-next-line:max-line-length
        return `/letter/${this.artist.letter.escapedLetter}/artist/${encodeURIComponent(this.artist.name)}/album/${encodeURIComponent(this.album.name)}/track/${encodeURIComponent(this.title)}`;
    }
    toJSON() {
        return this.id;
    }
    guessBySource(json) {
        const guessable = this.source.url;
        const discs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const i of discs) {
            // tslint:disable-next-line:max-line-length
            if (guessable.indexOf(` - ${i}.`) !== -1 ||
                guessable.indexOf(`(${i}) - `) !== -1 ||
                guessable.indexOf(`CD${i}`) !== -1 ||
                guessable.indexOf(`\\${i}-`) !== -1) {
                return i;
            }
        }
        return 1;
    }
}
