namespace MusicDBObject {
  export class MediaSource {
    url:string;

    constructor(json:any) {
      this.url = json.file || json.url;
    }
  }
}