import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ScorecardRoutingModule } from './scorecard-routing.module';

import { BrowserPanel, BrowserPicker } from './browser-picker';
import { BrowserSummary } from './browser-summary';
import { BrowserManager, FeedbackCard, FeedbackManager, Picker, PickerPanel } from './feedback-card';
import { DimensionDefinitions } from './dimension-definitions';
import { DimensionDetailsManager, DimensionCardAssociative, DimensionCardGraded } from './dimensions';
import { ExperienceTabs, ExperienceInsights, ExperienceTopIssues } from './experience-picker';
import { Header, HeaderNav } from './header';
import { ScoreBreakdown } from './score-breakdown';
import { ScoreMeter } from './score-meter';
import { ScorecardComponent } from './scorecard.component';
import { StudyPanel, StudyPicker  } from './study-picker';
import { SummaryInsight } from './insights';
import { TaskCard, TaskManager } from './task';
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
    BrowserSummary,
    DimensionDefinitions,
    DimensionDetailsManager,
    DimensionCardAssociative,
    DimensionCardGraded,
    ExperienceTabs,
    ExperienceInsights,
    ExperienceTopIssues,
    FeedbackCard,
    FeedbackManager,
    Header,
    HeaderNav,
    Picker,
    PickerPanel,
    ScoreBreakdown,
    ScoreMeter,
    ScorecardComponent,
    StudyPanel,
    StudyPicker,
    SummaryInsight,
    TaskCard,
    TaskManager,
    TopIssues,
  ],
  providers: [],
})
export class ScorecardModule {}
