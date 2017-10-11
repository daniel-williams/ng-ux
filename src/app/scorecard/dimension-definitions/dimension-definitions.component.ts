import { Component } from '@angular/core';

@Component({
  selector: 'dimension-definitions',
  templateUrl: './dimension-definitions.component.html',
  styleUrls: ['./dimension-definitions.component.scss']
})
export class DimensionDefinitions {
  private opened: boolean = true;

  toggleOpened(): void {
    this.opened = !this.opened;
  }
}
