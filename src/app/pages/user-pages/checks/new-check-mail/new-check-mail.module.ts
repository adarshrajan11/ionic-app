import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCheckMailPageRoutingModule } from './new-check-mail-routing.module';

import { NewCheckMailPage } from './new-check-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCheckMailPageRoutingModule
  ],
  declarations: [NewCheckMailPage]
})
export class NewCheckMailPageModule {}
