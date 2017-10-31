import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { UserActions } from '../../store';


@Component({
  selector: 'browser-manager',
  templateUrl: './browser-manager.component.html',
  styleUrls: ['./browser-manager.component.scss'],
  host: {
    class: 'browser-manager'
  },
})
export class BrowserManager implements OnDestroy {
  @select(['user', 'feedbackSort']) feedbackSort$: Observable<string>;
  @select(['user', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;

  @ViewChild('feedbackContainer') feedbackContainerRef: ElementRef;

  private subs: Subscription[] = [];

  private browserCount: number;
  private browserList: string[] = [];
  private cellWidth: string = '100%';
  private cellCount: number = 1;
  private feedbackSort: string;
  private feedbackSortOptions: string[] = ['Avg Score', 'Findable', 'Usable', 'Predictable', 'Useful'];
  private minCellWidth = 350;

  private feedbackContainer: HTMLElement;
  private managerWidth: string = '100%';

  constructor(private userActions: UserActions) { }

  ngAfterViewInit() {
    this.feedbackContainer =  this.feedbackContainerRef.nativeElement;

    this.subs.push(this.feedbackSort$.subscribe(x => this.feedbackSort = x));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      this.browserList = x;
      this.browserCount = x.length;
      this.calculateCellWidth();
    }));

    // recalculate cell width on browser resize
    this.subs.push(Observable.fromEvent(window, 'resize')
      .throttleTime(200)
      .subscribe(this.calculateCellWidth));

    this.calculateCellWidth();
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  calculateCellWidth = (): void => {
    let containerWidth = this.feedbackContainer.clientWidth;
    let paneWidth = Math.floor(containerWidth / this.browserCount);

    setTimeout(() => this.managerWidth = '' + (paneWidth - 15) + 'px', 0);

    this.cellCount = Math.max(1, Math.floor(paneWidth / this.minCellWidth));
    this.cellWidth = '' + ((1 / this.cellCount) * 100) + '%';
  }

  toggleItem(item: string) {
    this.userActions.setFeedbackSort(item);
  }
}
