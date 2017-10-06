import { Component, ElementRef, Input, ViewChildren, QueryList } from '@angular/core';


import { ScoreBreakdown } from '../score-breakdown';
import { FeedbackCardData } from '../types';

@Component({
  selector: 'feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
})
export class FeedbackCard {
  @Input('cardData') card: FeedbackCardData;

  @ViewChildren(ScoreBreakdown) scoreBreakdownList: QueryList<ScoreBreakdown>;

  private breakdown: HTMLElement;

  constructor(public el: ElementRef) {}

  public animate(delay: number = 0) {
    setTimeout(() => this.scoreBreakdownList.toArray().forEach(x => x.animate()), (delay * 1000));
  }

  toggleComment(card: any) {
    setTimeout(() => card.toggle = !card.toggle, 0);
  }
}