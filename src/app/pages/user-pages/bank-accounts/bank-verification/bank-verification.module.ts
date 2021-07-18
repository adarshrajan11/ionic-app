import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankVerificationPageRoutingModule } from './bank-verification-routing.module';

import { BankVerificationPage } from './bank-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankVerificationPageRoutingModule
  ],
  declarations: [BankVerificationPage]
})
export class BankVerificationPageModule {}
