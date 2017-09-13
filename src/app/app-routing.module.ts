import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameplateModule } from './nameplate';
import { ScorecardModule } from './scorecard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => ScorecardModule,
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