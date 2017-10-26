import { Component, Input, OnDestroy, SimpleChanges, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import {
  animate,
  animateChild,
  keyframes,
  query,
  stagger,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { Status } from '../../store';
import { Experience, FeedbackCardData, StudyOptions, StudyStep } from '../types';

import { FeedbackCard } from './feedback-card.component';


@Component({
  selector: 'feedback-manager',
  templateUrl: './feedback-manager.component.html',
  styleUrls: ['./feedback-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'feedback-manager',
  },
  // animations: [
  //   trigger('fade', [
  //     transition(':enter', [style({opacity: 0}), animate('.6s ease')])
  //   ]),
  //   trigger('stagger', [
  //     transition(':enter', [
  //       query(':enter', stagger('3s', [animateChild()]), {optional: true})
  //     ])
  //   ])
  // ]
})
export class FeedbackManager implements OnDestroy {
  @Input() browser: string;
  @Input() cellWidth: string;
  @Input() feedbackSort: string;
  @Input() sort: string;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;

  @select(['user', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['user', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['user', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  @ViewChildren(FeedbackCard) feedbackCards: QueryList<FeedbackCard>;

  private subs: Subscription[] = [];

  private feedbackDataList: FeedbackCardData[] = [];

  private manualFetch$ = new Subject();
  private cardData: FeedbackCardData[] = [];
  private lastCardIndex = 0;
  private minCellSize = 350;
  private dataKey = '';

  private study: StudyOptions;
  private experience: Experience;
  private task: StudyStep;

  constructor() {
    this.clearItems = this.clearItems.bind(this);
    this.resetFeedbackGrid = this.resetFeedbackGrid.bind(this);

    this.subs.push(this.selectedStudy$.subscribe(x => this.study = x));
    this.subs.push(this.selectedExperience$.subscribe(x => this.experience = x));
    this.subs.push(this.selectedTask$.subscribe(x => this.task = x));
  }

  ngAfterViewInit() {
    this.subs.push(this.feedbackDataList$.subscribe(x => {
      if(x) {
        let key = this.getDataKey();

        this.feedbackDataList = [];
        this.lastCardIndex = 0;
        if(x[key]) {
          this.feedbackDataList = x[key].filter(f => f.userDetails['__browser'] === this.browser);
        }
        setTimeout(() => {
          this.cardData = this.feedbackDataList;
          this.sortFeedback(this.sort);
        }, 0);
      }
    }));

    // call animate on feedback cards
    // this.feedbackCards.changes.subscribe((x: QueryList<FeedbackCard>) => {
    //   let cards = x.toArray().slice(this.lastCardIndex);

    //   cards.forEach((x, index) => x.animate(index * .1 + .2));
    //   this.lastCardIndex += cards.length;
    // });
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

  getDataKey(): string {
    let studyId = this.study && this.study.id || '-';
    let experienceId = this.experience && this.experience.type.id || '-';
    let taskId = this.task && this.task.id || '-';

    return `${studyId}-${experienceId}-${taskId}`;
  }

  clearItems() {
    this.cardData = [];
  }

  resetFeedbackGrid() {
    this.cardData = [];
    this.lastCardIndex = 0;
    setTimeout(() => this.cardData = this.feedbackDataList, 0);
  }
}
