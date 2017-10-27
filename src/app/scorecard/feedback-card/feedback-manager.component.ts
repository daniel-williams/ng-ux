import { Component, Input, OnDestroy, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IAppState } from '../../store';
import { FeedbackCardData } from '../types';


@Component({
  selector: 'feedback-manager',
  templateUrl: './feedback-manager.component.html',
  styleUrls: ['./feedback-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'feedback-manager',
  },
})
export class FeedbackManager implements OnDestroy {
  @Input() browser: string;
  @Input() cellWidth: string;
  @Input() sort: string;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;

  private subs: Subscription[] = [];

  private cardData: FeedbackCardData[] = [];
  private feedbackDataList: FeedbackCardData[] = [];
  private minCellSize = 350;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.clearItems = this.clearItems.bind(this);
    this.resetFeedbackGrid = this.resetFeedbackGrid.bind(this);
  }

  ngAfterViewInit() {
    this.subs.push(this.feedbackDataList$.subscribe(x => {
      if(x) {
        let { user } = this.ngRedux.getState();
        let key = `${user.selectedStudy.id}-${user.selectedExperience.type.id}-${user.selectedTask.id}`;

        this.feedbackDataList = [];
        if(x[key]) {
          this.feedbackDataList = x[key].filter(f => f.userDetails['__browser'] === this.browser);
        }
        setTimeout(() => {
          this.cardData = this.feedbackDataList;
          this.sortFeedback(this.sort);
        }, 0);
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    let newSort = changes['sort'] && changes['sort'].currentValue || null;

    if(newSort) {
      this.sortFeedback(newSort);
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  sortFeedback(sort: string) {
    switch(sort) {
      case 'Avg Score': {
        this.cardData = this.cardData.sort((a, b) => {
          let _a = a.scoreAverage;
          let _b = b.scoreAverage;

          return _a < _b ? -1 : _b < _a ? 1 : 0;
        });
        break;
      }
      default: {
        this.cardData = this.cardData.sort((a, b) => {
          let _a = (a.scores.find(x => x.name === sort) || {} as any).value;
          let _b = (b.scores.find(x => x.name === sort) || {} as any).value;

          return _a < _b ? -1 : _b < _a ? 1 : 0;
        });
        break;
      }
    }
  }

  clearItems() {
    this.cardData = [];
  }

  resetFeedbackGrid() {
    this.cardData = [];
    setTimeout(() => this.cardData = this.feedbackDataList, 0);
  }
}
