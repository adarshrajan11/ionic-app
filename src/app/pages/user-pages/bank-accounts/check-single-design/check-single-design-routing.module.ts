import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckSingleDesignPage } from './check-single-design.page';

const routes: Routes = [
  {
    path: '',
    component: CheckSingleDesignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckSingleDesignPageRoutingModule {}
