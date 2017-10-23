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
  @Input() study: StudyOptions;
  @Input() experience: Experience;

  @select(['task', 'taskList']) taskList$: Observable<{[key: string]: StudyStep[]}>;
  @select(['task', 'selectedTask']) selectedTask$: Observable<StudyStep>;
  
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;
  @select(['browser', 'browserList']) browserList$: Observable<StudyBrowser[]>;

  private subs: Subscription[] = [];
  private taskListDictionary: {[key: string]: StudyStep[]} = {};
  private taskList: StudyStep[] = [];
  private selectedTask: StudyStep;

  private browserList: StudyBrowser[] = [];
  private scores: ScoreRollup;

  constructor(private uxss: UxScorecardService) {
    this.subs.push(this.taskList$.subscribe(x => this.taskListDictionary = x));
    this.subs.push(this.selectedTask$.subscribe(x => this.selectedTask = x));
    this.subs.push(this.scores$.subscribe(x => this.scores = x));
    this.subs.push(this.browserList$.subscribe(x => this.browserList = x));
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
