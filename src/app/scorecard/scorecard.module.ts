import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ScorecardRoutingModule } from './scorecard-routing.module';

import { Header, HeaderNav, PastStudies, StudyPanel } from './header';
import { FeedbackCard } from './feedback-card';
import { ScoreBreakdown } from './score-breakdown';
import { ScoreMeter } from './score-meter';
import { ScorecardComponent } from './scorecard.component';
import { SummaryInsight } from './insights';
import { TopIssues } from './top-issues';


@NgModule({
  imports: [
    SharedModule,

    ScorecardRoutingModule,
  ],
  declarations: [
    FeedbackCard,
    Header,
    HeaderNav,
    PastStudies,
    ScoreBreakdown,
    ScoreMeter,
    ScorecardComponent,
    StudyPanel,
    SummaryInsight,
    TopIssues,
  ],
  providers: [
  ]
})
export class ScorecardModule {}
