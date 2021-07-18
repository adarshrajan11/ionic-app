import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiMailCheckPage } from './multi-mail-check.page';

const routes: Routes = [
  {
    path: '',
    component: MultiMailCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiMailCheckPageRoutingModule {}
