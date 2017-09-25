import { Component, ElementRef, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Easing, TimelineMax, TweenMax } from '../core';
import { UxScorecardService } from './ux-scorecard.service';
import { FeedbackCardData, Score } from './types';

import { FeedbackCard } from './feedback-card';


@Component({
  selector: 'scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScorecardComponent {
  @ViewChildren(FeedbackCard) feedbackCards: QueryList<FeedbackCard>;

  private feedbackCardData: FeedbackCardData[] = [];
  private cardData: FeedbackCardData[] = [];

  private sub = new Subject();
  private click$: Observable<any>;
  private lastCardIndex = 0;

  private studies: any = [];
  private browsers: any = [];

  constructor(private scorecardService: UxScorecardService, private changeDetector: ChangeDetectorRef) {
    this.build = this.build.bind(this);
    this.simSort = this.simSort.bind(this);
    this.fetchMore = this.fetchMore.bind(this);

    scorecardService.getStudies().then(studies => {
      this.studies = studies;
      scorecardService.getStudyBrowsers(this.studies[0].id).then(browsers => {
        this.browsers = browsers;
      });
      scorecardService.getFeedbackCardData(this.studies[0].id, "").then(feedbackCardData => {
        this.feedbackCardData = feedbackCardData;
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.click$ = (this.sub).asObservable();
      this.sub.subscribe();
    }, 0);

    this.feedbackCards.changes.subscribe((x: QueryList<FeedbackCard>) => {
      let cards = x.toArray().slice(this.lastCardIndex);

      cards.forEach((x, index) => x.animate(index * .1 + .2));
      this.lastCardIndex += cards.length;
    });
  }

  fetchMore(): Promise<any> {
    // TODO djw: determine max records from study data
    if(this.cardData.length >= 30) {
      return Promise.reject(false);
    }

    let fetchCount = this.getFetchCount();

    return new Promise(resolve => {
      setTimeout(() => {
        if(this.cardData.length + fetchCount > 30) {
          fetchCount = Math.abs(30 - this.cardData.length + fetchCount);
        }

        let newCards = this.feedbackCardData.slice(this.cardData.length, this.cardData.length + fetchCount);

        this.cardData = this.cardData.concat(newCards);
        setTimeout(() => resolve(true), 0);
      }, 0);
    }).then(_ => {
      return this.build();
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
        this.sub.next('reset');
      }
    });
  }

  build(): Promise<any> {
    let items = document.querySelectorAll('.grid-item.new');
    // console.log('new items: ', items.length);
    let timeline = new TimelineMax({paused: true});

    for(var i = 0; i < items.length; i++) {
      timeline.to(items[i], .3, {
        opacity: 1,
        left: 0,
        ease: Easing.Power4.easeOut,
        onComplete: (item: HTMLElement) => {
          item.classList.remove('new');
        },
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
        timeline.eventCallback("onComplete", () => {
          // console.log('transition end');
          resolve(true);
        });
        timeline.play();
        // console.log('transition begin');
     });
  }
}