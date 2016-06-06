var MusicDBObject;
(function (MusicDBObject) {
    var Track = (function () {
        function Track(json) {
            this.id = json.id;
            this.duration = json.duration;
            this.title = json.title;
            this.disc = json.disc || this.guessBySource(json);
        }
        Track.prototype.guessBySource = function (json) {
            var source = new MusicDBObject.MediaSource(json);
            var guessable = source.url;
            var discs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            for (var _i = 0, discs_1 = discs; _i < discs_1.length; _i++) {
                var i = discs_1[_i];
                if (guessable.indexOf(" - " + i + ".") !== -1 || guessable.indexOf("(" + i + ") - ") !== -1 || guessable.indexOf("CD" + i) !== -1 || guessable.indexOf("\\" + i + "-") !== -1) {
                    return i;
                }
            }
            return 1;
        };
        Track.prototype.url = function () {
            return "/" + encodeURIComponent(this.artist.name) + "/" + encodeURIComponent(this.album.name) + "/" + encodeURIComponent(this.title);
        };
        return Track;
    }());
    MusicDBObject.Track = Track;
})(MusicDBObject || (MusicDBObject = {}));
