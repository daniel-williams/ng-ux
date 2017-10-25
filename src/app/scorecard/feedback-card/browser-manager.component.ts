import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, GlobalActions, Status } from '../../store';
import { StudyBrowser, StudyOptions } from '../types';

@Component({
  selector: 'browser-manager',
  templateUrl: './browser-manager.component.html',
  styleUrls: ['./browser-manager.component.scss'],
  host: {
    class: 'browser-manager'
  },
})
export class BrowserManager implements OnDestroy {
  @select(['browser', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;
  // @select(['global', 'feedbackSortOptions']) feedbackSortOptions$: Observable<string[]>;
  @select(['global', 'feedbackSort']) feedbackSort$: Observable<string>;

  private subs: Subscription[] = [];

  private browserCount: number;
  private browserList: string[] = [];
  private cellWidth: string = '100%';
  private minCellWidth = 350;
  private study: StudyOptions;

  private feedbackSortOptions: string[] = ['Avg Score', 'Findable', 'Usable', 'Predictable', 'Useful'];
  private feedbackSort: string;

  constructor(
    private browserActions: BrowserActions,
    private globalActions: GlobalActions) {

    this.calculateCellWidth = this.calculateCellWidth.bind(this);

    // this.subs.push(this.feedbackSortOptions$.subscribe(x => this.feedbackSortOptions = x));
    this.subs.push(this.feedbackSort$.subscribe(x => this.feedbackSort = x));
    this.subs.push(Observable
      .fromEvent(window, 'resize')
      .throttleTime(200).subscribe(x => {
        this.calculateCellWidth();
      }));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      this.browserList = x;
      this.browserCount = x.length;
      this.calculateCellWidth();
    }));

    this.calculateCellWidth();
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  calculateCellWidth(): void {
    let paneWidth = Math.floor(window.innerWidth / this.browserCount);
    let cellCount = Math.max(1, Math.floor(paneWidth / this.minCellWidth));

    this.cellWidth = '' + ((1 / cellCount) * 100) + '%';
  }

  toggleItem(item: string) {
    this.globalActions.setFeedbackSort(item);
  }
}
