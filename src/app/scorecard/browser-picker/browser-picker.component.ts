import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, Status } from '../../store';
import { StudyBrowser } from '../types';


@Component({
  selector: 'browser-picker',
  templateUrl: './browser-picker.component.html',
  styleUrls: ['./browser-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserPicker implements OnDestroy {
  @select(['browser', 'browserList'])  browserList$: Observable<StudyBrowser[]>;
  @select(['browser', 'browserListStatus'])  browserListStatus$: Observable<Status>;
  @select(['browser', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;
  
  private subs: Subscription[] = [];

  private showPanel: boolean = false;
  private browserList: StudyBrowser[] = [];
  private browserNames: string[] = [];
  private browserListStatus: Status = Status.notFetched;
  private selectedBrowsers: string[] = [];

  constructor(private browserActions: BrowserActions) {
    this.subs.push(this.browserList$.subscribe(x => {
      this.browserList = x.sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        return (aName === 'edge' || (aName < bName && bName !== 'edge'))
          ? -1
          : (bName === 'edge' || bName < aName)
            ? 1
            : 0;
      });
      this.browserNames = this.browserList.map(x => x.name);
    }));
    this.subs.push(this.selectedBrowsers$.subscribe(x => this.selectedBrowsers = x));
    this.subs.push(this.browserListStatus$.subscribe(x => this.browserListStatus = x));
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  closePanel() {
    this.showPanel = false;
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
