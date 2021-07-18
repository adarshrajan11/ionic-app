import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVerificationPageRoutingModule } from './user-verification-routing.module';

import { UserVerificationPage } from './user-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVerificationPageRoutingModule
  ],
  declarations: [UserVerificationPage]
})
export class UserVerificationPageModule {}
