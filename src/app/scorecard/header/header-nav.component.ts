import { Component } from '@angular/core';

import { UserActions } from '../../store';
import { AnimationService } from '../../core';


@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNav {

  private controller: any;

  constructor(
    private a: AnimationService,
    private actions: UserActions) {

    this.controller = AnimationService.CreateController();
  }

  private navigate(id: string) {
    let el = document.getElementById(id);
    let offset = this.a.getPageOffset(el);

    this.controller.scrollTo(offset.top);
  }

  private onDimensionsClick(id: string) {
    this.actions.openDimensionsPanel();
    this.navigate(id);
  }
}