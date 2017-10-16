import { Component, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyOptions, StudyStep } from '../types';


@Component({
  selector: 'task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManager {
  @Input() study: StudyOptions;
  @Input() experience: Experience;
  @select(['task', 'taskList']) taskList$: Observable<{[key: string]: StudyStep[]}>;

  private subs: Subscription[] = [];
  private taskListDictionary: {[key: string]: StudyStep[]} = {};
  private taskList: StudyStep[] = [];

  constructor() {
    this.subs.push(this.taskList$.subscribe(x => this.taskListDictionary = x));
  }

  ngOnChanges() {
    if(this.taskListDictionary[this.key]) {
      console.log('tasks: ', this.taskListDictionary[this.key], this.key);
      this.taskList = this.taskListDictionary[this.key];
    }
  }

  get key(): string {
    let studyId = this.study && this.study.id || '';
    let experienceId = this.experience && this.experience.id || '';

    return `${studyId}-${experienceId}`;
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
