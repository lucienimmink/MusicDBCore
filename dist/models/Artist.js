(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Artist = (function () {
        function Artist(json) {
            this.albums = [];
            this.name = json.name || json.artist;
            this.albumArtist = json.albumartist || json.albumArtist;
            this.sortName = (this.albumArtist) ? this.albumArtist.toUpperCase() : (json.sortName) ? json.sortName.toUpperCase() : this.name.toUpperCase();
            this.bio = json.bio;
        }
        Artist.prototype.url = function () {
            return "/letter/" + this.letter.escapedLetter + "/artist/" + encodeURIComponent(this.albumArtist || this.name) + "/";
        };
        return Artist;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Artist;
});
