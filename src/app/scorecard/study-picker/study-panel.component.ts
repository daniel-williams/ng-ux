import { Component, Input } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

import { UserActions } from '../../store';
import { Study, StudyOptions } from '../types';


@Component({
  selector: 'study-panel',
  templateUrl: './study-panel.component.html',
  styleUrls: ['./study-panel.component.scss'],
  animations: [
    trigger('panelState', [
      transition(`:enter`, [
        style({transform: 'scale(1.0)', opacity: 0}),
        animate('0.2s ease-out', style({ transform: 'scale(1.2)', opacity: 1 }))
      ]),
      transition(`:leave`, [
        style({ transform: 'scale(1.2)', opacity: 1 }),
        animate('0.2s ease-out', style({ transform: 'scale(1.0)', opacity: 0 }))
      ]),
    ]),
  ],
})
export class StudyPanel {
  @Input() showPanel: boolean;
  @Input() studyList: Study[];
  @Input() study: StudyOptions;

  constructor(private actions: UserActions) { }

  changeStudy(s: StudyOptions) {
    this.actions.setStudy(s);
  }

}
