import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankCheckPreviewPage } from './bank-check-preview.page';

const routes: Routes = [
  {
    path: '',
    component: BankCheckPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankCheckPreviewPageRoutingModule {}
