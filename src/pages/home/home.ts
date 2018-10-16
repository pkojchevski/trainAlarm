import {Component} from '@angular/core';
import {
  NavController,
  IonicPage,
  ModalOptions,
  ModalController,
  ToastController,
  ItemSliding,
} from 'ionic-angular';
import {Alarm} from '../../models/alarm.model';
import {Coords} from '../../models/coords.model';
import {GeolocateProvider} from '../../providers/geolocate/geolocate';
import {Subscription, Observable} from 'rxjs';

import {BackgroundMode} from '@ionic-native/background-mode';

import {MarkerProvider} from '../../providers/marker/marker';
import * as _ from 'lodash';

import {swing, rotate} from '../../common/animations/index';

import {
  NativePageTransitions,
  NativeTransitionOptions,
} from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [swing, rotate],
})
export class HomePage {
  alarms: Alarm[] = [];
  modalIsOpened = false;
  currCoords: Coords = {
    longitude: 0,
    latitude: 0,
  };
  subscription: Subscription;
  speed: Observable<any>;
  distance: number;
  rotateState: string = 'idle';
  slidingLeft: boolean = false;
  slidingRight: boolean = false;

  constructor(
    public navCtrl: NavController,
    private geolocate: GeolocateProvider,
    public modalCtrl: ModalController,
    private backgroundMode: BackgroundMode,
    private markerProvider: MarkerProvider,
    private nativePageTransitions: NativePageTransitions
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.markerProvider.getMarkers().then(alarms => {
      if (alarms) this.alarms = alarms;
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    // this.geolocate.startTrackingOnline();

    this.speed = this.geolocate.currSpeed || Observable.of(0);
    this.speed.subscribe(speed => console.log('speed:', speed));
  }

  goToDestination() {
    console.log('click');
    this.rotateState = 'clicked';
    this.nativePageTransitions.fade(null);
    this.navCtrl.pop();
  }
  s;

  turnOnOfAlarm(alarm: Alarm) {
    console.log('alarm.isActive:', alarm);
    this.modalIsOpened = false;
    if (!alarm.isActive) {
      this.geolocate.stopTrackingInBackground();
      this.geolocate.stopTrackingOnline();
      return;
    }
    this.geolocate.startTrackingInBackground();
    this.geolocate.startTrackingOnline();
    this.backgroundMode.enable();
    this.subscription = this.geolocate.currentCoords.subscribe(
      (coords: Coords) => {
        console.log(
          'distance:',
          this.geolocate.calculateDistance(alarm.coords, [
            coords.longitude,
            coords.latitude,
          ])
        );
        if (
          this.geolocate.calculateDistance(
            alarm.coords,
            [coords.longitude, coords.latitude]
          ) <= +alarm.destination.radius &&
          !this.modalIsOpened
        ) {
          this.openModal(alarm);
          this.modalIsOpened = true;
        }
      }
    );
  }

  modalEditAlarmOpen(alarm, index, itemSliding: ItemSliding) {
    const modal = this.modalCtrl.create('EditAlarmModalPage', {
      data: alarm,
    });
    modal.present();
    itemSliding.close();
    // modal.onDidDismiss(alarm => {
    //   console.log('alarm:', alarm);
    // });
  }

  //modal for active alarm
  openModal(alarm) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,
    };
    const modal = this.modalCtrl.create(
      'AlarmModelPage',
      {data: alarm},
      myModalOptions
    );

    modal.present();

    modal.onDidDismiss(data => {
      this.backgroundMode.disable();
      this.alarms.forEach(alarm => {
        if (alarm.destination === data.destination) alarm.isActive = false;
      });
      this.subscription.unsubscribe();
    });
  }

  deleteAlarm(alarm, index) {
    // _.remove(this.alarms, currAlarm =>
    //   _.isEqual(currAlarm.coords, alarm.coords)
    // );
    this.alarms.splice(index, 1);
    this.markerProvider.removeMarker(alarm, index);
  }

  logDrag($event, alarm, index, itemSliding: ItemSliding) {
    //not working!!
    // if ($event.getSlidingPercent() < 0) {
    //   this.slidingLeft = true;
    //   this.slidingRight = false;
    //   console.log('sliding left');
    // }
    // if ($event.getSlidingPercent() > 0) {
    //   this.slidingLeft = false;
    //   this.slidingRight = true;
    //   console.log('sliding right');
    // }
    if ($event.getSlidingPercent() > 6) {
      // console.log($event.getSlidingPercent());
      this.deleteAlarm(alarm, index);
    }
    if (
      $event.getSlidingPercent() < 0 &&
      Math.abs($event.getSlidingPercent()) === 6
    ) {
      this.modalEditAlarmOpen(alarm, index, itemSliding);
    }
  }
}
