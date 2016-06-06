var MusicDBObject;
(function (MusicDBObject) {
    var MediaSource = (function () {
        function MediaSource(json) {
            this.url = json.file || json.url;
        }
        return MediaSource;
    }());
    MusicDBObject.MediaSource = MediaSource;
})(MusicDBObject || (MusicDBObject = {}));
