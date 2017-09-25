import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter  } from '@angular-redux/router';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { App } from './app.component';
import { AppConstants } from './app.constants';
import { IAppState, rootReducer, StudiesActions } from './store';


const createLogger = require('redux-logger');


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
  ],
  declarations: [
    App,
  ],
  providers: [
    AppConstants,
    StudiesActions,
  ]
})
export class AppModule {
  private middleWare: Array<any> = [];

  constructor(
    private appConstants: AppConstants,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter) {

    if(appConstants.logRouteChanges) {
      this.middleWare.push(createLogger());
    }

    this.ngRedux.configureStore(rootReducer, {}, this.middleWare, []);
    this.ngReduxRouter.initialize();
  }
}
