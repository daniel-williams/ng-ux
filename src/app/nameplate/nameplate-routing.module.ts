import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { Nameplate } from './nameplate.component';

const routes: Route[] = [
  {
    path: '',
    component: Nameplate
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
export class NameplateRoutingModule {}
