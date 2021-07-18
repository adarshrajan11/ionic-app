import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCheckPage } from './view-check.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCheckPageRoutingModule {}
