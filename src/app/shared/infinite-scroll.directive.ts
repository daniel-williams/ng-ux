import { Directive, AfterViewInit, ElementRef, Input, OnChanges} from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';


@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {
  @Input() immediate: any;
  @Input() callback: () => Promise<any>;
  @Input() active: boolean = true;
  @Input() reset: Observable<any>;

  private _scrollEvent$: Observable<any>;
  private _resizeEvent$: Observable<any>;
  private _triggerRequest$ = new Subject();
  private hostEl: HTMLElement;
  private resetSub: Subscription;

  constructor(hostElRef: ElementRef) {
    this.hostEl = hostElRef.nativeElement;
   }

  ngAfterViewInit() {
    this.registerWindowEvents();
    this.setupCallbackRequests();
  }

  ngOnChanges() {
    if(this.reset && !this.resetSub) {
      this.resetSub = this.reset.subscribe(x => {
        this._triggerRequest$.next('reset');
      });
    }
  }

  private registerWindowEvents() {
    this._scrollEvent$ = Observable
      .fromEvent(window, 'scroll')
      .map((e: any): ScrollPosition => this.getCurrentScrollPostion())
      .pairwise()
      .filter(positions => {
        let [previous, current] = positions;
        let isScrollingDown = this.isScrollingDown(previous, current);
        let isPassedThreshold = this.isPassedThreshold(current);

        return isScrollingDown && isPassedThreshold;
      })
      .throttleTime(200)
      .map(() => 'scroll');

    this._resizeEvent$ = Observable
      .fromEvent(window, 'resize')
      .map((e: any): ScrollPosition => this.getCurrentScrollPostion())
      .filter(position => this.isPassedThreshold(position))
      .throttleTime(200)
      .map(() => 'resize');

    this._scrollEvent$.subscribe(this._triggerRequest$);
    this._resizeEvent$.subscribe(this._triggerRequest$);
  }

  private setupCallbackRequests() {
    let callbackRequests$ = this._triggerRequest$.asObservable();
    callbackRequests$
      .map((x) => {
        return this.callback();
      })
      .subscribe(
        (x) => {
          x.then((data) => {
            let current = this.getCurrentScrollPostion();
            let shouldTrigger = this.isPassedThreshold(current);

            if(shouldTrigger) {
              this._triggerRequest$.next('manual');
            }
          }).catch((err) => {});
        },
        (err) => {}
      );

    if (this.immediate) {
      this._triggerRequest$.next('immediate');
    }
  }

  private getTargetDistance() {
    let offset = this.getPageOffset(this.hostEl);

    return offset.top + this.hostEl.offsetHeight;
  }

  private getCurrentScrollPostion(): ScrollPosition {
    let body = window.document.body;

    return {
      scrollDistance: body.scrollTop,
      viewportHeight: window.innerHeight,
      targetDistance: this.getTargetDistance(),
      offsetHeight: this.hostEl.offsetHeight
    };
  }

  private isScrollingDown = (previous: ScrollPosition, current: ScrollPosition) => {
    return previous.scrollDistance < current.scrollDistance;
  }

  private isPassedThreshold = (current: ScrollPosition) => {
    return (current.scrollDistance + current.viewportHeight) >= current.targetDistance;
  }

  private hasMoreRoom() {}

  private getPageOffset(el: Element) {
    let offset = { x: 0, y: 0 };

    this.getOffset(el, offset);

    return {
      top: offset.y,
      left: offset.x
    };
  }

  private getOffset(el: any, offset: any) {
    if(!el) { return };

    offset.x += el.offsetLeft;
    offset.y += el.offsetTop;

    // recursively up the DOM
    this.getOffset(el.offsetParent, offset);
  }

}

interface ScrollPosition {
  scrollDistance: number;
  viewportHeight: number;
  targetDistance: number;
  offsetHeight: number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  scrollDistance: 0,
  viewportHeight: 0,
  targetDistance: 0,
  offsetHeight: 0,
};