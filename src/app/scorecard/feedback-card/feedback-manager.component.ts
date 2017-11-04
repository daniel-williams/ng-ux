import { Component, ElementRef, Input, OnDestroy, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

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
  animations: [
    trigger('state', [
      transition(':enter', [
        style({transform: 'translateX(100px)', opacity: 0}),
        animate('0.2s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
  ],
})
export class FeedbackManager implements OnDestroy {
  @Input() browser: string;
  @Input() cellWidth: string;
  @Input() sort: string;
  @Input() cellCount: number = 1;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  @ViewChild('title') titleRef: ElementRef;
  @ViewChild('titleWrap') titleWrapRef: ElementRef;

  private subs: Subscription[] = [];

  private cardData: FeedbackCardData[] = [];
  private enableInfiniteScroll = true;
  private feedbackDataList: FeedbackCardData[] = [];
  private lastShownIndex = 0;
  private minCellSize = 350;
  private task: StudyStep;
  private title: HTMLElement;
  private titleWrap: HTMLElement;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngAfterViewInit() {
    this.title = this.titleRef.nativeElement;
    this.titleWrap = this.titleWrapRef.nativeElement;

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
      if(x) {
        let { user, feedback } = this.ngRedux.getState();
        let key = `${user.selectedStudy.id}-${user.selectedExperience.type.id}-${x.id}`;

        if(feedback.feedbackDataList[key]) {
          this.feedbackDataList = feedback.feedbackDataList[key].filter(f => f.userDetails['__browser'] === this.browser);
        }
        this.sortFeedback();
      }
    }));

    // recalculate cell width on browser resize
    this.subs.push(Observable.fromEvent(window, 'scroll')
    .throttleTime(200)
    .subscribe(() => this.updateStickyStatus()));
  }

  ngOnChanges(changes: SimpleChanges) {
    let newSort = changes['sort'] && changes['sort'].currentValue || null;
    let newCellCount = changes['cellCount'] && changes['cellCount'].currentValue || null;

    if(newSort) {
      this.sort = newSort;
      this.sortFeedback();
    }

    if(newCellCount) {
      setTimeout(this.showMore, 0);
    }
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  updateStickyStatus = () => {
    let top = this.titleWrap.getBoundingClientRect().top;

    this.title.style.width = '' + this.titleWrap.getBoundingClientRect().width + 'px';

    if(top <=0) {
      this.title.classList.add('stick');
    } else {
      this.title.classList.remove('stick');
    }
  }

  sortFeedback = () => {
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
    let adds = this.lastShownIndex % this.cellCount;
    let startIndex = this.lastShownIndex;
    let endIndex = startIndex + (adds || this.cellCount);
    let newCardData = this.feedbackDataList.slice(startIndex, endIndex);
    let delayCounter = 0;

    this.lastShownIndex = endIndex;

    while(newCardData.length) {
      let item = newCardData.splice(0,1)[0];

      setTimeout(() => {
        this.cardData.push(item);
      }, 100 * delayCounter);
      delayCounter += 1;
    }
    setTimeout(() => this.cardData = this.cardData.concat(newCardData), 0);

    if(endIndex === this.feedbackDataList.length) {
      this.enableInfiniteScroll = false;
    }
  }
}
