import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { App } from './app.component';
import { SiteNav } from './site-nav';
import { SiteStyles } from './site-styles';

import { AnimationService } from './shared/animation.service';


@NgModule({
  bootstrap: [App],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    AppRoutingModule,
    CoreModule,
  ],
  declarations: [
    App,
    SiteNav,
    SiteStyles,
  ],
  providers: [
    AnimationService,
  ]
})
export class AppModule { }
