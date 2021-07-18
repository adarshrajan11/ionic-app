import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitOtpPageRoutingModule } from './submit-otp-routing.module';

import { SubmitOtpPage } from './submit-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitOtpPageRoutingModule
  ],
  declarations: [SubmitOtpPage]
})
export class SubmitOtpPageModule {}
