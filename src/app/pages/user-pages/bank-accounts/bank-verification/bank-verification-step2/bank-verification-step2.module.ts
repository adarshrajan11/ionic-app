import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankVerificationStep2PageRoutingModule } from './bank-verification-step2-routing.module';

import { BankVerificationStep2Page } from './bank-verification-step2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankVerificationStep2PageRoutingModule
  ],
  declarations: [BankVerificationStep2Page]
})
export class BankVerificationStep2PageModule {}
