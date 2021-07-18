import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(private authSerice: AuthService, private router: Router, public alertController: AlertController) { }

  login: any;
  email: any;
  loading: boolean = false;

  ngOnInit() {
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

  sendOtp() {

     if(this.email==''||this.email==null){
      this.presentAlert("Please enter Email");
      return;
     }
    this.loading = true;
    let data = { 'email': this.email }
    this.authSerice.sendOtp(data).pipe(
      finalize(() => {
        this.loading = false;
        this.email = '';
      }), catchError(err => {
        this.loading = false;
        return of(false);
      })
    ).subscribe(res => {
      if (res) {
        this.router.navigate(['/submit-otp',{email: this.email}] )
      }
    });
  }

}
