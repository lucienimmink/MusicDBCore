import Artist from "./Artist";
import Track from "./Track";

export default class Album {

  name:string;
  artist:Artist;
  tracks:Array<Track> = [];
  year:number;
  art:string;

  constructor (json:any){
    this.name = json.album;
    this.sortName = this.name.toUpperCase();
    this.year = json.year;
  }
  url() {
    return `/${encodeURIComponent(this.artist.name)}/${encodeURIComponent(this.name)}`;
  }
}