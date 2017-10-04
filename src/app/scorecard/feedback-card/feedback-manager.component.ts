import { Component, OnDestroy, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { Easing, TimelineMax, TweenMax } from '../../core';
import { FeedbackActions, Status } from '../../store';
import { FeedbackCardData, StudyOptions } from '../types';

import { FeedbackCard } from './feedback-card.component';


@Component({
  selector: 'feedback-manager',
  templateUrl: './feedback-manager.component.html',
  styleUrls: ['./feedback-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackManager implements OnDestroy {
  @select(['feedback', 'feedbackCardDataList']) feedbackCardDataList$: Observable<FeedbackCardData[]>;
  @select(['feedback', 'feedbackCardDataListStatus']) feedbackCardDataListStatus$: Observable<Status>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['browser', 'selectedBrowsers'])  selectedBrowsers$: Observable<string[]>;

  @ViewChildren(FeedbackCard) feedbackCards: QueryList<FeedbackCard>;

  private feedbackCardDataList: FeedbackCardData[] = [];
  private feedbackCardDataListStatus: Status = Status.notFetched;
  private selectedStudy: number;
  private subs: Subscription[] = [];

  private manualFetch$ = new Subject();
  private cardData: FeedbackCardData[] = [];
  private lastCardIndex = 0;

  constructor(private feedbackActions: FeedbackActions) {
    this.subs.push(this.feedbackCardDataList$.subscribe(x => {
      this.feedbackCardDataList = x;
      this.simSort();
    }));
    this.subs.push(this.feedbackCardDataListStatus$.subscribe(x => this.feedbackCardDataListStatus = x));
    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.selectedStudy = x.id;
      }
    }));
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      if(!!x && x.length) {
        this.feedbackActions.fetchFeedback({ id: this.selectedStudy, browsers: [] });
      } else {
        this.clearItems();
      }
    }));

    this.fetchMore = this.fetchMore.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.simSort = this.simSort.bind(this);
    this.build = this.build.bind(this);
  }

  ngAfterViewInit() {
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

        let newCards = this.feedbackCardDataList.slice(this.cardData.length, this.cardData.length + fetchCount);

        this.cardData = this.cardData.concat(newCards);
        setTimeout(() => resolve(true), 0);
      }, 0);
    }).then(_ => {
      return this.build();
    });
  }

  clearItems() {
    let items = document.querySelectorAll('.grid-item');
    
    TweenMax.to(items, .2, {
      opacity: 0,
      ease: Easing.Power4.easeIn,
      onComplete: () => {
        this.lastCardIndex = 0;
        this.cardData = [];
      }
    });
  }

  simSort() {
    let items = document.querySelectorAll('.grid-item');

    TweenMax.to(items, .2, {
      opacity: 0,
      ease: Easing.Power4.easeIn,
      onComplete: () => {
        this.lastCardIndex = 0;
        this.cardData = [];
        this.manualFetch$.next('reset');
      }
    });
  }

  build(): Promise<any> {
    let items = document.querySelectorAll('.grid-item.new');
    let timeline = new TimelineMax({paused: true});

    for(var i = 0; i < items.length; i++) {
      timeline.to(items[i], .3, {
        opacity: 1,
        left: 0,
        ease: Easing.Power4.easeOut,
        onComplete: (item: HTMLElement) => item.classList.remove('new'),
        onCompleteParams: [items[i]]
      }, (i * .1));
    }

    return this.timelinePromise(timeline);
  }

  getFetchCount(): number {
    let maxFetchCount = Math.floor(window.innerWidth / 350);
    let shortfall = this.cardData.length % maxFetchCount;

    let fetchCount = shortfall > 0
      ? maxFetchCount + (maxFetchCount - shortfall)
      : maxFetchCount;

    return fetchCount;
  }

  timelinePromise(timeline: any): Promise<any> {
     return new Promise(resolve => {
        timeline.eventCallback("onComplete", () => resolve(true));
        timeline.play();
     });
  }
}
