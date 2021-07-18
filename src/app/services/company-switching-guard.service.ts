

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CompanyManagementService } from '../services/company-management.service';
import { AuthService } from '../auth/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CompanySwitchingGuardService implements CanActivate  {

  constructor(public toastController: ToastController,private router:Router,private _authService:AuthService,private _companyManagementService:CompanyManagementService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
   {
           
        if(this._companyManagementService.checkActiveCompanyIdExist()&&this._companyManagementService.checkActiveCompanyNameExist())
        {
          return true;
        }
         
      
         if(localStorage.getItem('appToken')){
            this.presentToast();
         }

         this.router.navigateByUrl('/company-switch');
         return false;
  
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have to select one company',
      duration: 2000
    });
    toast.present();
  }



}
