export default class MediaSource {
    url;
    constructor(json) {
        this.url = json.file || json.url || json.path || json.id;
    }
}
