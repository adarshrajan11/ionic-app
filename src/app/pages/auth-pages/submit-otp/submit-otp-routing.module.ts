import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitOtpPage } from './submit-otp.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitOtpPageRoutingModule {}
