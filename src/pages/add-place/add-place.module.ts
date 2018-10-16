import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddPlacePage} from './add-place';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [AddPlacePage],
  imports: [IonicPageModule.forChild(AddPlacePage), LeafletModule],
  exports: [AddPlacePage],
})
export class AddPlacePageModule {}
