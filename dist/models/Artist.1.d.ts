import Album from "./Album";
export default class Artist {
    name: string;
    bio: string;
    art: string;
    albums: Array<Album>;
    constructor(json: any);
    url(): string;
}
