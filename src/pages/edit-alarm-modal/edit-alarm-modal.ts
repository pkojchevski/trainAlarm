import {Component} from '@angular/core';
import {RINGTONES} from '../../models/ringtones';

import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import {Alarm} from '../../models/alarm.model';
import {Ringtone} from '../../models/ringtones';
import {MarkerProvider} from '../../providers/marker/marker';

@IonicPage()
@Component({
  selector: 'page-edit-alarm-modal',
  templateUrl: 'edit-alarm-modal.html',
})
export class EditAlarmModalPage {
  alarm: Alarm;
  ringtones: Ringtone[];
  ringtoneNames: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private markerProvider: MarkerProvider
  ) {
    this.ringtones = RINGTONES;
    this.ringtoneNames = this.ringtones.map(a => a.name);
    this.alarm = this.navParams.get('data');
  }

  updateAlarm(alarm) {
    this.markerProvider.updateMarker(alarm);
    this.view.dismiss();
  }

  onChange(ringtone) {
    this.alarm.ringtone.url = RINGTONES.filter(
      el => el.name === ringtone.name
    )[0].url;
  }

  closeModal() {
    this.view.dismiss();
  }
}
