import { Component } from '@angular/core';

// import 'styles/font-awesome.css';

@Component({
  selector: 'app',
  template: `
  <router-outlet></router-outlet>
  <div class='footer'></div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class App {}
