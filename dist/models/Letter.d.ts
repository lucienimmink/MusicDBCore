import Artist from "./Artist";
export default class Letter {
    letter: string;
    escapedLetter: string;
    artists: Artist[];
    active: boolean;
    constructor(json: any);
    url(): string;
    sortArtistsBy(sortkey?: string, direction?: string): void;
    sortAndReturnArtistsBy(sortkey?: string, direction?: string): Artist[];
    private getFirstLetterOf;
    private stripFromName;
    private groupIfSpecialChar;
}
