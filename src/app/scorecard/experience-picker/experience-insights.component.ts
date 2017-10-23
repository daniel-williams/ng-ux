import { Component, Input } from '@angular/core';

import { Experience } from '../types';


@Component({
  selector: 'experience-insights',
  templateUrl: './experience-insights.component.html',
  styleUrls: ['./experience-insights.component.scss'],
})
export class ExperienceInsights {
  @Input() experience: Experience;
}
