import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';


const routes: Route[] = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class LazyRoutingModule {}
