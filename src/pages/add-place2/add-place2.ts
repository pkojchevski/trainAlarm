import {Component, NgZone} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../app/environment';

import {GeolocateProvider} from '../../providers/geolocate/geolocate';
import {Coords, InitialCoords} from '../../models/coords.model';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {MarkerProvider} from '../../providers/marker/marker';

import {Alarm} from '../../models/alarm.model';

import * as cheapRuler from '../../common/cheapRuler.js';

import {rubberBand} from '../../common/animations/index';
import {bounceInRight} from '../../common/animations/index';
import {bounceInLeft} from '../../common/animations/index';

import {NativePageTransitions} from '@ionic-native/native-page-transitions';

import 'rxjs/add/operator/take';
import {Observable} from 'rxjs';

import * as places from '../../../node_modules/places.js';

@IonicPage()
@Component({
  selector: 'page-add-place2',
  templateUrl: 'add-place2.html',
  animations: [rubberBand, bounceInRight, bounceInLeft],
})
export class AddPlace2Page {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  place;
  places;
  lastKeyPressed = 0;
  plaseChoosed = false;
  source: any;
  markers: any;
  currentCoords: Coords;
  data: any;
  destinationMarker;
  placeJSON: any;
  ruler: any;
  speed: Observable<any>;
  speedValue: string;
  radius: number = 0;
  reminder: string = '';

  BounceInRightState: string = 'inactive';
  BounceInLeftState: string = 'inactive';
  rubberBandState: string = 'inactive';

  speedExists: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocate: GeolocateProvider,
    private http: HttpClient,
    private markerProvider: MarkerProvider,
    private toastCtrl: ToastController,
    private nativePageTransitions: NativePageTransitions,
    private zone: NgZone
  ) {}

  ionViewDidEnter() {
    let placesAutocomplete = places({
      container: document.querySelector('#address-input'),
    });
    placesAutocomplete.on('change', e => {
      console.log('onChange e:', e);
      this.place = e.suggestion.value;
      console.log('currentCoords:', this.currentCoords);
      this.currentCoords = {
        longitude: e.suggestion.latlng.lng,
        latitude: e.suggestion.latlng.lat,
      };
      this.addMarkerOnMap(this.currentCoords);
    });
    placesAutocomplete.on('clear', e => {
      this.triggerBounceInLeft();
      this.triggerBounceInRight();
    });
    // this.geolocate.getPositionForBrowser();
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.ruler = cheapRuler(0, 0, 'kilometres');
    console.log('speedValue:', this.speedValue);
    // run watchPosition for browser geolocation
    this.geolocate.locateMe();
    this.geolocate.getPositionForBrowser();

    // run watch for native
    this.geolocate.startTrackingOnline();
    this.speed = this.geolocate.currSpeed;
    this.speed.subscribe(value => {
      this.speedValue = value;
    });
    this.initializeMap();
    // create new Map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [0, 0],
    });
  }

  /////////// animations ////////////////////
  triggerRubberBand() {
    this.rubberBandState = 'active';
  }

  resetRubberBand() {
    this.zone.run(() => {
      this.rubberBandState = 'inactive';
    });
  }

  triggerBounceInRight() {
    this.BounceInRightState =
      this.BounceInRightState === 'active'
        ? (this.BounceInRightState = 'inactive')
        : (this.BounceInRightState = 'active');
  }

  triggerBounceInLeft() {
    this.BounceInLeftState =
      this.BounceInLeftState === 'active'
        ? (this.BounceInLeftState = 'inactive')
        : (this.BounceInLeftState = 'active');
  }

  private flyToLocation(location) {
    this.map.flyTo({
      center: location,
      zoom: 12,
    });
  }

  private initializeMap() {
    /// locate the user
    this.geolocate.currentCoords.take(1).subscribe(coords => {
      console.log('coords form currentCoords:', coords);
      this.currentCoords = coords;
      this.flyToLocation([
        this.currentCoords.longitude,
        this.currentCoords.latitude,
      ]);
      new mapboxgl.Marker()
        .setLngLat([this.currentCoords.longitude, this.currentCoords.latitude])
        .addTo(this.map);
    });
  }

  //// Add Marker on Click
  // search($event) {
  //   console.log('event:', $event.target.value);
  //   if ($event.target.value === undefined) {
  //   } else {
  //     this.geolocate
  //       .getLocation($event.target.value, environment.mapbox.accessToken)
  //       .subscribe(
  //         res => {
  //           if (res) this.places = res['features'];
  //         },
  //         error => (this.places = [])
  //       );
  //   this.geolocate
  //     .getLocationMapQuest($event.target.value)
  //     .subscribe(res => console.log(res));
  // }
  // }

  addMarkerOnMap(coords: Coords) {
    if (this.destinationMarker) this.destinationMarker.remove();
    console.log('coords:', coords);
    this.flyToLocation([coords.longitude, coords.latitude]);

    this.destinationMarker = new mapboxgl.Marker()
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(this.map);

    this.triggerBounceInRight();
    this.triggerBounceInLeft();
  }

  // addPlaceOnMap(place) {
  //   if (this.destinationMarker) this.destinationMarker.remove();
  //   this.places = [];
  //   this.place = place.place_name;
  //   this.placeJSON = place;
  //   this.flyToLocation(place.center);
  //   this.destinationMarker = new mapboxgl.Marker()
  //     .setLngLat(place.center)
  //     .addTo(this.map);
  //   // const distance = this.ruler.distance(
  //   //   [this.currentCoords.longitude, this.currentCoords.latitude],
  //   //   place.center
  //   // );
  //   this.triggerBounceInRight();
  //   this.triggerBounceInLeft();
  // }

  addAlarm() {
    // const alarm: Alarm = this.markerProvider.createAlarm(
    //   this.place,
    //   this.radius,
    //   this.reminder,
    //   this.currentCoords
    // );
    // let alarmArr: Alarm[];
    // this.markerProvider.getMarkers().then(alarms => {
    //   //if alarms array does not have any alarm
    //   if (!alarms) {
    //     this.markerProvider.addMarker([alarm]);
    //     this.place = '';
    //   } else {
    //     /////if alarm already exists
    //     if (
    //       alarms.filter(obj => obj.destination.city === alarm.destination.city)
    //         .length > 0
    //     ) {
    //       const toast = this.toastCtrl.create({
    //         message: `Alarm for destination ${
    //           alarm.destination.city
    //         } already exists!`,
    //         duration: 3000,
    //       });
    //       toast.present();
    //       this.triggerRubberBand();
    //     }
    //     /////Alarms is not empty array and alarm does not exists in alarms
    //     else {
    //       alarmArr = alarms;
    //       alarmArr.push(alarm);
    //       this.markerProvider.addMarker(alarmArr);
    //       this.triggerBounceInRight();
    //       this.triggerBounceInLeft();
    //       this.place = '';
    //     }
    //   }
    // });
  }

  fade() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot('HomePage');
  }

  goBack() {
    this.fade();
  }
}
