import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EllipsisPipe } from './ellipsis.pipe';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { UxScorecardService } from './ux-scorecard.service';
import { VideoModalModule } from './video-modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    EllipsisPipe,
    InfiniteScrollDirective,
  ],
  exports: [
    EllipsisPipe,
    InfiniteScrollDirective,
    CommonModule,
    FormsModule,
    VideoModalModule,
  ],
  providers: [
    UxScorecardService,
  ],
})
export class SharedModule {}