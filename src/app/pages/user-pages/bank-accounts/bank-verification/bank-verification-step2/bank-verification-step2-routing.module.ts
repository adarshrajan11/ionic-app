import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankVerificationStep2Page } from './bank-verification-step2.page';

const routes: Routes = [
  {
    path: '',
    component: BankVerificationStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankVerificationStep2PageRoutingModule {}

