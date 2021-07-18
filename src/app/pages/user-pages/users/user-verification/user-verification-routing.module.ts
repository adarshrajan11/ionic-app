import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVerificationPage } from './user-verification.page';

const routes: Routes = [
  {
    path: '',
    component: UserVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVerificationPageRoutingModule {}
