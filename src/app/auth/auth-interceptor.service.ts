import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { CompanyManagementService } from '../services/company-management.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  authToken: any;

  async run() {}

  constructor(private router: Router, private storage: Storage,public navCtrl: NavController,
              public alertController: AlertController,
              private _companyManagementService:CompanyManagementService,
              private _authService:AuthService,
              public toastController: ToastController) {
    // await this.sleep(2000);
  };
  

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.storage.get('appToken').then((val) => {
      // console.log('Your Token is INTER : ', val);
      this.authToken = val;
    });

    httpRequest = httpRequest.clone({
      setHeaders: {
        Accept: `application/json`,
        Authorization: `Bearer ${localStorage.getItem('appToken')}`,
        CompanyID: `${this._companyManagementService.getActiveCompanyId()}`
      }
    });

    
    return next.handle(httpRequest).pipe(
      // delay(500),
      tap(event => {
        // debugger
        // console.log("ROUTE", this.router.url);
        // console.log("Interceptor WORKING Masha Allah");

        if (event instanceof HttpResponse) {
        }
      },
        error => {
          if (error.status == 401) {
            this.presentAlert('Unauthenticated...')
            localStorage.clear();
            this.storage.clear();
            this.router.navigate(['login']);
          }
          else if(error.status == 429) {
            this.presentAlert('Too Many Attempts..Please try after one minute')
          }
          else if (error.status == 422&&(error.error.action==null||error.error.action=='')) {  //if any action exist,then we handle from inside page.
            this.presentAlert(error.error.errorMsg)
          }
          else if(error.status==404){
            let msg = (error.error.errorMsg!=''&&error.error.errorMsg!=undefined)?error.error.errorMsg:'Not found';
            this.presentAlert(msg)
          }
          else if(error.status==403){

            if(error.error.action=='accountVerification'){
              this.presentAccountVerifyAlert(error.error.errorMsg);
            }else{
              this.presentToast(error.error.errorMsg)
            }
          }
          else if(error.status == 500) {
            this.presentToast('Server error..')
          }
        }

      )
    );

  }

  async presentAlert(message, title = "Oops !") {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated:true,
      
    });
    toast.present();
  }

  async presentAccountVerifyAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Account Not Verified',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Verify Now',
          handler: () => {
            this.router.navigateByUrl('user-verification-email');
          }
        }
      ]
    });

    await alert.present();
  }

}
