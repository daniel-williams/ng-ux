import { Component, Input, OnDestroy, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
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


import { FeedbackActions, Status } from '../../store';
import { FeedbackCardData, StudyOptions } from '../types';

import { FeedbackCard } from './feedback-card.component';


@Component({
  selector: 'feedback-manager',
  templateUrl: './feedback-manager.component.html',
  styleUrls: ['./feedback-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'feedback-manager',
  },
  animations: [
    trigger('fade', [
      transition(':enter', [style({opacity: 0}), animate('.6s ease')])
    ]),
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('3s', [animateChild()]), {optional: true})
      ])
    ])
  ]
})
export class FeedbackManager implements OnDestroy {
  @Input() study: number;
  @Input() browser: string;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;
  @select(['feedback', 'feedbackDataListStatus']) feedbackDataListStatus$: Observable<{[key: string]: Status}>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['browser', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;

  @ViewChildren(FeedbackCard) feedbackCards: QueryList<FeedbackCard>;

  private feedbackDataList: FeedbackCardData[] = [];
  private feedbackDataListStatus: Status = Status.notFetched;
  private selectedStudy: number;
  private subs: Subscription[] = [];

  private manualFetch$ = new Subject();
  private cardData: FeedbackCardData[] = [];
  private lastCardIndex = 0;

  constructor(private feedbackActions: FeedbackActions) {
    this.fetchMore = this.fetchMore.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.simSort = this.simSort.bind(this);
  }

  ngAfterViewInit() {
    this.subs.push(this.feedbackDataList$.subscribe(x => {
      let key = `${this.study}-${this.browser}`;

      if(!!x && !!x[key] && this.feedbackDataList.length === 0) {
        this.feedbackDataList = x[key];
        this.simSort();
      }
    }));
    
    this.feedbackActions.fetchFeedback({ study: this.study, browser: this.browser });

    setTimeout(() => this.manualFetch$.subscribe(), 0);

    this.feedbackCards.changes.subscribe((x: QueryList<FeedbackCard>) => {
      let cards = x.toArray().slice(this.lastCardIndex);

      cards.forEach((x, index) => x.animate(index * .1 + .2));
      this.lastCardIndex += cards.length;
    });
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  fetchMore(): Promise<any> {
    if(this.cardData.length >= 30) {
      return Promise.reject(false);
    }

    let fetchCount = this.getFetchCount();

    return new Promise(resolve => {
      setTimeout(() => {
        if(this.cardData.length + fetchCount > 30) {
          fetchCount = Math.abs(30 - this.cardData.length + fetchCount);
        }

        let newCards = this.feedbackDataList.slice(this.cardData.length, this.cardData.length + fetchCount);

        this.cardData = this.cardData.concat(newCards);
        setTimeout(() => resolve(true), 0);
      }, 0);
    }).then(_ => {
      // return this.build();
      return Promise.resolve();
    });
  }

  clearItems() {
    this.cardData = [];
  }

  simSort() {
    this.cardData = [];
    this.manualFetch$.next('reset');
  }

  getFetchCount(): number {
    let maxFetchCount = Math.floor(window.innerWidth / 350);
    let shortfall = this.cardData.length % maxFetchCount;

    let fetchCount = shortfall > 0
      ? maxFetchCount + (maxFetchCount - shortfall)
      : maxFetchCount;

    return fetchCount;
  }
}
