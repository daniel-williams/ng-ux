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

import { Experience, StudyOptions, StudyStep } from '../types';


@Component({
  selector: 'task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  animations: [
    trigger('cardState', [
      transition(`:enter`, [
        style({ transform: 'translateX(100px)', opacity: 0.5}),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0px)', opacity: 1 }))
      ]),
      transition(`:leave`, [
        style({ opacity: 1 }),
        animate('0.2s ease-out', style({ opacity: 0 }))
      ]),
    ]),
  ],
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
