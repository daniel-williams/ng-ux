import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';


@Component({
  selector: 'exp-video',
  templateUrl: './exp-video.component.html',
  styleUrls: ['./exp-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpVideo {
  @Input() src: string;
  @Input() poster: string;
  @Input() start: number;
  @Input() end: number;
  @Input() duration: number;

  @ViewChild('expVideo') expVideoRef: ElementRef;
  @ViewChild('expVideoSource') expVideoSourceRef: ElementRef;

  public isActivated: boolean = false;
  public isLoaded: boolean = false;
  public isPlaying: boolean = false;

  private clipRange: string = '';
  private startTime: number = 0;
  private endTime: number = 0;

  constructor() { }

  ngOnInit() {
    console.log('poster: ', this.poster);
    if(this.start && !isNaN(this.start)) {
      let time = typeof this.start === 'string' ? parseInt(this.start) : this.start;

      this.startTime = time;
    }

    if(this.end && !isNaN(this.end)) {
      let time = typeof this.end === 'string' ? parseInt(this.end) : this.end;

      this.endTime = time;
    } else if(this.duration && !isNaN(this.duration)) {
      let duration = typeof this.duration === 'string' ? parseInt(this.duration) : this.duration;

      this.endTime = this.startTime + duration;
    }

    this.clipRange = `${this.secondsToTimecode(this.startTime)} - ${this.secondsToTimecode(this.endTime)}`;
  }

  loadedmetadata() {
    let video = this.expVideoRef.nativeElement as HTMLVideoElement;

    video.volume = 0.5;
    this.isLoaded = true;
  }

  canplay() {
    let video = this.expVideoRef.nativeElement as HTMLVideoElement;

    if(video.currentTime != this.startTime) {
      video.currentTime = this.startTime;
    }
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  timeupdate() {
    let video = this.expVideoRef.nativeElement as HTMLVideoElement;

    if(video.currentTime < this.startTime) {
      video.currentTime = this.startTime;
    }
    if(video.currentTime >= this.endTime) {
      video.pause();
      video.currentTime = this.startTime;
    }
  }

  activateVideo() {
    if(!this.isActivated) {
      let video = this.expVideoRef.nativeElement as HTMLVideoElement;
      let source = this.expVideoSourceRef.nativeElement as HTMLSourceElement;

      source.src = this.src;
      this.isActivated = true;
      video.load();
    }

    this.toggleVideo();
  }

  toggleVideo() {
    let video = this.expVideoRef.nativeElement as HTMLVideoElement;

    if(video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  secondsToTimecode(totalSeconds: number): string {
    if(!totalSeconds) { return; }

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = ('' + (totalSeconds % 60) + '0').slice(0, 2);

    return `${minutes}:${seconds}`;
  }
}
