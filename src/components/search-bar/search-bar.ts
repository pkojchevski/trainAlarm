import {Component, Output, EventEmitter} from '@angular/core';
import {pinIcon, closeIcon} from '../../common/animations/index';
import {environment} from '../../app/environment';

import {GeolocateProvider} from '../../providers/geolocate/geolocate';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html',
  animations: [pinIcon, closeIcon],
})
export class SearchBarComponent {
  @Output()
  destinationSelected = new EventEmitter<any>();

  pinIconState: string = 'unfocused';
  closeIconState: string = 'hide';
  places;
  destination: string;
  lastKeyPressed: number = 0;

  constructor(private geolocate: GeolocateProvider) {}

  onFocus($event) {
    console.log('focus');
    this.pinIconState =
      this.pinIconState === 'focused'
        ? (this.pinIconState = 'unfocused')
        : (this.pinIconState = 'focused');
    this.closeIconState =
      this.closeIconState === 'show'
        ? (this.closeIconState = 'hide')
        : (this.closeIconState = 'show');
  }

  onFocusOut($event) {
    console.log('focus out');
    this.pinIconState =
      this.pinIconState === 'focused'
        ? (this.pinIconState = 'unfocused')
        : (this.pinIconState = 'focused');
    this.closeIconState =
      this.closeIconState === 'show'
        ? (this.closeIconState = 'hide')
        : (this.closeIconState = 'show');
  }

  choosedPlace(place) {
    this.destination = place.display_name;
    this.places = [];
    console.log('place:', place);
    this.destinationSelected.emit(place);
  }

  search($event) {
    if ($event.timeStamp - this.lastKeyPressed > 300) {
      console.log('$event.target.value:', $event.target.value);
      this.geolocate
        .getLocationByIq(
          $event.target.value,
          environment.LocationIQ.accessToken
        )
        .subscribe(
          res => {
            console.log('res:', res);
            if (res) this.places = res;
          },
          error => (this.places = [])
        );
    }
    this.lastKeyPressed = $event.timeStamp;
  }

  resetInput() {
    console.log('resetInput');
    this.destination = '';
    this.places = [];
  }
}
