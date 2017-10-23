import { Component, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { ScoreRollup } from '../../shared';
import { TaskActions } from '../../store';
import { Experience, StudyStep } from '../types';


@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCard {
  @Input() task: StudyStep;
  @Input() selected: boolean;

  @select(['experiences', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;

  private experience: Experience;
  private scores: ScoreRollup;
  private browserScores: {name:string, score:number}[] = [];

  private subs: Subscription[] = [];

  constructor(private actions: TaskActions) {
    this.subs.push(this.selectedExperience$.subscribe(x => this.experience = x));
    this.subs.push(this.scores$.subscribe(x => this.scores = x));
  }

  ngOnChanges() {
    if(this.experience && this.task && this.scores) {
      this.browserScores = [];

      this.scores.browserRollups.forEach(b => {
        let taskRollup = b.experienceRollups
          .find(e => e.id === this.experience.type.id).taskRollup
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
