(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var musicdbcore = (function () {
        function musicdbcore() {
            this.VERSION = "1.0.0";
            console.log("Core init " + this.VERSION);
        }
        musicdbcore.prototype.setSourceJson = function (json) {
            console.log("this json has " + json.length + " records");
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var line = json_1[_i];
                var artist = new MusicDBObject.Artist(line);
                var album = new MusicDBObject.Album(line);
                var track = new MusicDBObject.Track(line);
                album.artist = artist;
                track.artist = artist;
                track.album = album;
                console.log(track.url());
            }
        };
        return musicdbcore;
    }());
    exports.musicdbcore = musicdbcore;
});
