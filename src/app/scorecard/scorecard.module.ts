import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ScorecardRoutingModule } from './scorecard-routing.module';

import { Header, HeaderNav, PastStudies, StudyPanel } from './header';
import { FeedbackCard } from './feedback-card';
import { ScoreBreakdown } from './score-breakdown';
import { ScoreMeter } from './score-meter';
import { ScorecardComponent } from './scorecard.component';


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
  ],
  providers: [
  ]
})
export class ScorecardModule {}
