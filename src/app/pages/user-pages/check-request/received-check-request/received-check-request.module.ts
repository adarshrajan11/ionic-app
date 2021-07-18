import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedCheckRequestPageRoutingModule } from './received-check-request-routing.module';

import { ReceivedCheckRequestPage } from './received-check-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedCheckRequestPageRoutingModule
  ],
  declarations: [ReceivedCheckRequestPage]
})
export class ReceivedCheckRequestPageModule {}
