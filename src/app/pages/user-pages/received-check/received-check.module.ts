import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedCheckPageRoutingModule } from './received-check-routing.module';

import { ReceivedCheckPage } from './received-check.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedCheckPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReceivedCheckPage]
})
export class ReceivedCheckPageModule {}
