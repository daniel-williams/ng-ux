import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, IAppState, Status, IStudyState, StudyActions } from '../../store';
import { Study, StudyOptions } from '../types';


@Component({
  selector: 'past-studies',
  templateUrl: './past-studies.component.html',
  styleUrls: ['./past-studies.component.scss']
})
export class PastStudies implements OnDestroy {
  @select(['study', 'studyListStatus']) studyListStatus$: Observable<Status>;
  @select(['study', 'studyList']) studyList$: Observable<Study[]>;
  @select(['study', 'showPanel']) showPanel$: Observable<boolean>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private selectedStudy: StudyOptions;
  private showPanel: boolean = false;
  private studies: Study[] = [];
  private subs: Subscription[] = [];

  constructor(
    private browserActions: BrowserActions,
    private studyActions: StudyActions) {

    this.subs.push(this.studyList$.subscribe(x => this.studies = x));
    this.subs.push(this.showPanel$.subscribe(x => this.showPanel = x));
    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.selectedStudy = x;
      }
    }));
    this.subs.push(this.studyListStatus$.subscribe(x => {
      if(x === Status.notFetched || x === Status.errorFetching) {
        this.studyActions.fetchStudies();
      }
    }));
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
