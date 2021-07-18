import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckModelPageRoutingModule } from './check-model-routing.module';

import { CheckModelPage } from './check-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckModelPageRoutingModule
  ],
  declarations: [CheckModelPage]
})
export class CheckModelPageModule {}
