namespace MusicDBObject {
  export class Track implements ObjectWithUrl {

    id:string;
    source:MediaSource;
    artist:Artist;
    album:Album;
    duration:number;
    title:string;
    disc:number;

    constructor (json:any) {
      this.id = json.id;
      this.duration = json.duration;
      this.title = json.title;
      this.disc = json.disc || this.guessBySource(json);
    }

    private guessBySource(json:any):number {
      let source = new MediaSource(json);
      let guessable = source.url;
      let discs:Array<number> = [1,2,3,4,5,6,7,8,9,10];
      for (let i of discs) {
        if (guessable.indexOf(` - ${i}.`) !== -1 || guessable.indexOf(`(${i}) - `) !== -1 || guessable.indexOf(`CD${i}`) !== -1 || guessable.indexOf(`\\${i}-`) !== -1) {
          return i;
        }
      }
      return 1;
    }

    url() {
      return `/${encodeURIComponent(this.artist.name)}/${encodeURIComponent(this.album.name)}/${encodeURIComponent(this.title)}`;
    }
  }
}