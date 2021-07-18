import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckModelPage } from './check-model.page';

const routes: Routes = [
  {
    path: '',
    component: CheckModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckModelPageRoutingModule {}
