import Artist from "./Artist";
import Track from "./Track";

export default class Album {
  public name: string = "";
  public sortName: string = "";
  public escapedName: string = "";
  public artist: Artist | null = null;
  public tracks: Track[] = [];
  public discs: any[] = [];
  public sortedDiscs: any[] = [];
  public year: any;
  public art: string = "";
  public modified = 0;
  public type: string = "";
  public isContinues = true;
  public albumGain: number = 0;
  public mbid: string = "";

  constructor(json: any) {
    if (json.album && json.title) {
      this.name = json.album;
      this.sortName = this.name.toUpperCase();
      this.escapedName = encodeURIComponent(this.sortName);
      this.year = json.year;
      this.modified = json.modified;
      this.albumGain = json.albumgain || 0;
      this.mbid = json.albummbid || "";

      // strip month/day from universal date strings
      if (this.year && this.year.indexOf("-") !== -1) {
        this.year = this.year.split("-")[0];
      }
    }
  }
  public url() {
    return `/letter/${this.artist?.letter?.escapedLetter}/artist/${this.artist?.escapedName}/album/${this.escapedName}`;
  }
}
