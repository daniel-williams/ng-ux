import { Component } from '@angular/core';

@Component({
  templateUrl: './nameplate.component.html',
  styleUrls: ['./nameplate.component.scss'],
  host: {
    class: 'card'
  }
})
export class Nameplate {
  constructor() {
    console.log('constructor:Nameplate');
  }

  ngOnInit() {
    console.log('onInit:Nameplate');
  }
}
