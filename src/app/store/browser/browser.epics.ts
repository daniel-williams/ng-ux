import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { Action, IAppState, Status, BrowserActions, UserActions } from '../';
import { UxScorecardService } from '../../shared';


@Injectable()
export class BrowserEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchBrowsers = (action$: ActionsObservable<Action>, store: any) => {
    return action$.ofType(BrowserActions.FETCH_BROWSERS)
      .mergeMap(({payload}) => {
        return Observable.fromPromise(this.uxss.fetchBrowsers(payload))
          .flatMap(result => {
            let actions: Action[] =[];

            actions.push({
              type: BrowserActions.FETCH_BROWSERS_SUCCESS,
              payload: result
            });

            // by default, set selected to all browsers
            if(result.length) {
              let browserNames = result.map(x => x.name).sort((a, b) => {
                let aName = a.toLowerCase();
                let bName = b.toLowerCase();
                
                return (aName === 'edge' || (aName < bName && bName !== 'edge'))
                  ? -1
                  : (bName === 'edge' || bName < aName)
                    ? 1
                    : 0;
              });

              actions.push({
                type: UserActions.SET_SELECTED_BROWSERS,
                payload: browserNames
              });
            }

            return actions;
          })
          .catch(error => Observable.of({
            type: BrowserActions.FETCH_BROWSERS_FAILED,
            payload: error
          }));
      });
  }
}
