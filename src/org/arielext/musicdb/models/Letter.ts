import Artist from "./Artist";
import * as _ from "lodash";

export default class Letter {

  letter: string;
  escapedLetter: string;
  artists: Array<Artist> = [];

  constructor(json: any) {
    this.letter = this.getFirstLetterOf(json.artist);
    this.escapedLetter = encodeURIComponent(this.letter);
  };
  url() {
    return `/letter/${this.escapedLetter}/`;
  };
  private getFirstLetterOf(name:string):string {
    return this.stripFromName(name, 'the ');
  };
  private stripFromName(name:string, strip:string):string {
    var s = strip.toUpperCase();
    var f = name.toUpperCase();
    f = _.trim(f);
    f = _.trimStart(f, s);
    return this.groupIfSpecialChar(_.split(f, '', 1)[0]);
  }
  private groupIfSpecialChar(c:string):string {
    if (_.indexOf(['1','2','3','4','5','6','7','8','9','0', '(', ')', '[', ']', '{', '}', '_', '-', '.'], c) !== -1) {
      return '#';
    }
    return c;
  }
}