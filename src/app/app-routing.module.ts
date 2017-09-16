import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScorecardModule } from './scorecard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => ScorecardModule,
  },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule',
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }