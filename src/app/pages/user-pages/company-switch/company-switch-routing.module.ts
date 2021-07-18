import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanySwitchPage } from './company-switch.page';

const routes: Routes = [
  {
    path: '',
    component: CompanySwitchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySwitchPageRoutingModule {}
