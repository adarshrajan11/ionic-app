import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCheckMailPage } from './new-check-mail.page';

const routes: Routes = [
  {
    path: '',
    component: NewCheckMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCheckMailPageRoutingModule {}
