import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GeolocateProvider} from '../../providers/geolocate/geolocate';
import leaflet from 'leaflet';

import {Coords} from '../../models/coords.model';
import {NativeGeocoderForwardResult} from '@ionic-native/native-geocoder';

import 'rxjs/add/operator/take';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  // map: any;
  // destination: string;
  // viewMode: string;
  // myLocation: any;
  // place: any;
  // coords: any;
  // alarmLocation: any;
  // alarmCoords: Coords = {
  //   longitude: 0,
  //   latitude: 0,
  // };
  // city: string;
  // currentCoords: Coords = {
  //   longitude: 0,
  //   latitude: 0,
  // };
  // @ViewChild('map')
  // mapContainer: ElementRef;
  // constructor(
  //   public navCtrl: NavController,
  //   public navParams: NavParams,
  //   private geolocate: GeolocateProvider
  // ) {}
  // ionViewDidLoad() {
  //   this.geolocate.startTracking();
  // }
  // ionViewDidEnter() {
  //   this.map = leaflet.map('map').fitWorld();
  //   this.geolocate.currentCoords.take(1).subscribe(coords => {
  //     console.log('coords:', coords);
  //     this.currentCoords = coords;
  //     this.loadMap();
  //   });
  // }
  // ionViewCanLeave() {
  //   document.getElementById('map').outerHTML = '';
  // }
  // loadMap() {
  //   leaflet
  //     .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attributions: 'petar',
  //       maxZoom: 18,
  //     })
  //     .addTo(this.map);
  //   let markerGroup = leaflet.featureGroup();
  //   let marker = leaflet.marker([
  //     this.currentCoords.latitude,
  //     this.currentCoords.longitude,
  //   ]);
  //   markerGroup.addLayer(marker);
  //   this.map.addLayer(markerGroup);
  //   // this.map.setView(markerGroup.getBounds().getCenter());
  //   // this.map.fitBounds(markerGroup.getBounds());
  //   this.map.setView(
  //     [this.currentCoords.latitude, this.currentCoords.longitude],
  //     10
  //   );
  // }
  // addDestination() {
  //   console.log('addDestination()');
  //   this.geolocate
  //     .getCoords(this.city)
  //     .then((coordinates: any) => {
  //       console.log('coordinates:', coordinates);
  //       let markerGroup = leaflet.featureGroup();
  //       let marker: any = leaflet.marker([
  //         coordinates[0].latitude,
  //         coordinates[0].longitude,
  //       ]);
  //       markerGroup.addLayer(marker);
  //       this.map.addLayer(markerGroup);
  //       this.map.fitBounds([
  //         [coordinates[0].latitude, coordinates[0].longitude],
  //         [this.currentCoords.latitude, this.currentCoords.longitude],
  //       ]);
  //     })
  //     .catch((error: any) => console.log(error));
  // }
  // goToHome() {n
  //   this.navCtrl.push(HomePage);
  // }
}
