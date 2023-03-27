import Album from "./Album";
import Letter from "./Letter";
export default class Artist {
    name: string;
    bio: string;
    art: string;
    albums: Album[];
    letter: Letter | null;
    albumArtist: string;
    sortName: string;
    escapedName: string;
    isCollection: boolean;
    constructor(json: any);
    url(): string;
    sortAlbumsBy(sortkey?: string, direction?: string): void;
    sortAndReturnAlbumsBy(sortkey?: string, direction?: string): Album[];
    private stripFromName;
}
