import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from './shared.service';
import { SharedCompModule } from './shared-comp';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,

    SharedCompModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,

    SharedCompModule,
  ],
  providers: [
    SharedService,
  ]
})
export class SharedModule {}