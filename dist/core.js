(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MusicDBCore = (function () {
        function MusicDBCore() {
            this.VERSION = "1.0.0";
            console.log('Core init', VERSION);
        }
        MusicDBCore.prototype.setSourceJson = function (json) {
            console.log("this json has " + json.length + " records");
        };
        return MusicDBCore;
    }());
    exports.MusicDBCore = MusicDBCore;
});