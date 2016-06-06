(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./MediaSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MediaSource_1 = require("./MediaSource");
    var Track = (function () {
        function Track(json) {
            this.id = json.id;
            this.duration = json.duration;
            this.title = json.title;
            this.disc = json.disc || this.guessBySource(json);
        }
        Track.prototype.guessBySource = function (json) {
            var source = new MediaSource_1.default(json);
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Track;
});
