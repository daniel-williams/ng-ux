import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class GlobalActions {
  static OPEN_DIMENSION_PANEL = 'OPEN_DIMENSION_PANEL';
  static CLOSE_DIMENSION_PANEL = 'CLOSE_DIMENSION_PANEL';
  static TOGGLE_DIMENSION_PANEL = 'TOGGLE_DIMENSION_PANEL';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  openDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: GlobalActions.OPEN_DIMENSION_PANEL,
    });
  }

  closeDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: GlobalActions.CLOSE_DIMENSION_PANEL,
    });
  }

  toggleDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: GlobalActions.TOGGLE_DIMENSION_PANEL,
    });
  }
}
