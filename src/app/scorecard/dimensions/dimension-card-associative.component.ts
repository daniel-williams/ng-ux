import { Component, Input } from '@angular/core';

import { AssociativeDimension } from '../../shared';


@Component({
  selector: 'dimension-card-associative',
  templateUrl: './dimension-card-associative.component.html',
  styleUrls: ['./dimension-card-associative.component.scss']
})
export class DimensionCardAssociative {
  @Input() dimension: AssociativeDimension;
  @Input() maxCount: number = 0;

  private words: any[];

  ngOnInit() {
    let wm = this.dimension.wordMap;

    this.words = Object.keys(wm).map(x => [x, wm[x]]).sort((a, b) => a[1] < b[1] ? -1 : b[1] < a[1] ? 1 : 0);

    if(this.maxCount > 0) {
      this.words = this.words.slice(-(this.maxCount));
    }
  }
}
