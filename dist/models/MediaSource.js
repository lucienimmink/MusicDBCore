(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MediaSource = (function () {
        function MediaSource(json) {
            this.url = json.file || json.url || json.id;
        }
        return MediaSource;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MediaSource;
});
