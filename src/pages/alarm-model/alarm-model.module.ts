import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AlarmModelPage} from './alarm-model';

@NgModule({
  declarations: [AlarmModelPage],
  imports: [IonicPageModule.forChild(AlarmModelPage)],
  exports: [AlarmModelPage],
})
export class AlarmModelPageModule {}
