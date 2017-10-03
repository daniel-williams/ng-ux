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
  static TOGGLE_SHOW_PANEL = 'TOGGLE_SHOW_PANEL';
  static OPEN_SHOW_PANEL = 'OPEN_SHOW_PANEL';
  static CLOSE_SHOW_PANEL = 'CLOSE_SHOW_PANEL';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  setBrowsers(ids: string[]): void {
    this.ngRedux.dispatch({
      type: BrowserActions.SET_SELECTED_BROWSERS,
      payload: ids,
    });
  }

  reset(): void {
    this.ngRedux.dispatch({
      type: BrowserActions.RESET,
    })
  }
}
