export default class Album {
    name = "";
    sortName = "";
    escapedName = "";
    artist = null;
    tracks = [];
    discs = [];
    sortedDiscs = [];
    year;
    art = "";
    modified = 0;
    type = "";
    isContinues = true;
    albumGain = 0;
    mbid = "";
    constructor(json) {
        if (json.album && json.title) {
            this.name = json.album;
            this.sortName = this.name.toUpperCase();
            this.escapedName = encodeURIComponent(this.sortName);
            this.year = json.year;
            this.modified = json.modified;
            this.albumGain = json.albumgain || 0;
            this.mbid = json.albummbid || "";
            // strip month/day from universal date strings
            if (this.year && this.year.indexOf("-") !== -1) {
                this.year = this.year.split("-")[0];
            }
        }
    }
    url() {
        return `/letter/${this.artist?.letter?.escapedLetter}/artist/${this.artist?.escapedName}/album/${this.escapedName}`;
    }
}
