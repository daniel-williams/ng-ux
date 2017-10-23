import { Component, Input } from '@angular/core';

import { Experience } from '../types';


@Component({
  selector: 'experience-top-issues',
  templateUrl: './experience-top-issues.component.html',
  styleUrls: ['./experience-top-issues.component.scss'],
})
export class ExperienceTopIssues {
  @Input() experience: Experience;
}
