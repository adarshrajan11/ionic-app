import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckSingleDesignPageRoutingModule } from './check-single-design-routing.module';

import { CheckSingleDesignPage } from './check-single-design.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CheckSingleDesignPageRoutingModule
  ],
  declarations: [CheckSingleDesignPage]
})
export class CheckSingleDesignPageModule {}
