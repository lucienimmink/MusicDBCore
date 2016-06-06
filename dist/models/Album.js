(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Album = (function () {
        function Album(json) {
            this.tracks = [];
            this.name = json.album;
            this.sortName = this.name.toUpperCase();
            this.year = json.year;
        }
        Album.prototype.url = function () {
            return "/" + encodeURIComponent(this.artist.name) + "/" + encodeURIComponent(this.name);
        };
        return Album;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Album;
});
