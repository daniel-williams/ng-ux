import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class BrowserActions {
  static FETCH_BROWSERS = 'FETCH_BROWSERS';
  static FETCH_BROWSERS_SUCCESS = 'FETCH_BROWSERS_SUCCESS';
  static FETCH_BROWSERS_FAILED = 'FETCH_BROWSERS _FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchBrowsers(id: number): void {
    this.ngRedux.dispatch({
      type: BrowserActions.FETCH_BROWSERS,
      payload: id,
    });
  }

}
