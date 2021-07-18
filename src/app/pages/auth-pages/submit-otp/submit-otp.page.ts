import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-submit-otp',
  templateUrl: './submit-otp.page.html',
  styleUrls: ['./submit-otp.page.scss'],
})
export class SubmitOtpPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authSerice: AuthService,public alertController: AlertController,public loadingController: LoadingController) { }

  login: any;
  otpCode1: string;
  otpCode2: string;
  otpCode3: string;
  otpCode4: string;
  otpCode5: string;
  otpCode6: string;

  email: string;
  loading: boolean = false;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.loading = false;
  }

  async presentLoading() {
    const loadingP = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Resending OTP',
    });
    await loadingP.present();

    const { role, data } = await loadingP.onDidDismiss();
    // console.log('Loading dismissed!');
  }


  otpController(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  

  submit() {
    this.loading = true;
    let code = this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6;
    let data = { email: this.email, otp: code }
    this.authSerice.resetPasswordRequest(data).pipe(
      finalize(() => {
        this.loading = false;
        this.otpCode1 = '';
        this.otpCode2 = '';
        this.otpCode3 = '';
        this.otpCode4 = '';
        this.otpCode5 = '';
        this.otpCode6 = '';
      }), catchError(err => {
        this.loading = false;
        return of(false);
      })
    ).subscribe(res => {
      if (res) {
        this.router.navigate(['/reset-password', data])
      }
    });
  }

  sendOtp() {
    this.presentLoading(); 
    let data = { 'email': this.email }
    this.authSerice.sendOtp(data).pipe(
      finalize(() => {
        this.loadingController.dismiss();
        this.email = '';
      }), catchError(err => {
        return of(false);
      })
    ).subscribe(res => {
      if (res) {
      }
    });
  }
  
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops !',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
