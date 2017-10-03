import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action, IAppState, Status, BrowserActions } from '../';
import { UxScorecardService } from '../../shared';


@Injectable()
export class BrowserEpics {
  constructor(private uxss: UxScorecardService) {}

  // TODO: only fetch 
  fetchBrowsers = (action$: ActionsObservable<Action>, store: any) => {

    return action$.ofType(BrowserActions.FETCH_BROWSERS)
      .mergeMap(({payload}) => {
        console.log('XXXXXXXXXXXXX', payload, store.getState());
        return Observable.fromPromise(this.uxss.getStudyBrowsers(payload))
          .map(result => ({
            type: BrowserActions.FETCH_BROWSERS_SUCCESS,
            payload: result
          }))
          .catch(error => Observable.of({
            type: BrowserActions.FETCH_BROWSERS_FAILED,
            payload: error
          }));
      });
  }
}
