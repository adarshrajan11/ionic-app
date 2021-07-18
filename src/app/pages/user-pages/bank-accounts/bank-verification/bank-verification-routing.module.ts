import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankVerificationPage } from './bank-verification.page';

const routes: Routes = [
  {
    path: '',
    component: BankVerificationPage
  },
  {
    path: 'bank-verification-step2',
    loadChildren: () => import('./bank-verification-step2/bank-verification-step2.module').then( m => m.BankVerificationStep2PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankVerificationPageRoutingModule {}
