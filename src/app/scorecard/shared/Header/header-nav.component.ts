import { Component } from '@angular/core';

import {
  AnimationService
} from '../../../shared/animation.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNav {

  private controller: any;

  constructor(private a: AnimationService) {
    this.controller = AnimationService.CreateController();
  }

  private navigate(id: string) {
    let el = document.getElementById(id);
    let offset = this.a.getPageOffset(el);

    this.controller.scrollTo(offset.top);
  }
}