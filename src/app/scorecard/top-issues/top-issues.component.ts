import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'top-issues',
  templateUrl: './top-issues.component.html',
  styleUrls: ['./top-issues.component.scss']
})
export class TopIssues implements OnDestroy {
  @select(['study', 'topIssues']) topIssues$: Observable<string[]>;

  private subs: Subscription[] = [];
  private topIssues: string[] = [];

  constructor() {
    this.subs.push(this.topIssues$.subscribe(x => this.topIssues = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}