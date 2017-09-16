import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
  <router-outlet></router-outlet>
  <div class='footer'></div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class App {}
