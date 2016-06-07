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
            this.artists = {};
            this.albums = {};
            this.tracks = {};
            this.letters = {};
            this.totals = {
                artists: 0,
                albums: 0,
                tracks: 0,
                playingTime: 0,
                parsingTime: 0
            };
            console.log("Core init " + VERSION);
        }
        musicdbcore.prototype.instanceIfPresent = function (core, key, map, obj, excecuteIfNew) {
            var ret = null;
            if (map[key]) {
                ret = map[key];
            }
            else {
                map[key] = obj;
                ret = obj;
                excecuteIfNew(core);
            }
            return ret;
        };
        musicdbcore.prototype.handleLetter = function (letter) {
            return this.instanceIfPresent(this, letter.letter, this.letters, letter, function (core) { });
        };
        musicdbcore.prototype.handleArtist = function (letter, artist) {
            return this.instanceIfPresent(this, artist.sortName, this.artists, artist, function (core) {
                letter.artists.push(artist);
                artist.letter = letter;
                core.totals.artists++;
            });
        };
        musicdbcore.prototype.handleAlbum = function (artist, album) {
            return this.instanceIfPresent(this, album.sortName, this.albums, album, function (core) {
                album.artist = artist;
                artist.albums.push(album);
                core.totals.albums++;
            });
        };
        musicdbcore.prototype.handleTrack = function (artist, album, track) {
            return this.instanceIfPresent(this, track.id, this.tracks, track, function (core) {
                core.totals.tracks++;
                core.totals.playingTime += track.duration;
                track.artist = artist;
                track.album = album;
                album.tracks.push(track);
            });
        };
        musicdbcore.prototype.parseLine = function (line) {
            var letter = new Letter_1.default(line);
            letter = this.handleLetter(letter);
            var artist = new Artist_1.default(line);
            artist = this.handleArtist(letter, artist);
            var album = new Album_1.default(line);
            album = this.handleAlbum(artist, album);
            var track = new Track_1.default(line);
            track = this.handleTrack(artist, album, track);
        };
        ;
        musicdbcore.prototype.parseTree = function (tree) {
            for (var l in tree) {
                var letter = new Letter_1.default(tree[l]);
                letter = this.handleLetter(letter);
                for (var a in tree[l].artists) {
                    // add artist in letter
                    var artist = new Artist_1.default(tree[l].artists[a]);
                    artist = this.handleArtist(letter, artist);
                    for (var aa in tree[l].artists[a].albums) {
                        // add albums in artist in letter
                        var album = new Album_1.default(tree[l].artists[a].albums[aa]);
                        album = this.handleAlbum(artist, album);
                        for (var t in tree[l].artists[a].albums[aa].tracks) {
                            var track = new Track_1.default(tree[l].artists[a].albums[aa].tracks[t]);
                            track = this.handleTrack(artist, album, track);
                        }
                    }
                }
            }
        };
        ;
        musicdbcore.prototype.parseSourceJson = function (json) {
            var start = new Date().getTime();
            if (json.length) {
                // this json is flat; all lines in the json is 1 track
                console.log("this json has " + json.length + " records");
                for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                    var line = json_1[_i];
                    this.parseLine(line);
                }
            }
            else if (json.tree) {
                // this json is build up as an object; with nested data
                this.parseTree(json.tree);
            }
            this.totals.parsingTime += (new Date().getTime() - start);
        };
        return musicdbcore;
    }());
    exports.musicdbcore = musicdbcore;
});
