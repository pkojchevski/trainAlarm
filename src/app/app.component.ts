import {Component} from '@angular/core';
import {Platform, ToastController, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {timer} from 'rxjs/observable/timer';

import {NetworkProvider} from '../providers/network/network';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = 'AddPlace3Page';
  showSplash: boolean = true;

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    splashScreen: SplashScreen,
    private networkProvider: NetworkProvider,
    private toastCtrl: ToastController,
    private event: Events,
  ) {
    platform.ready().then(() => {
      // statusBar.styleLightContent();
      // statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#00766c');

      splashScreen.hide();
      // this.headerColor.tint('#00766c');
      timer(1000).subscribe(() => (this.showSplash = false));
    });
    this.networkProvider.initializeNetworkEvents();

    this.event.subscribe('network:offline', () => {
      let toast = this.toastCtrl.create({
        message: 'Network is disconnected',
        showCloseButton: true,
      });
      toast.present();
    });
  }
}
