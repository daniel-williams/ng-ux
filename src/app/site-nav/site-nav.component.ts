import { Component } from '@angular/core';

@Component({
  selector: 'site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.scss'],
  host: {
    class: 'nav',
  }
})
export class SiteNav { }
