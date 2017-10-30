import { Component, Input, OnDestroy, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IAppState } from '../../store';
import { FeedbackCardData, StudyStep } from '../types';


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
  @Input() cellCount: number = 1;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  private subs: Subscription[] = [];

  private task: StudyStep;
  private cardData: FeedbackCardData[] = [];
  private feedbackDataList: FeedbackCardData[] = [];
  private lastShownIndex = 0;
  private minCellSize = 350;
  private enableInfiniteScroll = true;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngAfterViewInit() {
    this.subs.push(this.feedbackDataList$.subscribe(x => {
      if(x) {
        let { user } = this.ngRedux.getState();
        let key = `${user.selectedStudy.id}-${user.selectedExperience.type.id}-${user.selectedTask.id}`;

        this.task = user.selectedTask;

        this.feedbackDataList = [];
        if(x[key]) {
          this.feedbackDataList = x[key].filter(f => f.userDetails['__browser'] === this.browser);
        }
        this.sortFeedback();
      }
    }));
    this.subs.push(this.selectedTask$.subscribe(x => {
      console.log('selected task changed: ', x);
      if(x) {
        let { user, feedback } = this.ngRedux.getState();
        let key = `${user.selectedStudy.id}-${user.selectedExperience.type.id}-${x.id}`;

        if(feedback.feedbackDataList[key]) {
          console.log('new feedback found');
          this.feedbackDataList = feedback.feedbackDataList[key].filter(f => f.userDetails['__browser'] === this.browser);
        }
        this.sortFeedback();
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    let newSort = changes['sort'] && changes['sort'].currentValue || null;

    if(newSort) {
      this.sort = newSort;
      this.sortFeedback();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  sortFeedback() {
    switch(this.sort) {
      case 'Avg Score': {
        this.feedbackDataList = this.feedbackDataList.sort((a, b) => {
          let _a = a.scoreAverage;
          let _b = b.scoreAverage;

          return _a < _b ? -1 : _b < _a ? 1 : 0;
        });
        break;
      }
      default: {
        this.feedbackDataList = this.feedbackDataList.sort((a, b) => {
          let _a = (a.scores.find(x => x.name === this.sort) || {} as any).value;
          let _b = (b.scores.find(x => x.name === this.sort) || {} as any).value;

          return _a < _b ? -1 : _b < _a ? 1 : 0;
        });
        break;
      }
    }
    this.resetGrid();
  }

  resetGrid = () => {
    this.lastShownIndex = 0;
    this.cardData = [];
    this.enableInfiniteScroll = true;
  }

  showMore = () => {
    let startIndex = this.lastShownIndex;
    let endIndex = startIndex + this.cellCount;
    let newCardData = this.feedbackDataList.slice(startIndex, endIndex);

    this.lastShownIndex = endIndex;
    setTimeout(() => this.cardData = this.cardData.concat(newCardData), 0);
    if(endIndex === this.feedbackDataList.length) {
      this.enableInfiniteScroll = false;
    }
  }
}
