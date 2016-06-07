(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './models/Artist', './models/Album', './models/Track', './models/Letter'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Artist_1 = require('./models/Artist');
    var Album_1 = require('./models/Album');
    var Track_1 = require('./models/Track');
    var Letter_1 = require('./models/Letter');
    var VERSION = "1.0.0";
    var musicdbcore = (function () {
        function musicdbcore() {
            this.artists = [];
            this.albums = [];
            this.tracks = [];
            this.letters = [];
            this.totals = {
                artists: 0,
                albums: 0,
                tracks: 0,
                playingTime: 0
            };
            console.log("Core init " + VERSION);
        }
        musicdbcore.prototype.parseSourceJson = function (json) {
            console.log("this json has " + json.length + " records");
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var line = json_1[_i];
                // TODO: include logic for compilation tracks (artist.name !== artist.albumArtist)
                var letter = new Letter_1.default(line);
                if (this.letters[letter.letter]) {
                    letter = this.letters[letter.letter];
                }
                else {
                    this.letters[letter.letter] = letter;
                }
                var artist = new Artist_1.default(line);
                if (this.artists[artist.sortName]) {
                    artist = this.artists[artist.sortName];
                }
                else {
                    letter.artists.push(artist);
                    artist.letter = letter;
                    this.artists[artist.sortName] = artist;
                    this.totals.artists++;
                }
                var album = new Album_1.default(line);
                if (this.albums[album.sortName]) {
                    album = this.albums[album.sortName];
                }
                else {
                    album.artist = artist;
                    artist.albums.push(album);
                    this.albums[album.sortName] = album;
                    this.totals.albums++;
                }
                var track = new Track_1.default(line);
                this.totals.tracks++;
                this.totals.playingTime += track.duration;
                track.artist = artist;
                track.album = album;
                album.tracks.push(track);
            }
        };
        return musicdbcore;
    }());
    exports.musicdbcore = musicdbcore;
});
