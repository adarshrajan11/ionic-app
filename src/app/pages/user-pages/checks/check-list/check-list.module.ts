import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckListPageRoutingModule } from './check-list-routing.module';

import { CheckListPage } from './check-list.page';
import { ComponentsModule } from '../../../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckListPageRoutingModule,
    ComponentsModule,
 
  ],
  declarations: [CheckListPage]
})
export class CheckListPageModule {}
