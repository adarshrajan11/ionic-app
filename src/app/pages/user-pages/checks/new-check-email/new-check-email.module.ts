import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCheckEmailPageRoutingModule } from './new-check-email-routing.module';

import { NewCheckEmailPage } from './new-check-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCheckEmailPageRoutingModule
  ],
  declarations: [NewCheckEmailPage]
})
export class NewCheckEmailPageModule {}
