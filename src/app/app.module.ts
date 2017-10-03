import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// redux related
import { createStore, applyMiddleware, Store } from 'redux';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter  } from '@angular-redux/router';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';

import { App } from './app.component';
import { AppConstants } from './app.constants';
import { IAppState, rootReducer, StudyActions, StudyEpics } from './store';


@NgModule({
  bootstrap: [App],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgReduxModule,
    NgReduxRouterModule,
    ReactiveFormsModule,

    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [
    App,
  ],
  providers: [
    AppConstants,
    StudyActions,
    StudyEpics,
  ]
})
export class AppModule {
  private middleWare: Array<any> = [];

  constructor(
    private appConstants: AppConstants,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private studyEpics: StudyEpics) {

    const epicMiddleware = createEpicMiddleware(this.studyEpics.fetchStudies);
    const loggerMiddleware = createLogger();
    const store: Store<IAppState> = createStore(
      rootReducer,
      {},
      applyMiddleware(...[epicMiddleware, loggerMiddleware])
    )

    // this.ngRedux.configureStore(rootReducer, {}, this.middleWare, []);
    this.ngRedux.provideStore(store);
    this.ngReduxRouter.initialize();
  }
}
