import { Component, Input } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { DimensionType, Experience, StudyBrowser, StudyStep } from '../types';
import { AssociativeDimension, ScoredDimension, ScoreRollup, TaskRollup } from '../../shared';

@Component({
  selector: 'dimension-details-manager',
  templateUrl: './dimension-details-manager.component.html',
  styleUrls: ['./dimension-details-manager.component.scss']
})
export class DimensionDetailsManager {
  @Input() browser: StudyBrowser;

  @select(['experiences', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['task', 'selectedTask']) selectedTask$: Observable<StudyStep>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;

  private subs: Subscription[] = [];

  private experience: Experience;
  private scores: ScoreRollup;
  private task: StudyStep;

  private taskRollup: TaskRollup;
  private dimensions: (AssociativeDimension | ScoredDimension)[] = [];

  constructor() {
    this.subs.push(this.scores$.subscribe(x => this.scores = x));
    this.subs.push(this.selectedExperience$.subscribe(x => this.experience = x));
    this.subs.push(this.selectedTask$.subscribe(x => {
      this.task = x;
      this.setDimensions();
    }));
  }

  ngOnChanges() {
    this.setDimensions();
  }

  setDimensions() {
    if(this.browser && this.experience && this.task && this.scores) {
      this.taskRollup = this.scores.browserRollups
        .find(x => x.name === this.browser.name).experienceRollups
        .find(x => x.id === this.experience.type.id).taskRollup
        .find(x => x.id === this.task.id);

      if(this.taskRollup) {
        this.dimensions = [...this.taskRollup.scoredDimensions, ...this.taskRollup.associativeDimensions];
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
