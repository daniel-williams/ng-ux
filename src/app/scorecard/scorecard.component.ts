import { Component } from '@angular/core';

import { StudyActions } from '../store';

@Component({
  selector: 'scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScorecardComponent {
  constructor(private actions: StudyActions) {
    actions.fetchStudyOptions();
  }
}