import { Component, Input } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IAppState } from '../../store';
import { StudyBrowser, StudyStep } from '../types';
import { AssociativeDimension, ScoredDimension, TaskRollup } from '../../shared';


@Component({
  selector: 'dimension-details-manager',
  templateUrl: './dimension-details-manager.component.html',
  styleUrls: ['./dimension-details-manager.component.scss']
})
export class DimensionDetailsManager {
  @Input() browser: StudyBrowser;

  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  private subs: Subscription[] = [];

  private dimensions: (AssociativeDimension | ScoredDimension)[] = [];
  private taskRollup: TaskRollup;
  private wordCount: number = 0;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedTask$.subscribe(x => this.setDimensions()));
  }

  ngOnChanges() {
    this.setDimensions();
  }

  setDimensions() {
    let { experiences, study, user } = this.ngRedux.getState();

    if(this.browser && user.selectedExperience && user.selectedTask && study.scores) {
      let browserRollup = study.scores.browserRollups.find(x => x.name === this.browser.name);

      if(browserRollup && browserRollup.experienceRollups) {
        this.taskRollup = browserRollup.experienceRollups
          .find(x => x.id === user.selectedExperience.type.id).taskRollup
          .find(x => x.id === user.selectedTask.id);

        if(this.taskRollup) {
          this.dimensions = [...this.taskRollup.scoredDimensions, ...this.taskRollup.associativeDimensions];
          this.wordCount = this.dimensions.length > 1 ? 5 : 0;
        }
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
