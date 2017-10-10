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
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private selectedStudy: number;
  private browserList: string[] = [];
  private browserCount: number;
  private subs: Subscription[] = [];

  constructor(private browserActions: BrowserActions) {
    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.selectedStudy = x.id;
      }
    }));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      this.browserList = x;
      this.browserCount = x.length;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
