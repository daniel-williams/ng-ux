import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class BrowserActions {
  static FETCH_BROWSERS = 'FETCH_BROWSERS';
  static FETCH_BROWSERS_SUCCESS = 'FETCH_BROWSERS_SUCCESS';
  static FETCH_BROWSERS_FAILED = 'FETCH_BROWSERS _FAILED';

  static SET_SELECTED_BROWSERS = 'SET_SELECTED_BROWSERS';

  static RESET = 'RESET';
  static TOGGLE_BROWSER_PANEL = 'TOGGLE_BROWSER_PANEL';
  static OPEN_BROWSER_PANEL = 'OPEN_BROWSER_PANEL';
  static CLOSE_BROWSER_PANEL = 'CLOSE_BROWSER_PANEL';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchBrowsers(id: number): void {
    this.ngRedux.dispatch({
      type: BrowserActions.FETCH_BROWSERS,
      payload: id,
    });
  }

  setBrowsers(names: string[]): void {
    this.ngRedux.dispatch({
      type: BrowserActions.SET_SELECTED_BROWSERS,
      payload: names,
    });
  }

  reset(): void {
    this.ngRedux.dispatch({
      type: BrowserActions.RESET,
    })
  }

  togglePanel(): void {
    this.ngRedux.dispatch({
      type: BrowserActions.TOGGLE_BROWSER_PANEL,
    });
  }

  openPanel(): void {
    this.ngRedux.dispatch({
      type: BrowserActions.OPEN_BROWSER_PANEL,
    });
  }

  closePanel(): void {
    this.ngRedux.dispatch({
      type: BrowserActions.CLOSE_BROWSER_PANEL,
    });
  }
}
