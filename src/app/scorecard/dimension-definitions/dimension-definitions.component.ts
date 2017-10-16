import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IAppState, GlobalActions } from '../../store';


@Component({
  selector: 'dimension-definitions',
  templateUrl: './dimension-definitions.component.html',
  styleUrls: ['./dimension-definitions.component.scss']
})
export class DimensionDefinitions implements OnDestroy {
  @select(['global', 'showDimensionPanel']) showDimensionPanel$: Observable<boolean>;

  private subs: Subscription[] = [];
  private opened: boolean = true;

  constructor(
    private actions: GlobalActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.showDimensionPanel$.subscribe(x => this.opened = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  toggleOpened(): void {
    this.actions.toggleDimensionsPanel();
  }
}
