import { Component } from '@angular/core';

/**
 * Generated class for the AddPlace2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-place2',
  templateUrl: 'add-place2.html'
})
export class AddPlace2Component {

  text: string;

  constructor() {
    console.log('Hello AddPlace2Component Component');
    this.text = 'Hello World';
  }

}
