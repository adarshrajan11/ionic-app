import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVerificationPhonePageRoutingModule } from './user-verification-phone-routing.module';

import { UserVerificationPhonePage } from './user-verification-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVerificationPhonePageRoutingModule
  ],
  declarations: [UserVerificationPhonePage]
})
export class UserVerificationPhonePageModule {}
