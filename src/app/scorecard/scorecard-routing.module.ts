import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScorecardComponent } from './scorecard.component';

const routes: Routes = [
  {
    path: '',
    component: ScorecardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ScorecardRoutingModule {}
