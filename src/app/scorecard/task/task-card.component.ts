import { Component, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { ScoreRollup } from '../../shared';
import { IAppState, UserActions } from '../../store';
import { Experience, StudyStep } from '../types';


@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCard {
  @Input() task: StudyStep;
  @Input() selected: boolean;

  private subs: Subscription[] = [];

  private browserScores: {name: string, score: number}[] = [];

  constructor(private actions: UserActions, private ngRedux: NgRedux<IAppState>) { }

  ngOnChanges() {
    let appState = this.ngRedux.getState();

    if(this.task) {
      this.browserScores = [];

      appState.study.scores.browserRollups.forEach(b => {
        let taskRollup = b.experienceRollups
          .find(e => e.id === appState.user.selectedExperience.type.id).taskRollup
          .find(t => t.id === this.task.id);

        this.browserScores.push({name: b.name, score: taskRollup.score});
      });

      this.browserScores = this.browserScores.sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        return (aName === 'edge' || (aName < bName && bName !== 'edge'))
          ? -1
          : (bName === 'edge' || bName < aName)
            ? 1
            : 0;
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  setSelectedTask() {
    this.actions.setSelectedTask(this.task);
  }
}
