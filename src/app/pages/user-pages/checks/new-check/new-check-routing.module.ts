import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCheckPage } from './new-check.page';

const routes: Routes = [
  {
    path: '',
    component: NewCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCheckPageRoutingModule {}
