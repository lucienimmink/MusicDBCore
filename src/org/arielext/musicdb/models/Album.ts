/// <reference path="MusicDBObject.ts" />
namespace MusicDBObject {
  export class Album implements ObjectWithUrl {

    name:string;
    artist:Artist;
    tracks:Array<any>;
    year:number;
    art:string;

    constructor (json:any){
      this.name = json.album;
      this.year = json.year;
    }

    url() {
      return `/${encodeURIComponent(this.artist.name)}/${encodeURIComponent(this.name)}`;
    }
  }
}