import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  host: {
    class: 'infinite-scroll'
  }
})
export class InfiniteScroll {
  @Input() debug: boolean = false;
  @Input() callback: Function = () => {};
  @Input() enabled: boolean = true;

  @Output() inViewport = new EventEmitter<void>();

  @ViewChild('trigger') triggerRef: ElementRef;

  private subs: Subscription[] = [];
  private resizeEvent$: Observable<string>;
  private scrollEvent$: Observable<string>;
  private manual$: Observable<string>;
  private notify$: Observable<string>;

  private triggerEl: HTMLElement;
  private scrollTop = 0;
  private triggerOffset = 0;
  private viewHeight = 0;

  constructor(hostElRef: ElementRef) {
    this.registerWindowEvents();
  }

  ngAfterViewInit() {
    this.triggerEl = this.triggerRef.nativeElement;
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  private registerWindowEvents() {
    this.scrollEvent$ = Observable
      .fromEvent(window, 'scroll')
      .throttleTime(300)
      .map(this.getScrollTop)
      .pairwise()
      .filter(positions => {
        let [previous, current] = positions;
        let isScrollingDown = previous < current;

        return isScrollingDown && this.isPassedThreshold();
      })
      .map(() => 'scroll');

    this.resizeEvent$ = Observable
      .fromEvent(window, 'resize')
      .throttleTime(300)
      .do(this.getScrollTop)
      .filter(this.isPassedThreshold)
      .map(() => 'resize');

    this.manual$ = Observable
      .interval(300)
      .do(this.getScrollTop)
      .filter(this.isPassedThreshold)
      .map(() => 'manual');

    this.notify$ = this.manual$.merge(this.scrollEvent$, this.resizeEvent$);
    this.subs.push(this.notify$.filter(() => this.enabled).subscribe(() => {
      this.inViewport.emit();
    }));
  }

  private isPassedThreshold = () => {
    return this.scrollTop > this.triggerOffset;
  }

  private getScrollTop = (): number => {
    this.scrollTop = window.scrollY;
    this.viewHeight = window.innerHeight;
    this.triggerOffset = (this.triggerEl.getBoundingClientRect().top - this.viewHeight + window.scrollY);

    return this.scrollTop;
  }
}