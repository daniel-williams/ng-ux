import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';


class UIState {
  static hide:string = 'hide';
  static show:string = 'show';
}


@Component({
  selector: 'video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
  host: {
    class: 'video-modal'
  },
  animations: [
    trigger('overlayState', [
      state(UIState.show, style({opacity: 1})),
      state(UIState.hide, style({opacity: 0})),
      transition(`${UIState.hide} => ${UIState.show}`, animate('0.3s 0ms ease')),
      transition(`${UIState.show} => hide`, animate('0.3s 300ms ease'))
    ]),
    trigger('videoState', [
      state(UIState.show, style({transform: 'scale(1)', opacity: 1})),
      state(UIState.hide, style({transform: 'scale(0.7)', opacity: 0})),
      transition(`${UIState.hide} => ${UIState.show}`, animate('0.3s 300ms ease-out')),
      transition(`${UIState.show} => ${UIState.hide}`, animate('0.3s 0ms ease-in'))
    ]),
  ],
})
export class VideoModalComponent {
  @Input('src') src: string;
  @ViewChild('video') videoRef: ElementRef;

  private overlayState = UIState.hide;
  private showModal = false;
  private videoState = UIState.hide;

  private closing = false;
  private opening = false;

  private keyDown$: Observable<any>;

  ngOnInit() {
    Observable.fromEvent(window, 'keydown').subscribe((evt: KeyboardEvent) => {
      let isEscape = false;
      
      if ("key" in evt) {
          isEscape = (evt.key == "Escape" || evt.key == "Esc");
      } else {
          isEscape = (evt.keyCode == 27);
      }
      
      if (isEscape) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.showModal = true;

    setTimeout(() => {
      this.opening = true;
      this.overlayState = UIState.show;
      this.videoState = UIState.show;

      this.videoRef.nativeElement.src = this.src;
      this.videoRef.nativeElement.currentTime = 300;
    }, 0);
  }

  playVideo() {
    if(this.opening) {
      this.opening = false;
      this.videoRef.nativeElement.play();
    }
  }

  closeModal() {
    this.overlayState = UIState.hide;
    this.videoState = UIState.hide;
    this.closing = true;
  }

  removeModal() {
    if(this.closing) {
      this.closing = false;
      this.showModal = false;
    }
  }
}
