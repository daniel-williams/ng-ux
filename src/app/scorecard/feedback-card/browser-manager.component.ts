import { Component, OnDestroy } from '@angular/core';
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

  private subs: Subscription[] = [];

  private browserCount: number;
  private browserList: string[] = [];
  private cellWidth: string = '100%';
  private cellCount: number = 1;
  private feedbackSort: string;
  private feedbackSortOptions: string[] = ['Avg Score', 'Findable', 'Usable', 'Predictable', 'Useful'];
  private minCellWidth = 350;

  constructor(private userActions: UserActions) {
    this.calculateCellWidth = this.calculateCellWidth.bind(this);

    this.subs.push(this.feedbackSort$.subscribe(x => this.feedbackSort = x));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      this.browserList = x;
      this.browserCount = x.length;
      this.calculateCellWidth();
    }));

    this.calculateCellWidth();
    // recalculate cell width on browser resize
    this.subs.push(Observable
      .fromEvent(window, 'resize')
      .throttleTime(200).subscribe(x => {
        this.calculateCellWidth();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  calculateCellWidth(): void {
    let paneWidth = Math.floor(window.innerWidth / this.browserCount);

    this.cellCount = Math.max(1, Math.floor(paneWidth / this.minCellWidth));
    this.cellWidth = '' + ((1 / this.cellCount) * 100) + '%';
  }

  toggleItem(item: string) {
    this.userActions.setFeedbackSort(item);
  }
}
