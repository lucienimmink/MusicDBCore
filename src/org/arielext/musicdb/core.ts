export class MusicDBCore {
    private const VERSION:string = "1.0.0"; 
    constructor () {
        console.log('Core init', VERSION);
    }
    setSourceJson(json:any) {
        console.log(`this json has ${json.length} records`);
    }
}