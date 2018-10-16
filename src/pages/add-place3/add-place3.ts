import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../app/environment';

import {GeolocateProvider} from '../../providers/geolocate/geolocate';
import {Coords} from '../../models/coords.model';
import {MarkerProvider} from '../../providers/marker/marker';

import {Alarm} from '../../models/alarm.model';

import * as cheapRuler from '../../common/cheapRuler.js';

import {rubberBand} from '../../common/animations/index';
import {bounceInRight} from '../../common/animations/index';
import {bounceInLeft} from '../../common/animations/index';

import {NativePageTransitions} from '@ionic-native/native-page-transitions';

import 'rxjs/add/operator/take';
import {Observable} from 'rxjs';

import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-add-place3',
  templateUrl: 'add-place3.html',
  animations: [rubberBand, bounceInRight, bounceInLeft],
})
export class AddPlace3Page {
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
  radius: number = 1;
  reminder: string = '';

  BounceInRightState: string = 'inactive';
  BounceInLeftState: string = 'inactive';
  rubberBandState: string = 'inactive';

  speedExists: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocate: GeolocateProvider,
    private markerProvider: MarkerProvider,
    private toastCtrl: ToastController,
    private nativePageTransitions: NativePageTransitions
  ) {}

  ionViewDidEnter() {
    // this.geolocate.getPositionForBrowser();
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.ruler = cheapRuler(0, 0, 'kilometres');
    // run watchPosition for browser geolocation
    // this.geolocate.locateMe();
    // this.geolocate.getPositionForBrowser();

    // run watch for native
    // this.geolocate.startTrackingOnline();
    this.speed = this.geolocate.currSpeed;
    this.speed.subscribe(value => {
      this.speedValue = value;
    });
    // create new Map
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 2,
        center: [20, 50],
      });
    }
  }

  /////////// animations ////////////////////
  triggerRubberBand() {
    this.rubberBandState = 'active';
  }

  resetRubberBand() {
    this.rubberBandState = 'inactive';
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

  private flyToLocation(location: Array<number>) {
    this.map.flyTo({
      center: location,
      zoom: 10,
    });
  }

  // private initializeMap() {
  //   /// locate the user
  //   // this.geolocate.currentCoords.take(1).subscribe(coords => {
  //   //   console.log('coords form currentCoords:', coords);
  //   //   this.currentCoords = coords;
  //   //   this.flyToLocation([
  //   //     this.currentCoords.longitude,
  //   //     this.currentCoords.latitude,
  //   //   ]);
  //   // new mapboxgl.Marker().setLngLat([50, 50]).addTo(this.map);
  //   // });
  // }

  // addMarkerOnMap(coords: Coords) {
  //   if (this.destinationMarker) this.destinationMarker.remove();
  //   console.log('coords:', coords);
  //   this.flyToLocation([coords.longitude, coords.latitude]);

  //   this.destinationMarker = new mapboxgl.Marker()
  //     .setLngLat([coords.longitude, coords.latitude])
  //     .addTo(this.map);

  //   this.triggerBounceInRight();
  //   this.triggerBounceInLeft();
  // }

  addPlaceOnMap($event) {
    if (this.destinationMarker) this.destinationMarker.remove();
    this.places = [];
    this.placeJSON = $event;
    this.place = $event.display_name;
    this.flyToLocation([$event.lon, $event.lat]);
    this.destinationMarker = new mapboxgl.Marker()
      .setLngLat([$event.lon, $event.lat])
      .addTo(this.map);
    setTimeout(() => {
      this.BounceInLeftState = 'active';
      this.BounceInRightState = 'active';
    }, 700);
  }

  // ionClean() {
  //   // console.log('before:', this.BounceInLeftState);
  //   // this.triggerBounceInRight();
  //   // this.triggerBounceInLeft();
  //   // console.log('after:', this.BounceInLeftState);
  // }

  addAlarm() {
    const alarm: Alarm = this.markerProvider.createAlarmForLocationIq(
      this.placeJSON,
      this.radius,
      this.reminder
    );
    let alarmArr: Alarm[];
    this.markerProvider.getMarkers().then(alarms => {
      //if alarms array does not have any alarm
      if (!alarms) {
        this.markerProvider.addMarker([alarm]);
        this.place = '';
      } else {
        /////if alarm already exists
        if (
          alarms.filter(obj => _.isEqual(obj.coords, alarm.coords)).length > 0
        ) {
          const toast = this.toastCtrl.create({
            message: `Alarm for destination ${
              alarm.destination.place
            } already exists!`,
            duration: 3000,
          });
          toast.present();
          this.triggerRubberBand();
        }
        /////Alarms is not empty array and alarm does not exists in alarms
        else {
          alarmArr = alarms;
          alarmArr.push(alarm);
          this.markerProvider.addMarker(alarmArr);
          this.BounceInLeftState = 'inactive';
          this.BounceInRightState = 'inactive';
          this.place = '';
        }
      }
    });
  }

  fade() {
    this.nativePageTransitions.fade(null);
    this.navCtrl.push('HomePage');
  }

  goToAlarmList() {
    console.log('lick');
    this.fade();
  }
}
