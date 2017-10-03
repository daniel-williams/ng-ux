import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IAppState, IStudyState, StudyActions } from '../../store';
import { Study } from '..//types';

@Component({
  selector: 'past-studies',
  templateUrl: './past-studies.component.html',
  styleUrls: ['./past-studies.component.scss']
})
export class PastStudies implements OnDestroy {
  @select(['study', 'studyList']) studyList$: Observable<Study[]>;
  @select(['study', 'showPanel']) showPanel$: Observable<boolean>;

  private studies: any = [];
  private showPanel: boolean = false;
  private subs: Subscription[] = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private studyActions: StudyActions) {
    this.subs.push(this.studyList$.subscribe(x => this.studies = x));
    this.subs.push(this.showPanel$.subscribe(x => this.showPanel = x));

    ngRedux.dispatch({ type: StudyActions.FETCH_STUDIES });
  }

  changeStudy(id: number) {
    this.studyActions.setStudy(id);
  }
  
  togglePanel(evt: any) {
    this.studyActions.togglePanel();
  }
  openPanel(evt: any) {
    this.studyActions.openPanel();
  }
  closePanel(evt: any) {
    this.studyActions.closePanel();
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
