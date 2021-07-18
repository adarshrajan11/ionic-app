import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCheckEmailPage } from './new-check-email.page';

const routes: Routes = [
  {
    path: '',
    component: NewCheckEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCheckEmailPageRoutingModule {}
