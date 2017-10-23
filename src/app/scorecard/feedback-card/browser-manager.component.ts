import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, Status } from '../../store';
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

  private subs: Subscription[] = [];

  private browserCount: number;
  private browserList: string[] = [];
  private cellWidth: string = '100%';
  private minCellWidth = 350;
  private study: StudyOptions;

  constructor(private browserActions: BrowserActions) {
    this.calculateCellWidth = this.calculateCellWidth.bind(this);

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

  calculateCellWidth(): void {
    let paneWidth = Math.floor(window.innerWidth / this.browserCount);
    let cellCount = Math.max(1, Math.floor(paneWidth / this.minCellWidth));

    this.cellWidth = '' + ((1 / cellCount) * 100) + '%';
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
