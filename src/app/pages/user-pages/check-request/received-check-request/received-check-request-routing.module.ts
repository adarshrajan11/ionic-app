import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivedCheckRequestPage } from './received-check-request.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedCheckRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivedCheckRequestPageRoutingModule {}
