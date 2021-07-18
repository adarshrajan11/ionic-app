import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeSlidePage } from './welcome-slide.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeSlidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeSlidePageRoutingModule {}
