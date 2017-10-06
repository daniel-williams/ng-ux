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

  private browserList: string[] = [];
  private selectedStudy: number;
  private subs: Subscription[] = [];

  constructor(private browserActions: BrowserActions) {
    console.log('browser manager init');

    this.subs.push(this.selectedStudy$.subscribe(x => {
      console.log('browser manager selectedStudy: ', x, this.selectedStudy);
      if(!!x && typeof x.id === 'number') {
        this.selectedStudy = x.id;
      }
    }));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      console.log('browser manager browserList: ', x, this.selectedStudy);
      this.browserList = x;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
