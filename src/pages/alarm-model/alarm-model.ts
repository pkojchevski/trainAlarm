import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import {Alarm} from '../../models/alarm.model';
import {AlarmProvider} from '../../providers/alarm/alarm';

@IonicPage()
@Component({
  selector: 'page-alarm-model',
  templateUrl: 'alarm-model.html',
})
export class AlarmModelPage {
  audio = new Audio();
  data: Alarm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alarmController: AlarmProvider
  ) {}

  ionViewDidEnter() {}

  ionViewWillLoad() {
    this.data = this.navParams.get('data');
    // console.log(this.data);
    this.alarmController.playAlarm(this.data.ringtone);
    this.playAudio(this.data.ringtone.url);
  }

  closeModal() {
    this.view.dismiss(this.data);
    // this.alarmController.stopAlarm(this.data.ringtone);
    this.stopAudio();
  }

  stopAudio() {
    this.audio.pause();
  }

  playAudio(ringtone) {
    this.audio.src = ringtone;
    this.audio.load();
    this.audio.play();
  }
}
