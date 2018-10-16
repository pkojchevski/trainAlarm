import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {GeolocateProvider} from '../providers/geolocate/geolocate';

import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {HttpClientModule} from '@angular/common/http';

import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {AlarmProvider} from '../providers/alarm/alarm';

import {NativeAudio} from '@ionic-native/native-audio';

import {BackgroundMode} from '@ionic-native/background-mode';

import {IonicStorageModule} from '@ionic/storage';
import {MarkerProvider} from '../providers/marker/marker';

import {NativePageTransitions} from '@ionic-native/native-page-transitions';

import {Network} from '@ionic-native/network';
import {NetworkProvider} from '../providers/network/network';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderColor} from '@ionic-native/header-color';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      ComponentsModule,
    }),
    HttpClientModule,
    LeafletModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    GeolocateProvider,
    Geolocation,
    NativeGeocoder,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlarmProvider,
    NativeAudio,
    BackgroundMode,
    MarkerProvider,
    NativePageTransitions,
    Network,
    NetworkProvider,
    HeaderColor,
  ],
})
export class AppModule {}
