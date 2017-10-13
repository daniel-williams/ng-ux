import { Component, Input } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

import { BrowserActions } from '../../store';
import { StudyBrowser } from '../types';


@Component({
  selector: 'browser-panel',
  templateUrl: './browser-panel.component.html',
  styleUrls: ['./browser-panel.component.scss'],
  animations: [
    trigger('panelState', [
      transition(`:enter`, [
        style({transform: 'scale(0.7)', opacity: 0}),
        animate('0.2s ease-out', style({ transform: 'scale(1.0)', opacity: 1 }))
      ]),
      transition(`:leave`, [
        style({ transform: 'scale(1.0)', opacity: 1 }),
        animate('0.2s ease-out', style({ transform: 'scale(0.7)', opacity: 0 }))
      ]),
    ]),
  ],
})
export class BrowserPanel {
  @Input() showPanel: boolean;
  @Input() browserList: string[] = [];
  @Input() selectedBrowsers: string[] = [];

  constructor(private browserActions: BrowserActions) { }

  toggleSelected(name: string) {
    let selected = this.selectedBrowsers.slice();

    if(selected.includes(name)) {
      for(var i = selected.length - 1; i >= 0; i--) {
        if(selected[i] === name) {
          selected.splice(i, 1);
        }
      }
    } else {
      selected.push(name);
    }

    selected.sort((a, b) => {
      let aName = a.toLowerCase();
      let bName = b.toLowerCase();
      
      return (aName === 'edge' || (aName < bName && bName !== 'edge'))
        ? -1
        : (bName === 'edge' || bName < aName)
          ? 1
          : 0;
    });

    this.browserActions.setBrowsers(selected);
  }
}
