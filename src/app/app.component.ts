import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
  <site-styles></site-styles>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class App {}
