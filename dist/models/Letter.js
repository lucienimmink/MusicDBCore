import { normalizeSync } from "diacritics-normalizr";
export default class Letter {
    constructor(json) {
        this.artists = [];
        this.active = false;
        if (json.album && json.title) {
            this.letter =
                json.letter ||
                    this.getFirstLetterOf(json.albumArtist || json.albumartist || json.artist);
            if (this.letter === "1") {
                this.letter = "#";
            }
            this.escapedLetter = encodeURIComponent(this.letter);
            if (this.letter === "#") {
                this.escapedLetter = "_";
            }
        }
    }
    url() {
        return `/letter/${this.escapedLetter}/`;
    }
    sortArtistsBy(sortkey = "sortName", direction = "asc") {
        if (sortkey === "albums") {
            this.artists.sort((a, b) => {
                if (a.albums.length > b.albums.length) {
                    return direction === "asc" ? -1 : 1;
                }
                else if (a.albums.length < b.albums.length) {
                    return direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        else {
            const enCollator = new Intl.Collator('en');
            this.artists.sort((a, b) => {
                let aSorter;
                let bSorter;
                if (sortkey.indexOf(".") !== -1) {
                    const sorter = sortkey.split(".");
                    aSorter = a[sorter[0]][sorter[1]];
                    bSorter = b[sorter[0]][sorter[1]];
                }
                else {
                    aSorter = a[sortkey].toUpperCase();
                    bSorter = b[sortkey].toUpperCase();
                }
                const output = enCollator.compare(aSorter, bSorter);
                return direction === "asc" ? output : output * -1;
            });
        }
    }
    sortAndReturnArtistsBy(sortkey = "name", direction = "asc") {
        this.sortArtistsBy(sortkey, direction);
        return this.artists;
    }
    getFirstLetterOf(name) {
        let ret = "";
        ret = this.stripFromName(name, ["the ", '"', "a "]);
        // now group the 1st char if it is a 'special char'
        return this.groupIfSpecialChar(ret.substr(0, 1));
    }
    stripFromName(name, strip) {
        let f = name ? name.toUpperCase() : "";
        f = f.trim();
        strip.forEach(str => {
            const s = str.toUpperCase();
            if (f.indexOf(s) === 0) {
                f = f.substring(s.length);
            }
        });
        return normalizeSync(f);
    }
    groupIfSpecialChar(c) {
        if ([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "_",
            "-",
            "."
        ].indexOf(c) !== -1) {
            return "#";
        }
        return c;
    }
}
