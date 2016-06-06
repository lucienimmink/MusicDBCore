namespace Objects {
  export class Source {
    url:string;

    constructor(json:any) {
      this.url = json.file || json.url;
    }
  }
}