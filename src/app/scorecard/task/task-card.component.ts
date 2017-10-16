import { Component, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { StudyStep } from '../types';


@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCard {
  @Input() task: StudyStep;

  constructor() {}
}
