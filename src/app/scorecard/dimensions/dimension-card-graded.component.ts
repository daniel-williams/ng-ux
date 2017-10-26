import { Component, Input } from '@angular/core';

import { ScoredDimension } from '../../shared';


@Component({
  selector: 'dimension-card-graded',
  templateUrl: './dimension-card-graded.component.html',
  styleUrls: ['./dimension-card-graded.component.scss']
})
export class DimensionCardGraded {
  @Input() dimension: ScoredDimension;

  private scoreBreakout: {name: string, value: number}[] = [];
  private scoreCount = 0;
  private labelWidth = '30px';

  ngAfterViewInit() {
    this.calcBreakout();
  }

  ngOnChanges() {
    this.calcBreakout();
  }

  calcBreakout() {
    this.scoreBreakout = this.dimension.scoreBreakout;
    this.scoreCount = this.scoreBreakout.reduce((accum, item) => {
      accum = item.value > accum ? item.value : accum;
      
      return accum;
    }, 0);
  }
}
