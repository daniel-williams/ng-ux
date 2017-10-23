import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyOptions, StudyStep } from '../../scorecard/types';
import { IAppState } from '../';
import { FeedbackActions } from '../feedback/feedback.actions';


@Injectable()
export class TaskActions implements OnDestroy {
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['experiences', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['task', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  static FETCH_TASKS = 'FETCH_TASKS';
  static FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
  static FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

  static SET_SELECTED_TASK = 'SET_SELECTED_TASK';

  private subs: Subscription[] = [];

  private study: StudyOptions;
  private experience: Experience;
  private task: StudyStep;

  constructor(
    private feedbackActions: FeedbackActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.selectedStudy$.subscribe(s => this.study = s));
    this.subs.push(this.selectedExperience$.subscribe(e => this.experience = e));
    this.subs.push(this.selectedTask$.subscribe(t => {
      if(t) {
        // perform fetches for task change
        this.feedbackActions.fetchFeedback(this.study.id, this.experience.type.id, t.id);
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

  setSelectedTask(task: StudyStep) {
    this.ngRedux.dispatch({
      type: TaskActions.SET_SELECTED_TASK,
      payload: task
    });
  }
}
