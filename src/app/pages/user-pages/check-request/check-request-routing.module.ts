import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckRequestPage } from './check-request.page';

const routes: Routes = [
  {
    path: '',
    component: CheckRequestPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRequestPageRoutingModule {}
