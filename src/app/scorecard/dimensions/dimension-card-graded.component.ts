import { Component, Input } from '@angular/core';

import { ScoredDimension } from '../../shared';


@Component({
  selector: 'dimension-card-graded',
  templateUrl: './dimension-card-graded.component.html',
  styleUrls: ['./dimension-card-graded.component.scss']
})
export class DimensionCardGraded {
  @Input() dimension: ScoredDimension;
}
