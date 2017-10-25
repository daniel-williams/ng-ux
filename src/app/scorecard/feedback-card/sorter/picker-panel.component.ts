import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

@Component({
  selector: 'picker-panel',
  templateUrl: './picker-panel.component.html',
  styleUrls: ['./picker-panel.component.scss'],
  animations: [
    trigger('state', [
      transition(`:enter`, [
        style({transform: 'scale(1.0)', opacity: 0}),
        animate('0.2s ease-out', style({ transform: 'scale(1.20)', opacity: 1 }))
      ]),
      transition(`:leave`, [
        style({ transform: 'scale(1.20)', opacity: 1 }),
        animate('0.2s ease-out', style({ transform: 'scale(1.0)', opacity: 0 }))
      ]),
    ]),
  ],
})
export class PickerPanel {
  @Input() showPanel: boolean;
  @Input() itemList: string[] = [];
  @Input() selectedItem: string;
  @Output() toggle = new EventEmitter<string>();

  toggleItem(item: string) {
    this.toggle.emit(item);
  }
}
