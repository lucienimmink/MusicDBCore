export default class Year {
    year = 0;
    albums = [];
    constructor(album) {
        if (album.year) {
            this.year = this.sanitize(album.year);
        }
    }
    sanitize = (year) => {
        let yearInt = parseInt(year, 10);
        if (isNaN(yearInt)) {
            yearInt = 0;
        }
        return yearInt;
    };
}
