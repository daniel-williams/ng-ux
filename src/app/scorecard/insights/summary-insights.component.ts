import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'summary-insights',
  templateUrl: './summary-insights.component.html',
  styleUrls: ['./summary-insights.component.scss']
})
export class SummaryInsight implements OnDestroy {
  @select(['study', 'insights']) insights$: Observable<string[]>;

  private subs: Subscription[] = [];

  private insights: string[] = [];

  constructor() {
    this.subs.push(this.insights$.subscribe(x => this.insights = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}