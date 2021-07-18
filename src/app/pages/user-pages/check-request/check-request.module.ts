import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckRequestPageRoutingModule } from './check-request-routing.module';

import { CheckRequestPage } from './check-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckRequestPageRoutingModule
  ],
  declarations: [CheckRequestPage]
})
export class CheckRequestPageModule {}
