declare namespace MusicDBObject {
    class Artist implements ObjectWithUrl {
        name: string;
        bio: string;
        art: string;
        constructor(json: any);
        url(): string;
    }
}
