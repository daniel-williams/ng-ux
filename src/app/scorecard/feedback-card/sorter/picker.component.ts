import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class Picker {
  @Input() itemList: string[] = [];
  @Input() selectedItem: string;
  @Input() title: string;
  @Output() toggle = new EventEmitter<string>();

  private defaultTitle = 'Choose...';
  private showPanel: boolean = false;

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  closePanel() {
    this.showPanel = false;
  }

  toggleItem(item: string) {
    this.toggle.emit(item);
  }
}
