import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalListPageRoutingModule } from './approval-list-routing.module';

import { ApprovalListPage } from './approval-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalListPageRoutingModule
  ],
  declarations: [ApprovalListPage]
})
export class ApprovalListPageModule {}
