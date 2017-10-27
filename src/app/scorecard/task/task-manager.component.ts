import { Component, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { StudyBrowser, StudyStep } from '../types';
import { IAppState } from '../../store';


@Component({
  selector: 'task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManager {
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;
  @select(['task', 'taskList']) taskList$: Observable<{[key: string]: StudyStep[]}>;

  private subs: Subscription[] = [];

  private browserList: StudyBrowser[] = [];
  private selectedTask: StudyStep;
  private taskList: StudyStep[] = [];

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedTask$.subscribe(x => this.selectedTask = x));
    this.subs.push(this.taskList$.subscribe(x => {
      if(x) {
        let appState = this.ngRedux.getState();
        let key = `${appState.user.selectedStudy.id}-${appState.user.selectedExperience.type.id}`;

        this.taskList = x[key] || [];
        this.browserList = appState.browser.browserList;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
