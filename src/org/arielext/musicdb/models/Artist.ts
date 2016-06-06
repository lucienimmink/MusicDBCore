import Album from "./Album";

export default class Artist {

  name: string;
  bio: string;
  art: string;
  albums: Array<Album> = [];

  constructor(json: any) {
    this.name = json.artist;
    this.albumArtist = json.albumArtist;
    this.sortName = this.albumArtist || this.name.toUpperCase();
    this.bio = json.bio;
  }
  url() {
    return `/${encodeURIComponent(this.name)}`;
  }
}