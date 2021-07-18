import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { NewCheckPageRoutingModule } from './new-check-routing.module';

import { NewCheckPage } from './new-check.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCheckPageRoutingModule,
    IonicSelectableModule,
    ComponentsModule
  ],
  declarations: [NewCheckPage]
})
export class NewCheckPageModule {}
