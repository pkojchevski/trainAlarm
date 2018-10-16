import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAlarmModalPage } from './edit-alarm-modal';

@NgModule({
  declarations: [
    EditAlarmModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAlarmModalPage),
  ],
})
export class EditAlarmModalPageModule {}
