import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyOptions, StudyStep } from '../../scorecard/types';
import { IAppState } from '../';
import { FeedbackActions } from '../feedback/feedback.actions';


@Injectable()
export class TaskActions implements OnDestroy {
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  static FETCH_TASKS = 'FETCH_TASKS';
  static FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
  static FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

  private subs: Subscription[] = [];

  private task: StudyStep;

  constructor(
    private feedbackActions: FeedbackActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.selectedTask$.subscribe(t => {
      if(t) {
        // perform fetches for task change
        let userState = this.ngRedux.getState().user;

        this.feedbackActions.fetchFeedback(userState.selectedStudy.id, userState.selectedExperience.type.id, t.id);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  fetchTasks(studyId: number, experienceId: number): void {
    this.ngRedux.dispatch({
      type: TaskActions.FETCH_TASKS,
      payload: {
        studyId,
        experienceId
      },
    });
  }

}
