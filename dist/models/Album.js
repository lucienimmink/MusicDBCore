export default class Album {
    constructor(json) {
        this.tracks = [];
        this.discs = [];
        this.sortedDiscs = [];
        this.modified = 0;
        this.isContinues = true;
        if (json.album && json.title) {
            this.name = json.album;
            this.sortName = this.name.toUpperCase();
            this.escapedName = encodeURIComponent(this.sortName);
            this.year = json.year;
            this.modified = json.modified;
            // strip month/day from universal date strings
            if (this.year && this.year.indexOf("-") !== -1) {
                this.year = this.year.split("-")[0];
            }
        }
    }
    url() {
        // tslint:disable-next-line:max-line-length
        return `/letter/${this.artist.letter.escapedLetter}/artist/${this.artist.escapedName}/album/${this.escapedName}`;
    }
}
