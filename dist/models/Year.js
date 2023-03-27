export default class Year {
    constructor(album) {
        this.albums = [];
        this.sanitize = (year) => {
            let yearInt = parseInt(year, 10);
            if (isNaN(yearInt)) {
                yearInt = 0;
            }
            return yearInt;
        };
        if (album.year) {
            this.year = this.sanitize(album.year);
        }
    }
}
