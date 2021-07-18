import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeSlidePageRoutingModule } from './welcome-slide-routing.module';

import { WelcomeSlidePage } from './welcome-slide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeSlidePageRoutingModule
  ],
  declarations: [WelcomeSlidePage]
})
export class WelcomeSlidePageModule {}
