import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankCheckPreviewPageRoutingModule } from './bank-check-preview-routing.module';

import { BankCheckPreviewPage } from './bank-check-preview.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankCheckPreviewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BankCheckPreviewPage]
})
export class BankCheckPreviewPageModule {}
