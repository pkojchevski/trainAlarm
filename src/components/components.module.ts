import {NgModule} from '@angular/core';
import {AddPlace2Component} from './add-place2/add-place2';
import {GaugeComponent} from './gauge/gauge';
import {SearchBarComponent} from './search-bar/search-bar';
import {IonicModule} from 'ionic-angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AddPlace2Component, GaugeComponent, SearchBarComponent],
  imports: [IonicModule, CommonModule],
  exports: [AddPlace2Component, GaugeComponent, SearchBarComponent],
})
export class ComponentsModule {}
