var MusicDBObject;
(function (MusicDBObject) {
    var Artist = (function () {
        function Artist(json) {
            this.name = json.name;
            this.bio = json.bio;
        }
        Artist.prototype.url = function () {
            return "/" + encodeURIComponent(this.name);
        };
        return Artist;
    }());
    MusicDBObject.Artist = Artist;
})(MusicDBObject || (MusicDBObject = {}));
