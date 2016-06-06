import Artist from "./Artist";
export default class Letter {
    letter: string;
    escapedLetter: string;
    artists: Array<Artist>;
    constructor(json: any);
    url(): string;
    private getFirstLetterOf(name);
    private stripFromName(name, strip);
    private groupIfSpecialChar(c);
}
