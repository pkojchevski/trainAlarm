import { Component } from '@angular/core';

/**
 * Generated class for the GaugeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gauge',
  templateUrl: 'gauge.html'
})
export class GaugeComponent {

  text: string;

  constructor() {
    console.log('Hello GaugeComponent Component');
    this.text = 'Hello World';
  }

}
