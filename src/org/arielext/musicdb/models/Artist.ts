namespace MusicDBObject {
  export class Artist implements ObjectWithUrl {

    name: string;
    bio: string;
    art: string;

    constructor(json: any) {
      this.name = json.name;
      this.bio = json.bio;
    }
    url() {
      return `/${encodeURIComponent(this.name)}`;
    }
  }
}