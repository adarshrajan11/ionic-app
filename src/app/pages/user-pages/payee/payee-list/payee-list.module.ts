import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayeeListPageRoutingModule } from './payee-list-routing.module';

import { PayeeListPage } from './payee-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PayeeListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PayeeListPage]
})
export class PayeeListPageModule {}
