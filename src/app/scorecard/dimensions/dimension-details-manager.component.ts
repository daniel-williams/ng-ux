import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IAppState } from '../../store';
import { StudyBrowser, StudyStep } from '../types';
import { AssociativeDimension, ScoredDimension, TaskRollup } from '../../shared';


@Component({
  selector: 'dimension-details-manager',
  templateUrl: './dimension-details-manager.component.html',
  styleUrls: ['./dimension-details-manager.component.scss']
})
export class DimensionDetailsManager {
  @Input() browser: StudyBrowser;

  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  @ViewChild('container') containerRef: ElementRef;
  private subs: Subscription[] = [];

  private dimensions: (AssociativeDimension | ScoredDimension)[] = [];
  private taskRollup: TaskRollup;
  private wordCount: number = 0;

  private cellWidth: string = '100%';
  private minCellWidth = 300;

  constructor(private el: ElementRef, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedTask$.subscribe(x => this.setDimensions()));

    // recalculate cell width on browser resize
    this.subs.push(Observable
      .fromEvent(window, 'resize')
      .throttleTime(200).subscribe(x => {
        this.calculateCellWidth();
      }));
  }

  ngAfterViewInit() {
    setTimeout(() => this.calculateCellWidth(), 0);
  }

  ngOnChanges() {
    this.setDimensions();
  }

  calculateCellWidth(): void {
    if(this.containerRef) {
      let paneWidth = Math.floor(this.containerRef.nativeElement.clientWidth);
      let cellCount = Math.min(this.dimensions.length, Math.max(1, Math.floor(paneWidth / this.minCellWidth)));

      this.cellWidth = '' + ((1 / cellCount) * 100) + '%';
    }
  }

  setDimensions() {
    let { experiences, study, user } = this.ngRedux.getState();

    if(this.browser && user.selectedExperience && user.selectedTask && study.scores) {
      let browserRollup = study.scores.browserRollups.find(x => x.name === this.browser.name);

      if(browserRollup && browserRollup.experienceRollups) {
        this.taskRollup = browserRollup.experienceRollups
          .find(x => x.id === user.selectedExperience.type.id).taskRollup
          .find(x => x.id === user.selectedTask.id);

        if(this.taskRollup) {
          this.dimensions = [...this.taskRollup.scoredDimensions, ...this.taskRollup.associativeDimensions];
          this.wordCount = this.dimensions.length > 1 ? 5 : 0;
        }
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
