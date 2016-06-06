import Album from "./Album";
import Letter from "./Letter";
export default class Artist {
    name: string;
    bio: string;
    art: string;
    albums: Array<Album>;
    letter: Letter;
    constructor(json: any);
    url(): string;
}
