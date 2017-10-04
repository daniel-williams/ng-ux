import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, Status } from '../../store';
import { StudyBrowser, StudyOptions } from '../types';


@Component({
  selector: 'browser-picker',
  templateUrl: './browser-picker.component.html',
  styleUrls: ['./browser-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserPicker implements OnDestroy {
  @select(['browser', 'showPanel'])  showPanel$: Observable<boolean>;
  @select(['browser', 'browserList'])  browserList$: Observable<StudyBrowser[]>;
  @select(['browser', 'browserListStatus'])  browserListStatus$: Observable<Status>;
  @select(['browser', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private showPanel: boolean = false;
  private browserList: StudyBrowser[] = [];
  private browserListStatus: Status = Status.notFetched;
  private selectedBrowsers: string[] = [];
  private subs: Subscription[] = [];

  constructor(private browserActions: BrowserActions) {
    this.subs.push(this.showPanel$.subscribe(x => this.showPanel = x));
    this.subs.push(this.browserList$.subscribe(x => this.browserList = x));
    this.subs.push(this.selectedBrowsers$.subscribe(x => this.selectedBrowsers = x));
    this.subs.push(this.browserListStatus$.subscribe(x => this.browserListStatus = x));
    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.browserActions.fetchBrowsers(x.id);
      }
    }));
  }

  togglePanel() {
    this.browserActions.togglePanel();
  }

  closePanel() {
    this.browserActions.closePanel();
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  get browserNames(): string[] {
    let browserNames = this.browserList.map(x => x.name);
    console.log('browserNames: ', browserNames, this.selectedBrowsers);

    return browserNames;
  }
}
