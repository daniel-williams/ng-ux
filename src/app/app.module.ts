import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { App } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  bootstrap: [App],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,

    AppRoutingModule,
    CoreModule,
  ],
  declarations: [
    App,
  ],
})
export class AppModule { }
