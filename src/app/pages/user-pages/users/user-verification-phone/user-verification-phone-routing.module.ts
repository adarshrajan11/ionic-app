import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVerificationPhonePage } from './user-verification-phone.page';

const routes: Routes = [
  {
    path: '',
    component: UserVerificationPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVerificationPhonePageRoutingModule {}
