export class musicdbcore {
    private const VERSION:string = "1.0.0"; 
    constructor () {
        console.log(`Core init ${this.VERSION}`);
    }
    setSourceJson(json:any) {
        console.log(`this json has ${json.length} records`);
        for (let line of json) {
            let artist = new MusicDBObject.Artist(line);
            let album = new MusicDBObject.Album(line);
            let track = new MusicDBObject.Track(line);

            album.artist = artist;
            track.artist = artist;
            track.album = album;
            console.log(track.url());
        }
    }
}