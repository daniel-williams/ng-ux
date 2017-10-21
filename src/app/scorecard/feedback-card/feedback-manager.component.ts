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
  @Input() study: StudyOptions;
  @Input() browser: string;
  @Input() cellWidth: string;

  @select(['feedback', 'feedbackDataList']) feedbackDataList$: Observable<{[key: string]: FeedbackCardData[]}>;

  @select(['experiences', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['task', 'selectedTask']) selectedTask$: Observable<StudyStep>;

  @ViewChildren(FeedbackCard) feedbackCards: QueryList<FeedbackCard>;

  private subs: Subscription[] = [];

  private feedbackDataList: FeedbackCardData[] = [];

  private manualFetch$ = new Subject();
  private cardData: FeedbackCardData[] = [];
  private lastCardIndex = 0;
  private minCellSize = 350;
  private dataKey = '';

  private experience: Experience;
  private task: StudyStep;

  constructor(private feedbackActions: FeedbackActions) {
    this.clearItems = this.clearItems.bind(this);
    this.resetFeedbackGrid = this.resetFeedbackGrid.bind(this);

    this.subs.push(this.selectedExperience$.subscribe(x => {
      this.experience = x;
      this.updateFeedback();
    }));
    this.subs.push(this.selectedTask$.subscribe(x => {
      this.task = x;
      this.updateFeedback();
      this.lastCardIndex = 0;
    }));
  }

  ngAfterViewInit() {
    this.subs.push(this.feedbackDataList$.subscribe(x => {
      if(x) {
        this.feedbackDataList = x[this.dataKey] || [];
        setTimeout(() => this.cardData = this.feedbackDataList, 0);
      }
    }));

    // call animate on feedback cards
    this.feedbackCards.changes.subscribe((x: QueryList<FeedbackCard>) => {
      let cards = x.toArray().slice(this.lastCardIndex);

      cards.forEach((x, index) => x.animate(index * .1 + .2));
      this.lastCardIndex += cards.length;
    });
  }

  ngOnChanges() {
    this.updateFeedback();
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  updateFeedback() {
    if(this.study && this.browser && this.experience && this.task) {
      this.createDataKey();
      
      this.feedbackActions.fetchFeedback({
        studyId: this.study.id,
        browser: this.browser,
        experienceId: this.experience.type.id,
        taskId: this.task.id
      });
    }
  }

  createDataKey(): void {
    let studyId = this.study && this.study.id || '';

    this.dataKey = `${studyId}-${this.browser}`;
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
