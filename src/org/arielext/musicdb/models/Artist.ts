import Album from "./Album";
import Letter from "./Letter";

export default class Artist {

  name: string;
  bio: string;
  art: string;
  albums: Array<Album> = [];
  letter: Letter;
  albumArtist: string;
  sortName: string;

  constructor(json: any) {
    this.name = json.name || json.artist;
    this.albumArtist = json.albumartist || json.albumArtist;
    this.sortName = (this.albumArtist) ? this.albumArtist.toUpperCase() : (json.sortName) ? json.sortName.toUpperCase() : this.name.toUpperCase();
    this.bio = json.bio;
  }
  url() {
    return `/letter/${this.letter.escapedLetter}/artist/${encodeURIComponent(this.albumArtist || this.name)}/`;
  }
}