import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network';
import {Events} from 'ionic-angular';

export enum ConnectionStatus {
  Online,
  Offline,
}
@Injectable()
export class NetworkProvider {
  previousStatus;

  constructor(private network: Network, private eventCtrl: Events) {
    this.previousStatus = ConnectionStatus.Online;
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatus.Online) {
        this.eventCtrl.publish('network:offline');
      }
    });
  }
}
