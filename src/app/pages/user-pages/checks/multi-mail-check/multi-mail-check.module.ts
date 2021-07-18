import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiMailCheckPageRoutingModule } from './multi-mail-check-routing.module';

import { MultiMailCheckPage } from './multi-mail-check.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MultiMailCheckPageRoutingModule
  ],
  declarations: [MultiMailCheckPage]
})
export class MultiMailCheckPageModule {}
