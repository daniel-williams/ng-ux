import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Experience, StudyOptions } from '../types';
import { IAppState, Status, ExperiencesActions } from '../../store';

@Component({
  selector: 'experience-tabs',
  templateUrl: './experience-tabs.component.html',
  styleUrls: ['./experience-tabs.component.scss']
})
export class ExperienceTabs {
  @select(['experiences', 'experienceList']) experienceList$: Observable<{[key: string]: Experience[]}>;
  @select(['experiences', 'experienceListStatus']) experienceListStatus$: Observable<{[key: string]: Status}>;
  @select(['experiences', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private selectedStudy: StudyOptions;
  private selectedExperience: Experience;
  private experienceList: {[key: string]: Experience[]} = {};
  private experiences: Experience[] = [];
  private experienceListStatus: {[key: string]: Status};
  
  private subs: Subscription[] = [];

  constructor(private experiencesActions: ExperiencesActions, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedExperience$.subscribe(x => {
      this.selectedExperience = x;
    }));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
    this.subs.push(this.experienceList$.subscribe(x => {
      if(x && this.selectedStudy) {
        this.experienceList = x;
        this.experiences = this.experienceList[this.selectedStudy.id]
          ? this.experienceList[this.selectedStudy.id]
          : [];
      }
    }));
    this.subs.push(this.experienceListStatus$.subscribe(x => this.experienceListStatus = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  selectExperience(experience: Experience) {
    this.experiencesActions.setSelectedExperience(experience);
  }
}
