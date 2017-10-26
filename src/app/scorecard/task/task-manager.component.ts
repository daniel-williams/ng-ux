import { Component, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyBrowser, StudyOptions, StudyStep } from '../types';
import { ScoreRollup, UxScorecardService } from '../../shared';


@Component({
  selector: 'task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManager {
  @Input() experience: Experience;
  @Input() study: StudyOptions;

  @select(['browser', 'browserList']) browserList$: Observable<StudyBrowser[]>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;
  @select(['task', 'taskList']) taskList$: Observable<{[key: string]: StudyStep[]}>;
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  private subs: Subscription[] = [];
  private browserList: StudyBrowser[] = [];
  private scores: ScoreRollup;
  private selectedTask: StudyStep;
  private taskList: StudyStep[] = [];
  private taskListDictionary: {[key: string]: StudyStep[]} = {};

  constructor(private uxss: UxScorecardService) {
    this.subs.push(this.browserList$.subscribe(x => this.browserList = x));
    this.subs.push(this.scores$.subscribe(x => this.scores = x));
    this.subs.push(this.selectedTask$.subscribe(x => this.selectedTask = x));
    this.subs.push(this.taskList$.subscribe(x => this.taskListDictionary = x));
  }

  ngOnChanges() {
    if(this.taskListDictionary[this.key]) {
      this.taskList = this.taskListDictionary[this.key];
    }
  }

  get key(): string {
    let studyId = this.study && this.study.id || '';
    let experienceId = this.experience && this.experience.type.id || '';

    return `${studyId}-${experienceId}`;
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
