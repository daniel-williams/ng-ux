import { Component } from '@angular/core';

import 'styles/font-awesome.css';
import 'styles/fonts.css';

@Component({
  selector: 'app',
  template: `
  <site-styles></site-styles>
  <router-outlet></router-outlet>
  <div class='footer'></div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class App {}
