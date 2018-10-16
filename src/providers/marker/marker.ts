import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Alarm} from '../../models/alarm.model';
import {ToastController} from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class MarkerProvider {
  alarm: Alarm;
  constructor(private storage: Storage, private toastCtrl: ToastController) {}

  // createAlarm(place, radius: number, reminder: string, coords: Coords): Alarm {
  //   let alarm: Alarm = {
  //     destination: {
  //       city: place.split(',')[0],
  //       description: place.split(',')[1],
  //       radius: radius,
  //     },
  //     coords: [coords.longitude, coords.latitude],
  //     isActive: false,
  //     ringtone: {
  //       name: 'rock',
  //       url: '../assets/alarms/rock.mp3',
  //     },
  //     reminder: reminder,
  //   };
  //   //   destination: {
  //   //     city: place.place_name.split(',')[0],
  //   //     description: `${place.place_name.split(',')[1]}, ${
  //   //       place.place_name.split(',')[2]
  //   //     }`,
  //   //     radius: radius,
  //   //   },
  //   //   coords: place.center,
  //   //   isActive: false,
  //   //   ringtone: '../assets/alarms/ringtone1.png',
  //   //   reminder: reminder,
  //   // };
  //   return alarm;
  // }

  addMarker(alarms: Alarm[]) {
    this.storage
      .set('alarms', alarms)
      .then(() => {
        const toast = this.toastCtrl.create({
          message: 'Alarm is added',
          duration: 3000,
        });
        toast.present();
      })
      .catch(() => {
        const toast = this.toastCtrl.create({
          message: 'There was problem please tray again',
          duration: 3000,
        });
        toast.present();
      });
  }

  updateMarker(alarm: Alarm) {
    this.getMarkers()
      .then(arr => {
        let index = _.findIndex(arr, (obj: Alarm) =>
          _.isEqual(obj.coords, alarm.coords)
        );
        arr[index] = Object.assign(arr[index], alarm);
        this.storage.set('alarms', arr);
      })
      .then(() => {
        const toast = this.toastCtrl.create({
          message: 'Alarm is updated',
          duration: 3000,
        });
        toast.present();
      })
      .catch(() => {
        const toast = this.toastCtrl.create({
          message: 'There was problem please tray again',
          duration: 3000,
        });
        toast.present();
      });
  }

  createAlarmForLocationIq(place, radius: number, reminder: string): Alarm {
    let alarm: Alarm = {
      destination: {
        place: place.display_place,
        location: place.display_address,
        radius: radius,
      },
      coords: [place.lon, place.lat],
      isActive: false,
      ringtone: {
        name: 'rock',
        url: '../../assets/alarms/rock.mp3',
      },
      reminder: reminder,
    };
    return alarm;
  }

  getMarkers() {
    return this.storage.get('alarms');
  }

  removeMarker(alarm: Alarm, index: number) {
    return this.getMarkers().then(alarms => {
      alarms.splice(index, 1);
      this.storage.set('alarms', alarms);
    });
  }
}
