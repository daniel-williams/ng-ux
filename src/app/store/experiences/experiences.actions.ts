import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyOptions } from '../../scorecard/types';
import { IAppState } from '../';
import { TaskActions } from '../task/task.actions';


@Injectable()
export class ExperiencesActions implements OnDestroy {
  @select(['user', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['user', 'selectedExperience']) selectedExperience$: Observable<Experience>;

  static FETCH_EXPERIENCES = 'FETCH_EXPERIENCES';
  static FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
  static FETCH_EXPERIENCES_FAILED = 'FETCH_EXPERIENCES_FAILED';

  private study: StudyOptions;
  private experience: Experience;
  private subs: Subscription[] = [];

  constructor(
    private taskActions: TaskActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.selectedStudy$.subscribe(study => this.study = study));
    this.subs.push(this.selectedExperience$.subscribe(experience => {
      if(this.study && experience) {
        //perform fetches for experience change
        this.taskActions.fetchTasks(this.study.id, experience.type.id);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  fetchExperiences(studyId: number): void {
    this.ngRedux.dispatch({
      type: ExperiencesActions.FETCH_EXPERIENCES,
      payload: {
        studyId
      },
    });
  }

}
