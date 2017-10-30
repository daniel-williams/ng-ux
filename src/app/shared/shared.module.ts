import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EllipsisPipe } from './ellipsis.pipe';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { InfiniteScroll } from './infinite-scroll';
import { UxScorecardService } from './ux-scorecard.service';
import { VideoModalModule } from './video-modal';
import { WordCloudService } from './word-cloud.service';
import { WordCloud } from './word-cloud';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    EllipsisPipe,
    InfiniteScroll,
    InfiniteScrollDirective,
    WordCloud,
  ],
  exports: [
    EllipsisPipe,
    InfiniteScroll,
    InfiniteScrollDirective,
    CommonModule,
    FormsModule,
    VideoModalModule,
    WordCloud,
  ],
  providers: [
    UxScorecardService,
    WordCloudService,
  ],
})
export class SharedModule {}