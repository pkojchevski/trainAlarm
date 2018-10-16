import {Injectable, NgZone} from '@angular/core';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {Coords} from '../../models/coords.model';
import {Subject} from 'rxjs';

import * as cheapRuler from '../../common/cheapRuler.js';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GeolocateProvider {
  public watch: any;
  private prevPosition: Coords;
  private currPosition: Coords;

  private ruler = cheapRuler(0, 0, 'kilometres');

  private coordsSource = new Subject<Coords>();
  currentCoords = this.coordsSource.asObservable();

  private speedSource = new Subject<number>();
  currSpeed = this.speedSource.asObservable();

  constructor(
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private http: HttpClient
  ) {}

  //for browser
  locateMe() {
    if (navigator.geolocation) {
      console.log('locateMe');
      navigator.geolocation.watchPosition(
        position => {
          console.log('watch_position');
          console.log('position:', position);
          if (this.currPosition)
            this.prevPosition = Object.assign({}, this.currPosition);
          this.currPosition = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp: position.timestamp,
          };
          this.calcSpeed(this.prevPosition, this.currPosition);
          this.coordsSource.next(this.currPosition);
        },
        this.onPositionError,
        {
          timeout: 10000,
          maximumAge: 100,
          enableHighAccuracy: true,
        }
      );
    }
  }

  calcSpeed(prevPosition, currPosition) {
    let speed: number;
    let distance: number;
    if (!prevPosition) {
      this.speedSource.next(0);
    } else {
      distance = this.ruler.distance(
        [prevPosition.longitude, prevPosition.latitude],
        [currPosition.longitude, currPosition.latitude]
      );
      // console.log('distance:', distance);
      // console.log(
      //   'timestamp:',
      //   (currPosition.timestamp - prevPosition.timestamp) / (3600 * 1000)
      // );
      speed =
        currPosition.timestamp - prevPosition.timestamp === 0
          ? 0
          : distance /
            ((currPosition.timestamp - prevPosition.timestamp) / (3600 * 1000));
      // console.log('speed:', speed);
      // console.log('rounded speed:', Math.round(speed));

      this.speedSource.next(Math.round(speed) || 0);
    }
  }

  onPositionError() {}

  getPosition() {
    return this.geolocation.getCurrentPosition();
  }

  getPositionForBrowser() {
    navigator.geolocation.getCurrentPosition(position => {
      this.currPosition = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        timestamp: position.timestamp,
      };
      this.coordsSource.next(this.currPosition);
    });
  }

  getCoords(city) {
    return this.nativeGeocoder.forwardGeocode(city);
  }

  startTrackingOnline() {
    const options = {
      frequency: 3000,
      enableHighAccuracy: true,
    };
    this.watch = this.geolocation
      .watchPosition(options)
      .filter((p: any) => p.code === undefined)
      .subscribe(
        (position: Geoposition) => {
          if (this.currPosition)
            this.prevPosition = Object.assign({}, this.currPosition);
          this.currPosition = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp: position.timestamp,
          };
          console.log('currentPosition:', this.currPosition);
          this.calcSpeed(this.prevPosition, this.currPosition);
          this.coordsSource.next(this.currPosition);
        },
        err => console.log(err)
      );
  }

  startTrackingInBackground() {
    // console.log('start tracking online');
    // Background Tracking
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000,
    };
    this.backgroundGeolocation.configure(config).subscribe(
      (location: BackgroundGeolocationResponse) => {
        this.zone.run(() => {
          this.coordsSource.next(location);
        });
      },
      err => console.log(err)
    );
    this.backgroundGeolocation.start();
  }

  stopTrackingInBackground() {
    console.log('StopTrackingInBackground');
    this.backgroundGeolocation.stop();
  }

  stopTrackingOnline() {
    console.log('StopTrackingOnline');
    this.watch.unsubscribe();
  }

  calculateDistance(coords1, coords2): number {
    return this.ruler.distance(coords1, coords2);
  }

  getLocation(value, token) {
    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${token}`
    );
  }

  getLocationByIq(value, token) {
    return this.http.get(
      `https://api.locationiq.com/v1/autocomplete.php?key=${token}&q=${value}`
    );
  }

  getLocationMapQuest(value) {
    // 2OD9TNoDPSwF1FeQMMzJGC1EVe1i1vVP
    return this.http.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=2OD9TNoDPSwF1FeQMMzJGC1EVe1i1vVP&inFormat=kvp&outFormat=json&location=${value}&thumbMaps=false`
    );
  }

  getLocationMapFit(value) {
    return this.http.get(
      `https://api.mapfit.com/v2/geocode?street_address=${value}&building=true&api_key={your api key here}`
    );
  }

  //locationIq: 31ba1ab2f81cf0

  // getLocationFursquare() {
  //   const clientId = 'YRAAURUZC5F0JYWZBDFSE3TXAU5JATBW2X3XWEUUB44QI1ZE';
  //   const clientSecret = 'PO44UGCBOAC4GBGKKNK5QBHRBSDD1GE4JMFYWYWSHHTOJ1AZ';
  //   return fetch(
  //     `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee`
  //   )
  //     .then(function() {
  //       // Code for handling API response
  //     })
  //     .catch(function() {
  //       // Code for handling errors
  //     });
  // }
}
