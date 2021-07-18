import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySwitchPageRoutingModule } from './company-switch-routing.module';

import { CompanySwitchPage } from './company-switch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanySwitchPageRoutingModule
  ],
  declarations: [CompanySwitchPage]
})
export class CompanySwitchPageModule {}
