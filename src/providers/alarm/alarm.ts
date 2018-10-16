import {Injectable} from '@angular/core';

import {NativeAudio} from '@ionic-native/native-audio';

@Injectable()
export class AlarmProvider {
  constructor(private nativeAudio: NativeAudio) {}

  playAlarm(alarm) {
    console.log('alarm,', alarm);
    // this.nativeAudio
    //   .preloadComplex(alarm.name, alarm.url, 1, 1, 0)
    //   .then(() => console.log('playing'), err => console.log(err));
    // this.nativeAudio.preloadSimple('alarm', alarmTone);
    // this.nativeAudio.play(alarm.name);
  }

  stopAlarm(alarm) {
    this.nativeAudio.stop(alarm.name);
  }
}
