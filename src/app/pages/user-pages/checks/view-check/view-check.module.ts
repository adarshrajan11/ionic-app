import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCheckPageRoutingModule } from './view-check-routing.module';

import { ViewCheckPage } from './view-check.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCheckPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewCheckPage]
})
export class ViewCheckPageModule {}
