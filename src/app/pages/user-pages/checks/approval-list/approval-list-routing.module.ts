import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalListPage } from './approval-list.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalListPageRoutingModule {}
