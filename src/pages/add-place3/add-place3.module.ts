import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddPlace3Page} from './add-place3';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [AddPlace3Page],
  imports: [IonicPageModule.forChild(AddPlace3Page), ComponentsModule],
})
export class AddPlace3PageModule {}
