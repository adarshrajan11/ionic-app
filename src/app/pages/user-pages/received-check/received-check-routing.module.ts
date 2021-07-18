import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivedCheckPage } from './received-check.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivedCheckPageRoutingModule {}
