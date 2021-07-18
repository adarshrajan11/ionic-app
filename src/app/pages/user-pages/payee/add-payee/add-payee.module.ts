import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPayeePageRoutingModule } from './add-payee-routing.module';

import { AddPayeePage } from './add-payee.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddPayeePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddPayeePage]
})
export class AddPayeePageModule {}
