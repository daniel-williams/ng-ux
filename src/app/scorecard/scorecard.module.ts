import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ScorecardRoutingModule } from './scorecard-routing.module';

import { BrowserPanel, BrowserPicker } from './browser-picker';
import { Header, HeaderNav } from './header';
import { BrowserManager, FeedbackCard, FeedbackManager } from './feedback-card';
import { ScoreBreakdown } from './score-breakdown';
import { ScoreMeter } from './score-meter';
import { ScorecardComponent } from './scorecard.component';
import { StudyPanel, StudyPicker  } from './study-picker';
import { SummaryInsight } from './insights';
import { TopIssues } from './top-issues';


@NgModule({
  imports: [
    SharedModule,

    ScorecardRoutingModule,
  ],
  declarations: [
    BrowserManager,
    BrowserPanel,
    BrowserPicker,
    FeedbackCard,
    FeedbackManager,
    Header,
    HeaderNav,
    ScoreBreakdown,
    ScoreMeter,
    ScorecardComponent,
    StudyPanel,
    StudyPicker,
    SummaryInsight,
    TopIssues,
  ],
  providers: [
  ]
})
export class ScorecardModule {}
