(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _ = require("lodash");
    var Letter = (function () {
        function Letter(json) {
            this.artists = [];
            this.letter = this.getFirstLetterOf(json.letter || json.albumArtist || json.artist);
            this.escapedLetter = encodeURIComponent(this.letter);
        }
        ;
        Letter.prototype.url = function () {
            return "/letter/" + this.escapedLetter + "/";
        };
        ;
        Letter.prototype.getFirstLetterOf = function (name) {
            return this.stripFromName(name, 'the ');
        };
        ;
        Letter.prototype.stripFromName = function (name, strip) {
            var s = strip.toUpperCase();
            var f = name.toUpperCase();
            f = _.trim(f);
            f = _.trimStart(f, s);
            return this.groupIfSpecialChar(_.split(f, '', 1)[0]);
        };
        Letter.prototype.groupIfSpecialChar = function (c) {
            if (_.indexOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '[', ']', '{', '}', '_', '-', '.'], c) !== -1) {
                return '#';
            }
            return c;
        };
        return Letter;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Letter;
});
