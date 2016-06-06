/// <reference path="MusicDBObject.ts" />
var MusicDBObject;
(function (MusicDBObject) {
    var Album = (function () {
        function Album(json) {
            this.name = json.album;
            this.year = json.year;
        }
        Album.prototype.url = function () {
            return "/" + encodeURIComponent(this.artist.name) + "/" + encodeURIComponent(this.name);
        };
        return Album;
    }());
    MusicDBObject.Album = Album;
})(MusicDBObject || (MusicDBObject = {}));
