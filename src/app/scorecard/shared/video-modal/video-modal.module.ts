import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoModalComponent } from './video-modal.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    VideoModalComponent,
  ],
  exports: [
    VideoModalComponent
  ],
  providers: [
  ]
})
export class VideoModalModule {}