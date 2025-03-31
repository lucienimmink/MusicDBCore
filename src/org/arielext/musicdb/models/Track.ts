import Album from "./Album";
import Artist from "./Artist";
import MediaSource from "./MediaSource";

export default class Track {
  public id: string = "";
  public source: MediaSource | null = null;
  public artist: Artist | null = null;
  public album: Album | null = null;
  public trackArtist: string = "";
  public duration: number = 0;
  public title: string = "";
  public disc: number = 0;
  public number: number = 0;
  public type: string = "";
  public isPlaying = false;
  public isPaused = false;
  public isLoved = false;
  public position = 0;
  public buffered: any = {
    start: 0,
    end: 0,
  };
  public showActions = false;
  public date: Date | null = null;
  public nowPlaying: boolean = false;
  public image: string = "";
  public trackGain: number = 0;

  public samplerate: number = 0;
  public bitrate: number = 0;
  public channels: number = 0;
  public bits_per_sample: number = 0;

  constructor(json: any) {
    if (json.album && json.title) {
      this.id = json.id;
      this.duration = json.seconds
        ? json.seconds * 1000
        : json.duration && !isNaN(json.duration)
        ? json.duration
        : 0;
      this.title = json.title;
      this.source = new MediaSource(json);
      this.disc = json.disc || this.guessBySource(json);
      this.number = json.number;
      this.trackArtist = json.artist;
      this.type = json.type || "mp3";
      this.trackGain = json.trackgain || 0;

      this.samplerate = json.samplerate || 0;
      this.bitrate = json.bitrate || 0;
      this.channels = json.channels || 2;
      this.bits_per_sample = json.bits_per_sample || 0;
    }
  }

  public url() {
    // tslint:disable-next-line:max-line-length
    return `/letter/${
      this?.artist?.letter?.escapedLetter
    }/artist/${encodeURIComponent(
      this.artist?.name || ""
    )}/album/${encodeURIComponent(
      this.album?.name || ""
    )}/track/${encodeURIComponent(this.title)}`;
  }

  public toJSON() {
    return this.id;
  }

  private guessBySource(json: any): number {
    const guessable = this.source?.url;
    const discs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (const i of discs) {
      // tslint:disable-next-line:max-line-length
      if (
        guessable?.indexOf(` - ${i}.`) !== -1 ||
        guessable?.indexOf(`(${i}) - `) !== -1 ||
        guessable?.indexOf(`CD${i}`) !== -1 ||
        guessable?.indexOf(`\\${i}-`) !== -1
      ) {
        return i;
      }
    }
    return 1;
  }
}
